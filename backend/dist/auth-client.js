import { createAuthClient } from "better-auth/client";
import { inferAdditionalFields } from "better-auth/client/plugins";
export const authClient = createAuthClient({
    baseURL: "http://localhost:3000",
    plugins: [inferAdditionalFields()],
});
//# sourceMappingURL=auth-client.js.map