import 'dotenv/config';
import express, {} from "express";
import { toNodeHandler } from "better-auth/node";
import { auth, client } from "@/lib/auth.js";
import { connectDB } from '@/db/config.js';
import cors from 'cors';
import apiRouter from '@/api/router.js';
import { setupDefaultAdmin } from '@/utils/setupAdmin.js';
const app = express();
const PORT = process.env.PORT || 3000;
// Middleware to handle CORS
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    maxAge: 3600
}));
// Middleware to parse JSON bodies
app.use(express.json());
// Log auth requests
app.use('/api/auth/*splat', (req, res, next) => {
    console.log('Auth request:', {
        method: req.method,
        url: req.url,
    });
    next();
});
// Better Auth handler
app.all("/api/auth/*splat", toNodeHandler(auth));
// ✅ Check if admin exists endpoint
app.get("/api/auth/check-admin", async (req, res) => {
    try {
        const db = client.db();
        const usersCollection = db.collection("user");
        const adminCount = await usersCollection.countDocuments({ role: "admin" });
        console.log("🔍 Admin check - Count:", adminCount);
        res.json({ adminExists: adminCount > 0 });
    }
    catch (error) {
        console.error("❌ Error checking admin:", error);
        res.status(500).json({ error: "Failed to check admin status" });
    }
});
// Other API routes
app.use('/api', apiRouter);
// Initialize server
async function startServer() {
    try {
        // Connect to database first
        await connectDB();
        console.log("✅ Database connected");
        // Setup admin user after DB connection
        await setupDefaultAdmin();
        // Start listening
        app.listen(PORT, () => {
            console.log(`✅ Server running on port ${PORT}`);
            console.log(`📍 Local: http://localhost:${PORT}`);
            console.log(`🔐 Better Auth URL: ${process.env.BETTER_AUTH_URL}`);
        });
    }
    catch (error) {
        console.error("❌ Failed to start server:", error);
        process.exit(1);
    }
}
startServer();
//# sourceMappingURL=server.js.map