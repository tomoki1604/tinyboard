import fs from 'fs/promises';
import path from 'path';
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getHomePage = async (req, res) => {
  const map = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
  };
  let filePath = path.join(
    __dirname,
    '..',
    '..',
    'public',
    req.url === '/' ? 'index.html' : req.url
  );

  const data = await fs.readFile(filePath);
  const ext = path.extname(filePath);

  res.writeHead(200, { 'Content-Type': map[ext] || 'text/plain' });
  res.end(data);
};
