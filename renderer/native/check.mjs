import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import { loadProject, rootPath } from './runtime.mjs';

const projectId = process.argv[2];
if (!projectId) throw new Error('Usage: node renderer/native/check.mjs <project-id>');

const project = loadProject(projectId);
const required = [
  rootPath(project.entry),
  rootPath('videos', projectId, 'PROJECT-STATE.md'),
  rootPath('videos', projectId, 'BRIEF.md'),
  rootPath('videos', projectId, 'SCRIPT.md'),
  rootPath('videos', projectId, 'STORYBOARD.md')
];

for (const file of required) {
  if (!fs.existsSync(file)) throw new Error(`Missing required file: ${file}`);
}

if (project.width !== 1080 || project.height !== 1920) {
  throw new Error(`Unexpected resolution: ${project.width}x${project.height}`);
}
if (project.fps !== 30) throw new Error(`Unexpected fps: ${project.fps}`);
if (!(project.durationSeconds > 0)) throw new Error('durationSeconds must be > 0');

const ffmpeg = spawnSync('ffmpeg', ['-version'], { encoding: 'utf8' });
if (ffmpeg.error || ffmpeg.status !== 0) {
  throw new Error('FFmpeg not found on PATH. Install FFmpeg before rendering.');
}

console.log(`OK: ${project.id}`);
console.log(`${project.width}x${project.height} @ ${project.fps}fps, ${project.durationSeconds}s`);
console.log('FFmpeg available. Required canonical files present.');
