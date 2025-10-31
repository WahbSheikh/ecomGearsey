import { authClient } from "../../../../../lib/auth";

export const authService = {
  async login(email, password) {
    const result = await authClient.signIn.email({
      email,
      password,
    });

    if (result.error) {
      throw new Error(result.error.message || "Login failed");
    }

    return result;
  },

  async signup(userData) {
    const result = await authClient.signUp.email(userData);

    if (result.error) {
      throw new Error(result.error.message || "Signup failed");
    }

    return result;
  },

  getRoleDashboardPath(role) {
    const dashboardPaths = {
      admin: "/dashboard/admin",
      seller: "/dashboard/seller",
      customer: "/dashboard/user",
    };

    return dashboardPaths[role] || "/dashboard/user";
  },
};
