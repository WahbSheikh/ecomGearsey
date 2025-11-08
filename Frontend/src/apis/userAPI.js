import { authClient } from "../lib/auth";

export const userAPI = {
  // Get all users
  async getAllUsers() {
    try {
      const { data, error } = await authClient.admin.listUsers({
        query: {
          limit: 1000,
        },
      });

      if (error) {
        throw new Error(error.message || "Failed to fetch users");
      }

      return {
        users: data.users,
        total: data.total,
      };
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },

  // Check if admin exists (client-side check)
  async checkAdminExists(users) {
    const admins = users.filter((user) => user.role === "admin");
    return {
      exists: admins.length > 0,
      admin: admins[0] || null,
      count: admins.length,
    };
  },

  // Update user role with client-side validation
  async updateUserRole(userId, newRole, allUsers) {
    try {
      // Client-side validation: Check if trying to create another admin
      if (newRole === "admin") {
        const adminCheck = this.checkAdminExists(allUsers);

        if (adminCheck.exists && adminCheck.admin.id !== userId) {
          throw new Error(
            `Only one admin allowed! ${
              adminCheck.admin.name || adminCheck.admin.email
            } is currently the admin. Please demote them first.`
          );
        }
      }

      // Use Better Auth's built-in setRole
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

  // Delete user
  async deleteUser(userId) {
    try {
      const { data, error } = await authClient.admin.removeUser({
        userId: userId,
      });

      if (error) {
        throw new Error(error.message || "Failed to delete user");
      }

      return data;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  },

  // Block/Unblock user
  async toggleUserStatus(userId, isBlocked) {
    try {
      if (isBlocked) {
        const { data, error } = await authClient.admin.banUser({
          userId: userId,
          banReason: "Blocked by admin",
        });

        if (error) {
          throw new Error(error.message || "Failed to block user");
        }
        return data;
      } else {
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
