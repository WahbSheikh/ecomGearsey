import { createAuthClient } from "better-auth/client";
import { adminClient } from "better-auth/client/plugins"; // ✅ Import admin client

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
  plugins: [
    adminClient(), // ✅ Add admin client plugin
  ],
});
