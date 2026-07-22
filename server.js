import express from 'express';
import { port } from './config/index.js';
import { setupMiddleware } from './middleware/index.js';
import { registerRoutes } from './routes/index.js';

const app = express();

setupMiddleware(app);
registerRoutes(app);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
