const options = {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  weekday: 'short',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
};

export function formatPosts(posts) {
  return posts.map((post) => ({
    ...post,
    createdAt: new Date(post.createdAt).toLocaleString('en-GB', options),
  }));
}
