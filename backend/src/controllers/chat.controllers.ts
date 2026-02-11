import type { Context } from 'hono';
import { routeAgent } from '../agents/router.agent.js';
import { prisma } from '../db/prisma.js';

export async function chatController(c: Context) {
  const body = await c.req.json();
  const message = body.message;
  const email = body.email;

  if (!message) {
    return c.json({ error: 'Message is required' }, 400);
  }

  if (!email) {
    return c.json({ error: 'Email is required' }, 400);
  }

  // Find or create user by email
  let user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    user = await prisma.user.create({
      data: { email },
    });
  }

  const result = await routeAgent(message, user.id);

  return c.json(result);
}

