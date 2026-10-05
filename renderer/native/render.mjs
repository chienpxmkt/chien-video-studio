import { chromium } from 'playwright';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { loadProject, projectUrl, rootPath, startStaticServer } from './runtime.mjs';

const projectId = process.argv[2];
if (!projectId) throw new Error('Usage: node renderer/native/render.mjs <project-id>');

const project = loadProject(projectId);
const frameCount = Math.round(project.durationSeconds * project.fps);
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), `${project.id}-frames-`));
const output = rootPath(project.output);
fs.mkdirSync(path.dirname(output), { recursive: true });

const { server, origin } = await startStaticServer();
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: project.width, height: project.height } });

try {
  await page.goto(`${projectUrl(origin, project)}?render=1`, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.__VIDEO_READY__ === true);

  for (let frame = 0; frame < frameCount; frame += 1) {
    const t = frame / project.fps;
    await page.evaluate(({ t }) => window.__setTime(t), { t });
    const filename = path.join(tmpDir, `frame-${String(frame).padStart(5, '0')}.png`);
    await page.screenshot({ path: filename, animations: 'disabled' });
    if (frame % project.fps === 0) {
      process.stdout.write(`Rendered ${Math.round(t)}s / ${project.durationSeconds}s\r`);
    }
  }

  const ffmpeg = spawnSync('ffmpeg', [
    '-y',
    '-framerate', String(project.fps),
    '-i', path.join(tmpDir, 'frame-%05d.png'),
    '-c:v', 'libx264',
    '-preset', 'medium',
    '-crf', '18',
    '-pix_fmt', 'yuv420p',
    '-movflags', '+faststart',
    output
  ], { stdio: 'inherit' });

  if (ffmpeg.error || ffmpeg.status !== 0) {
    throw new Error('FFmpeg encoding failed.');
  }

  console.log(`\nDone: ${output}`);
} finally {
  await browser.close().catch(() => {});
  server.close();
  fs.rmSync(tmpDir, { recursive: true, force: true });
}
