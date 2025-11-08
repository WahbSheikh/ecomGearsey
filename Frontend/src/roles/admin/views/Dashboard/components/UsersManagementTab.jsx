import React, { useState, useEffect } from "react";
import {
  Users,
  Shield,
  Store,
  User,
  Search,
  MoreVertical,
  Trash2,
  Ban,
  CheckCircle,
} from "lucide-react";
import { userAPI } from "../../../../../apis/userAPI";
import { useAppContext } from "../../../../../config/context/AppContext";

function UsersManagementTab() {
  const { dispatch } = useAppContext();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Fetch users from backend
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await userAPI.getAllUsers();
      console.log("📦 Fetched users:", response);

      // Handle different response structures
      const usersData = response.users || response.data || response;
      setUsers(Array.isArray(usersData) ? usersData : []);
    } catch (error) {
      console.error("❌ Error fetching users:", error);
      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          type: "error",
          message: "Failed to load users. Please try again.",
        },
      });
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "admin":
        return <Shield size={16} className="text-primary-500" />;
      case "seller":
        return <Store size={16} className="text-secondary-500" />;
      case "customer":
        return <User size={16} className="text-tertiary-500" />;
      default:
        return <User size={16} className="text-font-secondary" />;
    }
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-primary-500/20 text-primary-500 border-primary-500";
      case "seller":
        return "bg-secondary-500/20 text-secondary-500 border-secondary-500";
      case "customer":
        return "bg-tertiary-500/20 text-tertiary-500 border-tertiary-500";
      default:
        return "bg-surface text-font-secondary border-border";
    }
  };

  const getStatusBadge = (user) => {
    const isBlocked = user.blocked || user.status === "blocked";

    if (isBlocked) {
      return (
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-error-500/20 text-error-500 border border-error-500">
          Blocked
        </span>
      );
    }
    return (
      <span className="px-2 py-1 text-xs font-medium rounded-full bg-success-500/20 text-success-500 border border-success-500">
        Active
      </span>
    );
  };

  const handleDeleteUser = async (userId) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this user? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      await userAPI.deleteUser(userId);
      setUsers(
        users.filter((user) => user.id !== userId && user._id !== userId)
      );
      setActiveDropdown(null);

      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          type: "success",
          message: "User deleted successfully",
        },
      });
    } catch (error) {
      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          type: "error",
          message: "Failed to delete user",
        },
      });
    }
  };

  const handleChangeRole = async (userId, newRole) => {
    try {
      await userAPI.updateUserRole(userId, newRole);
      setUsers(
        users.map((user) =>
          user.id === userId || user._id === userId
            ? { ...user, role: newRole }
            : user
        )
      );
      setActiveDropdown(null);

      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          type: "success",
          message: `User role updated to ${newRole}`,
        },
      });
    } catch (error) {
      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          type: "error",
          message: "Failed to update user role",
        },
      });
    }
  };

  const handleToggleStatus = async (userId) => {
    const user = users.find((u) => u.id === userId || u._id === userId);
    const isCurrentlyBlocked = user?.blocked || user?.status === "blocked";

    try {
      await userAPI.toggleUserStatus(userId, !isCurrentlyBlocked);
      setUsers(
        users.map((u) =>
          u.id === userId || u._id === userId
            ? {
                ...u,
                blocked: !isCurrentlyBlocked,
                status: !isCurrentlyBlocked ? "blocked" : "active",
              }
            : u
        )
      );
      setActiveDropdown(null);

      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          type: "success",
          message: `User ${
            !isCurrentlyBlocked ? "blocked" : "unblocked"
          } successfully`,
        },
      });
    } catch (error) {
      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          type: "error",
          message: "Failed to update user status",
        },
      });
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  // Count users by role
  const userCounts = {
    total: users.length,
    admin: users.filter((u) => u.role === "admin").length,
    seller: users.filter((u) => u.role === "seller").length,
    customer: users.filter((u) => u.role === "customer").length,
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-font-secondary">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-font-main mb-2">
              Users Management
            </h2>
            <p className="text-font-secondary">Manage all platform users</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-primary-500/10 rounded-lg border border-primary-500">
            <Users className="text-primary-500" size={20} />
            <span className="text-font-main font-bold">
              {userCounts.total} Users
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-surface-elevated p-4 rounded-lg border border-border">
            <div className="flex items-center gap-3">
              <Shield className="text-primary-500" size={24} />
              <div>
                <p className="text-font-secondary text-sm">Admins</p>
                <p className="text-font-main text-2xl font-bold">
                  {userCounts.admin}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-surface-elevated p-4 rounded-lg border border-border">
            <div className="flex items-center gap-3">
              <Store className="text-secondary-500" size={24} />
              <div>
                <p className="text-font-secondary text-sm">Sellers</p>
                <p className="text-font-main text-2xl font-bold">
                  {userCounts.seller}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-surface-elevated p-4 rounded-lg border border-border">
            <div className="flex items-center gap-3">
              <User className="text-tertiary-500" size={24} />
              <div>
                <p className="text-font-secondary text-sm">Customers</p>
                <p className="text-font-main text-2xl font-bold">
                  {userCounts.customer}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-font-secondary"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-surface border border-border rounded-lg text-font-main placeholder-font-secondary focus:outline-none focus:border-primary-500"
            />
          </div>

          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-2 bg-surface border border-border rounded-lg text-font-main focus:outline-none focus:border-primary-500"
          >
            <option value="all">All Roles</option>
            <option value="customer">Customers</option>
            <option value="seller">Sellers</option>
            <option value="admin">Admins</option>
          </select>

          <button
            onClick={fetchUsers}
            className="px-4 py-2 bg-primary-500 text-font-main rounded-lg hover:bg-primary-700 transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface-elevated border-b border-border">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-font-secondary uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-font-secondary uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-font-secondary uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-font-secondary uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-font-secondary uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-12 text-center text-font-secondary"
                  >
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => {
                  const userId = user.id || user._id;
                  const isDropdownOpen = activeDropdown === userId;

                  return (
                    <tr
                      key={userId}
                      className="hover:bg-surface-elevated transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-font-main font-bold">
                            {user.name?.charAt(0).toUpperCase() ||
                              user.email?.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-font-main font-medium">
                              {user.name || "No Name"}
                            </p>
                            <p className="text-font-secondary text-sm">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${getRoleBadgeColor(
                            user.role
                          )}`}
                        >
                          {getRoleIcon(user.role)}
                          <span className="text-xs font-medium capitalize">
                            {user.role}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">{getStatusBadge(user)}</td>
                      <td className="px-6 py-4">
                        <p className="text-font-secondary text-sm">
                          {user.phone || "No phone"}
                        </p>
                        <p className="text-font-secondary text-xs">
                          {user.address || "No address"}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="relative">
                          <button
                            onClick={() =>
                              setActiveDropdown(isDropdownOpen ? null : userId)
                            }
                            className="p-2 hover:bg-surface rounded-lg transition-colors"
                          >
                            <MoreVertical
                              size={18}
                              className="text-font-secondary"
                            />
                          </button>

                          {isDropdownOpen && (
                            <>
                              <div
                                className="fixed inset-0 z-10"
                                onClick={() => setActiveDropdown(null)}
                              />
                              <div className="absolute right-0 mt-2 w-48 bg-surface-elevated rounded-lg shadow-xl border border-border py-2 z-20">
                                <div className="px-4 py-2 text-xs font-semibold text-font-secondary uppercase tracking-wider border-b border-border">
                                  Change Role
                                </div>
                                {["customer", "seller", "admin"].map((role) => (
                                  <button
                                    key={role}
                                    onClick={() =>
                                      handleChangeRole(userId, role)
                                    }
                                    disabled={user.role === role}
                                    className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center gap-2 ${
                                      user.role === role
                                        ? "text-font-secondary cursor-not-allowed"
                                        : "text-font-main hover:bg-surface"
                                    }`}
                                  >
                                    {getRoleIcon(role)}
                                    <span className="capitalize">{role}</span>
                                    {user.role === role && (
                                      <span className="ml-auto text-xs">
                                        (Current)
                                      </span>
                                    )}
                                  </button>
                                ))}

                                <div className="border-t border-border my-2" />

                                <button
                                  onClick={() => handleToggleStatus(userId)}
                                  className="w-full text-left px-4 py-2 text-sm text-warning-500 hover:bg-surface transition-colors flex items-center gap-2"
                                >
                                  {user.blocked || user.status === "blocked" ? (
                                    <>
                                      <CheckCircle size={16} />
                                      Unblock User
                                    </>
                                  ) : (
                                    <>
                                      <Ban size={16} />
                                      Block User
                                    </>
                                  )}
                                </button>

                                <button
                                  onClick={() => handleDeleteUser(userId)}
                                  className="w-full text-left px-4 py-2 text-sm text-error-500 hover:bg-surface transition-colors flex items-center gap-2"
                                >
                                  <Trash2 size={16} />
                                  Delete User
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UsersManagementTab;
