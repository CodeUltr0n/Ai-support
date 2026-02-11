import { Hono } from 'hono';
import { chatController } from '../controllers/chat.controllers';

const chatRoute = new Hono();

chatRoute.post('/', chatController);

export default chatRoute;