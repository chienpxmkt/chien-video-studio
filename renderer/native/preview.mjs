import { chromium } from 'playwright';
import { loadProject, projectUrl, startStaticServer } from './runtime.mjs';

const projectId = process.argv[2];
if (!projectId) throw new Error('Usage: node renderer/native/preview.mjs <project-id>');

const project = loadProject(projectId);
const { server, origin } = await startStaticServer();
const browser = await chromium.launch({ headless: false });
const page = await browser.newPage({ viewport: { width: project.width, height: project.height } });
await page.goto(`${projectUrl(origin, project)}?preview=1`, { waitUntil: 'networkidle' });

console.log(`Preview: ${projectId}`);
console.log(`URL: ${projectUrl(origin, project)}?preview=1`);
console.log('Close the browser window or press Ctrl+C to stop.');

browser.on('disconnected', () => server.close());
process.on('SIGINT', async () => {
  await browser.close().catch(() => {});
  server.close();
  process.exit(0);
});
