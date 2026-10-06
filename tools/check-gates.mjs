import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const allowedStatuses = new Set(["PENDING", "PASS", "FAIL", "BLOCKED", "N_A"]);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const videoId = process.argv[2];

if (!videoId) {
  console.error("Usage: node tools/check-gates.mjs <video-id>");
  process.exit(2);
}

const manifestPath = path.join(root, "videos", videoId, "GATES.json");

if (!fs.existsSync(manifestPath)) {
  console.error(`Missing gate manifest: ${path.relative(root, manifestPath)}`);
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const errors = [];

if (manifest.video_id !== videoId) {
  errors.push(`video_id mismatch: expected "${videoId}", got "${manifest.video_id}"`);
}

if (!Array.isArray(manifest.gates) || manifest.gates.length === 0) {
  errors.push("gates must be a non-empty array");
}

const ids = new Set();
let currentIndex = -1;

for (let i = 0; i < (manifest.gates || []).length; i += 1) {
  const gate = manifest.gates[i];

  if (!gate.id || ids.has(gate.id)) {
    errors.push(`gate[${i}] has missing or duplicate id: ${gate.id}`);
  }
  ids.add(gate.id);

  if (!allowedStatuses.has(gate.status)) {
    errors.push(`${gate.id}: invalid status "${gate.status}"`);
  }

  if (!Array.isArray(gate.evidence)) {
    errors.push(`${gate.id}: evidence must be an array`);
  }

  if (gate.status === "PASS" && (!gate.evidence || gate.evidence.length === 0)) {
    errors.push(`${gate.id}: PASS requires evidence`);
  }

  if (gate.status === "N_A" && !gate.note) {
    errors.push(`${gate.id}: N_A requires a note`);
  }

  for (const evidence of gate.evidence || []) {
    if (!evidence.startsWith("repo:")) continue;
    const relativePath = evidence.slice("repo:".length);
    const evidencePath = path.join(root, relativePath);
    if (!fs.existsSync(evidencePath)) {
      errors.push(`${gate.id}: missing repo evidence "${relativePath}"`);
    }
  }

  if (gate.id === manifest.current_gate) {
    currentIndex = i;
  }
}

if (currentIndex < 0) {
  errors.push(`current_gate "${manifest.current_gate}" does not exist in gates`);
} else {
  for (let i = 0; i < currentIndex; i += 1) {
    const gate = manifest.gates[i];
    if (gate.required && !["PASS", "N_A"].includes(gate.status)) {
      errors.push(`${gate.id}: required gate before current_gate must be PASS or N_A`);
    }
  }
}

const blockedIds = new Set(
  (manifest.gates || []).filter((gate) => gate.status === "BLOCKED").map((gate) => gate.id)
);
const documentedBlockers = new Set((manifest.blockers || []).map((item) => item.gate));

for (const gateId of blockedIds) {
  if (!documentedBlockers.has(gateId)) {
    errors.push(`${gateId}: BLOCKED requires an entry in blockers[]`);
  }
}

for (const gate of manifest.gates || []) {
  console.log(
    `${gate.id.padEnd(22)} ${gate.status.padEnd(8)} ${gate.required ? "required" : "optional"}`
  );
}

if (errors.length > 0) {
  console.error("\nGate check failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`\nGate manifest OK. Current gate: ${manifest.current_gate}`);
