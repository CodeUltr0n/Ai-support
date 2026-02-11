import { Hono } from 'hono';
import chatRoute from './routes/chat.route.js';
import { cors } from 'hono/cors';

const app = new Hono();
app.use('*',cors({origin:'*'}));
app.route('/api/chat', chatRoute);

export default app;