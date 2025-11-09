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
  Mail,
  Phone,
  MapPin,
  Download,
  Lock,
  AlertCircle,
} from "lucide-react";
import { userAPI } from "../../../../../apis/userAPI";
import { useAppContext } from "../../../../../config/context/AppContext";
import { useAuth } from "../../../../../hooks/useAuth";

function UsersManagementTab() {
  const { dispatch } = useAppContext();
  const { user: currentUser } = useAuth(); // ✅ Get current logged-in admin
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await userAPI.getAllUsers();
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

  // ✅ Check if user is the current admin
  const isCurrentAdmin = (userId) => {
    return currentUser?.id === userId || currentUser?.id === userId;
  };

  // ✅ Check if user is an admin
  const isAdmin = (user) => {
    return user.role === "admin";
  };

  // ✅ Check if there's already an admin (and it's not the user being changed)
  const hasExistingAdmin = (excludeUserId) => {
    return users.some(
      (u) =>
        u.role === "admin" && u.id !== excludeUserId && u._id !== excludeUserId
    );
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
        return "bg-gradient-to-r from-primary-500/20 to-primary-700/20 text-primary-500 border-primary-500/50";
      case "seller":
        return "bg-gradient-to-r from-secondary-500/20 to-warning-500/20 text-secondary-500 border-secondary-500/50";
      case "customer":
        return "bg-gradient-to-r from-tertiary-500/20 to-success-500/20 text-tertiary-500 border-tertiary-500/50";
      default:
        return "bg-surface text-font-secondary border-border";
    }
  };

  const getStatusBadge = (user) => {
    const isBlocked = user.blocked || user.status === "blocked";
    if (isBlocked) {
      return (
        <span className="px-3 py-1.5 text-xs font-semibold rounded-full bg-gradient-to-r from-error-500/20 to-error-500/10 text-error-500 border border-error-500/50 flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-error-500 animate-pulse" />
          Blocked
        </span>
      );
    }
    return (
      <span className="px-3 py-1.5 text-xs font-semibold rounded-full bg-gradient-to-r from-success-500/20 to-success-500/10 text-success-500 border border-success-500/50 flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-success-500 animate-pulse" />
        Active
      </span>
    );
  };

  const handleDeleteUser = async (userId) => {
    const user = users.find((u) => u.id === userId || u._id === userId);

    // ✅ Prevent deleting yourself
    if (isCurrentAdmin(userId)) {
      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          type: "error",
          message: "You cannot delete your own admin account!",
        },
      });
      return;
    }

    // ✅ Prevent deleting other admins
    if (isAdmin(user)) {
      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          type: "error",
          message: "You cannot delete another admin account!",
        },
      });
      return;
    }

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
        payload: { type: "success", message: "User deleted successfully" },
      });
    } catch (error) {
      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          type: "error",
          message: error.message || "Failed to delete user",
        },
      });
    }
  };

  const handleChangeRole = async (userId, newRole) => {
    const user = users.find((u) => u.id === userId || u._id === userId);

    // ✅ Prevent changing your own role
    if (isCurrentAdmin(userId)) {
      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          type: "error",
          message: "You cannot change your own admin role!",
        },
      });
      return;
    }

    // ✅ Prevent creating more than one admin
    if (newRole === "admin" && hasExistingAdmin(userId)) {
      const existingAdmin = users.find(
        (u) => u.role === "admin" && u.id !== userId && u._id !== userId
      );
      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          type: "error",
          message: `Only one admin allowed! ${
            existingAdmin?.name || existingAdmin?.email
          } is currently the admin.`,
        },
      });
      return;
    }

    // ✅ Prevent demoting other admins
    if (isAdmin(user) && newRole !== "admin") {
      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          type: "error",
          message: "You cannot demote another admin!",
        },
      });
      return;
    }

    try {
      await userAPI.updateUserRole(userId, newRole, users);
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
          message: error.message || "Failed to update user role",
        },
      });
    }
  };

  const handleToggleStatus = async (userId) => {
    const user = users.find((u) => u.id === userId || u._id === userId);

    // ✅ Prevent blocking yourself
    if (isCurrentAdmin(userId)) {
      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          type: "error",
          message: "You cannot block your own admin account!",
        },
      });
      return;
    }

    // ✅ Prevent blocking other admins
    if (isAdmin(user)) {
      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          type: "error",
          message: "You cannot block another admin account!",
        },
      });
      return;
    }

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
          message: error.message || "Failed to update user status",
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
          <div className="w-16 h-16 relative mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-surface-elevated"></div>
            <div className="absolute inset-0 rounded-full border-4 border-primary-500 border-t-transparent animate-spin"></div>
          </div>
          <p className="text-font-main font-semibold mb-1">Loading users...</p>
          <p className="text-font-secondary text-sm">Please wait</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* ✅ Admin Protection Warning Banner */}
      <div className="bg-gradient-to-r from-warning-500/10 to-warning-500/5 border-l-4 border-warning-500 rounded-lg p-4 flex items-start gap-3">
        <AlertCircle
          className="text-warning-500 flex-shrink-0 mt-0.5"
          size={20}
        />
        <div>
          <p className="text-font-main font-semibold text-sm">
            Admin Protection Active
          </p>
          <p className="text-font-secondary text-xs mt-1">
            You cannot modify or delete admin accounts. Only one admin is
            allowed on the platform.
          </p>
        </div>
      </div>

      {/* Enhanced Header with Gradient Background */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-surface-elevated via-surface to-surface-elevated border border-border p-8 shadow-xl">
        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl animate-breathe"></div>
        <div
          className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-500/5 rounded-full blur-3xl animate-breathe"
          style={{ animationDelay: "1s" }}
        ></div>

        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/20">
                <Users className="text-white" size={32} />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-font-main mb-1">
                  Users Management
                </h2>
                <p className="text-font-secondary">
                  Manage all platform users and permissions
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-xl border border-primary-500/50 shadow-lg">
                <Users className="text-primary-500" size={24} />
                <div>
                  <p className="text-xs text-font-secondary">Total Users</p>
                  <p className="text-2xl font-bold text-font-main">
                    {userCounts.total}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="group relative overflow-hidden bg-gradient-to-br from-primary-500/10 to-primary-500/5 hover:from-primary-500/20 hover:to-primary-500/10 p-5 rounded-xl border border-primary-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/10 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/20 group-hover:scale-110 transition-transform">
                  <Shield className="text-white" size={24} />
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-font-main">
                    {userCounts.admin}
                  </p>
                  <p className="text-xs text-font-secondary mt-1">
                    {((userCounts.admin / userCounts.total) * 100 || 0).toFixed(
                      1
                    )}
                    %
                  </p>
                </div>
              </div>
              <p className="text-font-secondary text-sm font-medium">
                Administrators
              </p>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-primary-700"></div>
            </div>

            <div className="group relative overflow-hidden bg-gradient-to-br from-secondary-500/10 to-secondary-500/5 hover:from-secondary-500/20 hover:to-secondary-500/10 p-5 rounded-xl border border-secondary-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-secondary-500/10 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary-500 to-warning-500 flex items-center justify-center shadow-lg shadow-secondary-500/20 group-hover:scale-110 transition-transform">
                  <Store className="text-white" size={24} />
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-font-main">
                    {userCounts.seller}
                  </p>
                  <p className="text-xs text-font-secondary mt-1">
                    {(
                      (userCounts.seller / userCounts.total) * 100 || 0
                    ).toFixed(1)}
                    %
                  </p>
                </div>
              </div>
              <p className="text-font-secondary text-sm font-medium">Sellers</p>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary-500 to-warning-500"></div>
            </div>

            <div className="group relative overflow-hidden bg-gradient-to-br from-tertiary-500/10 to-tertiary-500/5 hover:from-tertiary-500/20 hover:to-tertiary-500/10 p-5 rounded-xl border border-tertiary-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-tertiary-500/10 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-tertiary-500 to-success-500 flex items-center justify-center shadow-lg shadow-tertiary-500/20 group-hover:scale-110 transition-transform">
                  <User className="text-white" size={24} />
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-font-main">
                    {userCounts.customer}
                  </p>
                  <p className="text-xs text-font-secondary mt-1">
                    {(
                      (userCounts.customer / userCounts.total) * 100 || 0
                    ).toFixed(1)}
                    %
                  </p>
                </div>
              </div>
              <p className="text-font-secondary text-sm font-medium">
                Customers
              </p>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-tertiary-500 to-success-500"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Filters Section */}
      <div className="bg-surface-elevated rounded-2xl border border-border p-6 shadow-lg">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative group">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-font-secondary group-focus-within:text-primary-500 transition-colors"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-surface border-2 border-border rounded-xl text-font-main placeholder-font-secondary focus:outline-none focus:border-primary-500 focus:shadow-lg focus:shadow-primary-500/10 transition-all"
            />
          </div>

          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-5 py-3.5 bg-surface border-2 border-border rounded-xl text-font-main focus:outline-none focus:border-primary-500 focus:shadow-lg focus:shadow-primary-500/10 transition-all cursor-pointer"
          >
            <option value="all">All Roles</option>
            <option value="customer">Customers</option>
            <option value="seller">Sellers</option>
            <option value="admin">Admins</option>
          </select>

          <button
            onClick={fetchUsers}
            className="px-6 py-3.5 bg-gradient-to-r from-primary-500 to-primary-700 text-white rounded-xl font-semibold hover:from-primary-600 hover:to-primary-800 transition-all duration-300 shadow-lg shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-500/30 hover:-translate-y-0.5 flex items-center gap-2"
          >
            <Download size={18} />
            Refresh
          </button>
        </div>
      </div>

      {/* Enhanced Users Table */}
      <div className="bg-surface-elevated rounded-2xl border border-border overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-surface to-surface-elevated border-b-2 border-border">
              <tr>
                <th className="px-6 py-5 text-left text-xs font-bold text-font-secondary uppercase tracking-wider">
                  User Information
                </th>
                <th className="px-6 py-5 text-left text-xs font-bold text-font-secondary uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-5 text-left text-xs font-bold text-font-secondary uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-5 text-left text-xs font-bold text-font-secondary uppercase tracking-wider">
                  Contact Details
                </th>
                <th className="px-6 py-5 text-left text-xs font-bold text-font-secondary uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-16 text-center">
                    <Users size={48} className="mx-auto text-border mb-4" />
                    <p className="text-font-secondary text-lg font-medium">
                      No users found
                    </p>
                    <p className="text-font-secondary text-sm mt-1">
                      Try adjusting your filters
                    </p>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user, index) => {
                  const userId = user.id || user._id;
                  const isDropdownOpen = activeDropdown === userId;
                  const isProtected = isAdmin(user); // ✅ Admin accounts are protected

                  return (
                    <tr
                      key={userId}
                      className="hover:bg-surface transition-all duration-200 group"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:shadow-xl group-hover:shadow-primary-500/20 transition-all group-hover:scale-110">
                              {user.name?.charAt(0).toUpperCase() ||
                                user.email?.charAt(0).toUpperCase()}
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success-500 rounded-full border-2 border-surface-elevated"></div>
                            {/* ✅ Protected Badge for Admins */}
                            {isProtected && (
                              <div className="absolute -top-1 -left-1 w-5 h-5 bg-primary-500 rounded-full border-2 border-surface-elevated flex items-center justify-center">
                                <Lock size={10} className="text-white" />
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="text-font-main font-semibold text-base truncate">
                                {user.name || "No Name"}
                              </p>
                              {/* ✅ Show if this is YOU */}
                              {isCurrentAdmin(userId) && (
                                <span className="px-2 py-0.5 bg-primary-500/20 text-primary-500 text-[10px] font-bold rounded-full">
                                  YOU
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-1.5 text-font-secondary text-sm mt-0.5">
                              <Mail size={12} />
                              <p className="truncate">{user.email}</p>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div
                          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border-2 ${getRoleBadgeColor(
                            user.role
                          )} shadow-md`}
                        >
                          {getRoleIcon(user.role)}
                          <span className="text-sm font-bold capitalize">
                            {user.role}
                          </span>
                          {isProtected && <Lock size={12} className="ml-1" />}
                        </div>
                      </td>
                      <td className="px-6 py-5">{getStatusBadge(user)}</td>
                      <td className="px-6 py-5">
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2 text-font-secondary text-sm">
                            <Phone size={14} className="text-secondary-500" />
                            <p className="truncate">
                              {user.phone || "No phone"}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 text-font-secondary text-xs">
                            <MapPin size={12} className="text-tertiary-500" />
                            <p className="truncate max-w-[200px]">
                              {user.address || "No address"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="relative">
                          {/* ✅ Disable dropdown for protected users */}
                          {isProtected ? (
                            <div className="p-2.5 rounded-xl bg-surface-elevated border border-border flex items-center gap-2">
                              <Lock size={16} className="text-font-secondary" />
                              <span className="text-xs text-font-secondary font-medium">
                                Protected
                              </span>
                            </div>
                          ) : (
                            <>
                              <button
                                onClick={() =>
                                  setActiveDropdown(
                                    isDropdownOpen ? null : userId
                                  )
                                }
                                className="p-2.5 hover:bg-surface rounded-xl transition-all duration-200 hover:shadow-md group-hover:bg-surface/50"
                              >
                                <MoreVertical
                                  size={20}
                                  className="text-font-secondary group-hover:text-font-main transition-colors"
                                />
                              </button>

                              {isDropdownOpen && (
                                <>
                                  <div
                                    className="fixed inset-0 z-10"
                                    onClick={() => setActiveDropdown(null)}
                                  />
                                  <div className="absolute right-0 mt-2 w-56 bg-surface-elevated rounded-xl shadow-2xl border-2 border-border py-2 z-20 animate-scale-in">
                                    <div className="px-4 py-2.5 text-xs font-bold text-font-secondary uppercase tracking-wider border-b border-border">
                                      Change Role
                                    </div>
                                    {["customer", "seller", "admin"].map(
                                      (role) => {
                                        const isDisabled =
                                          user.role === role ||
                                          (role === "admin" &&
                                            hasExistingAdmin(userId));

                                        return (
                                          <button
                                            key={role}
                                            onClick={() =>
                                              !isDisabled &&
                                              handleChangeRole(userId, role)
                                            }
                                            disabled={isDisabled}
                                            className={`w-full text-left px-4 py-3 text-sm transition-all flex items-center gap-3 ${
                                              isDisabled
                                                ? "text-font-secondary cursor-not-allowed bg-surface/30"
                                                : "text-font-main hover:bg-surface hover:pl-5"
                                            }`}
                                          >
                                            {getRoleIcon(role)}
                                            <span className="capitalize font-medium">
                                              {role}
                                            </span>
                                            {user.role === role && (
                                              <span className="ml-auto text-xs bg-primary-500/20 text-primary-500 px-2 py-0.5 rounded-full">
                                                Current
                                              </span>
                                            )}
                                            {role === "admin" &&
                                              hasExistingAdmin(userId) &&
                                              user.role !== "admin" && (
                                                <Lock
                                                  size={12}
                                                  className="ml-auto text-error-500"
                                                />
                                              )}
                                          </button>
                                        );
                                      }
                                    )}

                                    <div className="border-t border-border my-2" />

                                    <button
                                      onClick={() => handleToggleStatus(userId)}
                                      className="w-full text-left px-4 py-3 text-sm text-warning-500 hover:bg-surface transition-all flex items-center gap-3 hover:pl-5 font-medium"
                                    >
                                      {user.blocked ||
                                      user.status === "blocked" ? (
                                        <>
                                          <CheckCircle size={18} />
                                          Unblock User
                                        </>
                                      ) : (
                                        <>
                                          <Ban size={18} />
                                          Block User
                                        </>
                                      )}
                                    </button>

                                    <button
                                      onClick={() => handleDeleteUser(userId)}
                                      className="w-full text-left px-4 py-3 text-sm text-error-500 hover:bg-surface transition-all flex items-center gap-3 hover:pl-5 font-medium"
                                    >
                                      <Trash2 size={18} />
                                      Delete User
                                    </button>
                                  </div>
                                </>
                              )}
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
