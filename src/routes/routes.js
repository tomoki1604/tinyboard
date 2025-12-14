import { getHomePage } from '../controllers/homeController.js';
import { getAllPosts, createPost } from '../controllers/postsController.js';

const routes = {
  // Home
  'GET /': getHomePage,
  'GET /styles.css': getHomePage,
  'GET /script.js': getHomePage,

  // Posts
  'GET /api/posts': getAllPosts,
  'POST /api/posts': createPost,
};

function notFound(req, res) {
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: '404 Not found' }));
}

export function router(req, res) {
  const key = `${req.method} ${req.url}`;
  (routes[key] || notFound)(req, res);
}
