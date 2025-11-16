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
    // ✅ Don't pass role here - will be set separately
    const result = await authClient.signUp.email(userData);

    if (result.error) {
      throw new Error(result.error.message || "Signup failed");
    }

    return result;
  },

  // ✅ Method to set user role
  async setUserRole(userId, role) {
    const result = await authClient.admin.setRole({
      userId: userId,
      role: role,
    });

    if (result.error) {
      throw new Error(result.error.message || "Failed to set role");
    }

    return result;
  },

  // ✅ NEW: Check if admin exists
  async checkAdminExists() {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL || "http://localhost:3000"
        }/api/auth/check-admin`
      );

      if (!response.ok) {
        throw new Error("Failed to check admin status");
      }

      const data = await response.json();
      return data.adminExists || false;
    } catch (error) {
      console.error("❌ Error checking admin existence:", error);
      return false; // Default to allowing admin creation if check fails
    }
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
