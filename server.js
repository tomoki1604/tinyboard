import { createServer } from 'http';
import { connectDB } from './src/config/db.js';
import { router } from './src/routes/routes.js';

const PORT = process.env.PORT || 9000;

connectDB();

const server = createServer(router);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
