import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

export function rootPath(...parts) {
  return path.join(ROOT, ...parts);
}

export function loadProject(projectId) {
  const configPath = rootPath('videos', projectId, 'project.json');
  if (!fs.existsSync(configPath)) {
    throw new Error(`Unknown project: ${projectId}`);
  }
  return JSON.parse(fs.readFileSync(configPath, 'utf8'));
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml'
};

export function startStaticServer({ port = 4173 } = {}) {
  const server = http.createServer((req, res) => {
    const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
    const safePath = path.normalize(urlPath).replace(/^([.][.][/\\])+/, '');
    const absolute = rootPath(safePath === '/' ? 'README.md' : safePath.replace(/^[/\\]/, ''));

    if (!absolute.startsWith(ROOT) || !fs.existsSync(absolute) || fs.statSync(absolute).isDirectory()) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }

    res.writeHead(200, { 'Content-Type': MIME[path.extname(absolute)] || 'application/octet-stream' });
    fs.createReadStream(absolute).pipe(res);
  });

  return new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(port, '127.0.0.1', () => {
      resolve({ server, origin: `http://127.0.0.1:${port}` });
    });
  });
}

export function projectUrl(origin, project) {
  return `${origin}/${project.entry}`;
}
