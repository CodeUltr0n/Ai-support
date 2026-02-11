import { Hono } from 'hono';
import chatRoute from './routes/chat.route.js';
import { cors } from 'hono/cors';

import { rateLimiter } from "hono-rate-limiter";
import { type Context } from "hono";

const app = new Hono();

const limiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests 
  standardHeaders: "draft-6", // draft-6: `RateLimit-*` headers;
  keyGenerator: (c: Context) => c.req.header("cf-connecting-ip") || "", //custom identifiers for clients.
});
app.use('*',cors({origin:'*'}));
app.use(limiter);
app.route('/api/chat', chatRoute);

export default app;