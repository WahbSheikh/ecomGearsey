import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { betterAuth } from "better-auth";
import { admin } from "better-auth/plugins"; 

const client = new MongoClient(process.env.MONGO_URI as string);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db),
  appName: "gearsey-backend",
  secret: process.env.BETTER_AUTH_SECRET as string,
  baseURL: process.env.BETTER_AUTH_URL as string,
  trustedOrigins: ["http://localhost:5173", "http://localhost:3000"],
  
  plugins: [
    admin({
      defaultRole: "customer", // ✅ Set default role
    })
  ],
  
  user: {
    additionalFields: {
      // ❌ REMOVE the role field - admin plugin handles it
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