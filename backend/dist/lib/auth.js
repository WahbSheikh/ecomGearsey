import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { betterAuth } from "better-auth";
import { admin } from "better-auth/plugins";
const client = new MongoClient(process.env.MONGO_URI);
const db = client.db();
export const auth = betterAuth({
    database: mongodbAdapter(db),
    appName: "gearsey-backend",
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: process.env.BETTER_AUTH_URL,
    trustedOrigins: ["http://localhost:5173", "http://localhost:3000"],
    plugins: [
        admin({
            defaultRole: "customer",
        })
    ],
    user: {
        additionalFields: {
            address: {
                type: "string",
                required: true,
                input: true,
            },
            phone: {
                type: "string",
                required: true,
                input: true,
            },
            rating: {
                type: "number",
                required: false,
                defaultValue: 0,
            },
            total_reviews: {
                type: "number",
                required: false,
                defaultValue: 0,
            },
        },
    },
    emailAndPassword: {
        enabled: true,
        autoSignIn: true,
        minPasswordLength: 6,
    },
    advanced: {
        crossSubDomainCookies: {
            enabled: false,
        },
    },
});
// Export db and client for use in other files
export { db, client };
//# sourceMappingURL=auth.js.map