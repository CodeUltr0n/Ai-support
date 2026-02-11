import { serve } from '@hono/node-server';
import app from './app.js';

serve(app,(info)=>{
    console.log(`server running on http://localhost:${info.port}`);
});