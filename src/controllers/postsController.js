import { formatPosts } from '../middleware/formatPosts.js';
import Post from '../models/Post.js';

// somelike Express's body() method
function getBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(err);
      }
    });
  });
}

export async function getAllPosts(req, res) {
  try {
    // used lean() method, otherwise ...post may not include displayName and text in the formatPosts()
    const posts = await Post.find().lean();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(formatPosts(posts)));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: `${error}` }));
  }
}

export async function createPost(req, res) {
  try {
    const { displayName, text } = await getBody(req);
    const newPost = new Post({ displayName: displayName, text: text });

    await newPost.save();
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Post created successfully!' }));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: `${error}` }));
  }
}
