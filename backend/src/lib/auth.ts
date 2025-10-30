import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { betterAuth } from "better-auth";

const client = new MongoClient(process.env.MONGO_URI as string);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db),
  appName: "gearsey-backend",
  secret: process.env.BETTER_AUTH_SECRET as string,
  baseURL: process.env.BETTER_AUTH_URL as string,
  // Add trusted origins to fix CORS issues
  trustedOrigins: ["http://localhost:5173", "http://localhost:3000"],
  plugins: [],
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        default: "customer",
      },
      address: {
        type: "string",
        required: true,
      },
      phone: {
        type: "string",
        required: true,
      },
      rating: {
        type: "number",
        required: false,
        default: 0,
      },
      total_reviews: {
        type: "number",
        required: false,
        default: 0,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    minPasswordLength: 6,
  },
  // Add advanced options for CORS
  advanced: {
    crossSubDomainCookies: {
      enabled: false,
    },
  },
});
