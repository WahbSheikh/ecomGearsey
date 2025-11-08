import { authClient } from "../lib/auth";

export const userAPI = {
  // Get all users (admin only) - Using Better Auth admin.listUsers
  async getAllUsers() {
    try {
      const { data, error } = await authClient.admin.listUsers({
        query: {
          limit: 1000, // Get all users
        },
      });

      if (error) {
        throw new Error(error.message || "Failed to fetch users");
      }

      console.log("✅ Users fetched:", data);

      return {
        users: data.users,
        total: data.total,
      };
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },

  // Update user role (admin only) - Using Better Auth admin.setRole
  async updateUserRole(userId, newRole) {
    try {
      const { data, error } = await authClient.admin.setRole({
        userId: userId,
        role: newRole,
      });

      if (error) {
        throw new Error(error.message || "Failed to update role");
      }

      return data;
    } catch (error) {
      console.error("Error updating user role:", error);
      throw error;
    }
  },

  // Delete user (admin only) - Using Better Auth admin.removeUser ✅
  async deleteUser(userId) {
    try {
      const { data, error } = await authClient.admin.removeUser({
        userId: userId,
      });

      if (error) {
        throw new Error(error.message || "Failed to delete user");
      }

      console.log("✅ User deleted:", data);
      return data;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  },

  // Block/Unblock user (admin only) - Using Better Auth admin.banUser/unbanUser
  async toggleUserStatus(userId, isBlocked) {
    try {
      if (isBlocked) {
        // Ban user
        const { data, error } = await authClient.admin.banUser({
          userId: userId,
          banReason: "Blocked by admin",
        });

        if (error) {
          throw new Error(error.message || "Failed to block user");
        }
        return data;
      } else {
        // Unban user
        const { data, error } = await authClient.admin.unbanUser({
          userId: userId,
        });

        if (error) {
          throw new Error(error.message || "Failed to unblock user");
        }
        return data;
      }
    } catch (error) {
      console.error("Error toggling user status:", error);
      throw error;
    }
  },
};

export default userAPI;
