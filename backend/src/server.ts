import 'dotenv/config'

import express, {type Express} from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "@/lib/auth.js";
import { connectDB } from '@/db/config.js';
import cors from 'cors';
import apiRouter from '@/api/router.js';
import { createUser } from './backend-test/user.js';

// Connect to the database
connectDB();

const app : Express = express();
const PORT = process.env.PORT || 3000;

// Middleware to handle CORS - BEFORE auth middleware
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'], // Array of allowed origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    maxAge: 3600 // 1 hour
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Log auth requests
app.use('/api/auth/*splat', (req, res, next) => {
  console.log('Auth request:', {
    method: req.method,
    url: req.url,
    origin: req.headers.origin,
    referer: req.headers.referer
  });
  next();
});

// Better Auth handler - mount BEFORE other routes
app.all("/api/auth/*splat", toNodeHandler(auth));

// Other API routes
app.use('/api', apiRouter);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Local: http://localhost:${PORT}`)
  console.log(`Better Auth URL: ${process.env.BETTER_AUTH_URL}`);

  // For testing user creation in the auth
  // createUser("test@test.com", "password", "Test User", "customer", "123 Test St", "123-456-7890");
});
