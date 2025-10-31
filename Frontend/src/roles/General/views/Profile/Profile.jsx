import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Shield,
  Lock,
  Edit,
  Save,
  Camera,
  Calendar,
  Star,
  Package,
  X,
} from "lucide-react";
import { useAppContext } from "../../../../config/context/AppContext";
import { useAuth } from "../../../../hooks/useAuth";
import { authClient } from "../../../../lib/auth";

function Profile() {
  const { state, dispatch } = useAppContext();
  const { refreshSession } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: state.user?.name || "",
    email: state.user?.email || "",
    phone: state.user?.phone || "",
    address: state.user?.address || "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = "Name is required";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone) {
      newErrors.phone = "Phone is required";
    }
    if (!formData.address) {
      newErrors.address = "Address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePassword = () => {
    const newErrors = {};

    if (!passwordData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }
    if (!passwordData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (passwordData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Update user using Better Auth's updateUser method
      const result = await authClient.updateUser({
        name: formData.name,
        email: formData.email,
        // Additional fields (phone, address) if supported by Better Auth
        // You may need to update the user schema to include these
        image: undefined, // Optional: profile image
      });

      if (result.error) {
        throw new Error(result.error.message || "Failed to update profile");
      }

      // For additional custom fields like phone and address,
      // you might need to use Better Auth's custom endpoint or plugin
      // For now, let's update them via the session

      // Refresh session to get updated user data
      await refreshSession();

      // Update local state
      dispatch({
        type: "SET_USER",
        payload: {
          ...state.user,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
        },
      });

      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          type: "success",
          message: "Profile updated successfully!",
        },
      });

      setIsEditing(false);
    } catch (error) {
      console.error("Profile update error:", error);
      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          type: "error",
          message: error.message || "Failed to update profile",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!validatePassword()) return;

    setIsLoading(true);

    try {
      // Change password using Better Auth's changePassword method
      const result = await authClient.changePassword({
        newPassword: passwordData.newPassword,
        currentPassword: passwordData.currentPassword,
        revokeOtherSessions: false, // Set to true if you want to logout other devices
      });

      if (result.error) {
        throw new Error(result.error.message || "Failed to change password");
      }

      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          type: "success",
          message: "Password changed successfully!",
        },
      });

      setIsChangingPassword(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Password change error:", error);
      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          type: "error",
          message: error.message || "Failed to change password",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone!"
    );

    if (!confirmed) return;

    setIsLoading(true);

    try {
      // Delete account using Better Auth's deleteUser method
      const result = await authClient.deleteUser();

      if (result.error) {
        throw new Error(result.error.message || "Failed to delete account");
      }

      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          type: "success",
          message: "Account deleted successfully",
        },
      });

      // Logout and redirect
      await authClient.signOut();
      window.location.href = "/";
    } catch (error) {
      console.error("Account deletion error:", error);
      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          type: "error",
          message: error.message || "Failed to delete account",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-error-500 bg-opacity-20 text-error-500";
      case "seller":
        return "bg-warning-500 bg-opacity-20 text-warning-500";
      case "customer":
        return "bg-success-500 bg-opacity-20 text-success-500";
      default:
        return "bg-primary-500 bg-opacity-20 text-primary-500";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-bg py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-font-main mb-2">My Profile</h1>
          <p className="text-font-secondary">
            Manage your account information and settings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar - Profile Overview */}
          <div className="lg:col-span-1">
            <div className="card p-6 text-center">
              {/* Profile Picture */}
              <div className="relative inline-block mb-4">
                <div className="w-32 h-32 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                  {state.user?.image ? (
                    <img
                      src={state.user.image}
                      alt={state.user.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User size={64} className="text-font-main" />
                  )}
                </div>
                <button className="absolute bottom-0 right-0 bg-surface-elevated p-2 rounded-full border-2 border-bg hover:bg-surface transition-colors">
                  <Camera size={16} className="text-font-main" />
                </button>
              </div>

              {/* User Info */}
              <h2 className="text-2xl font-bold text-font-main mb-1">
                {state.user?.name}
              </h2>
              <p className="text-font-secondary mb-3">{state.user?.email}</p>

              {/* Role Badge */}
              <div className="flex justify-center mb-4">
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 ${getRoleBadgeColor(
                    state.user?.role
                  )}`}
                >
                  <Shield size={16} />
                  {state.user?.role?.toUpperCase()}
                </span>
              </div>

              {/* Stats */}
              <div className="border-t border-border pt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-font-secondary text-sm flex items-center gap-2">
                    <Calendar size={16} />
                    Member Since
                  </span>
                  <span className="text-font-main text-sm font-medium">
                    {formatDate(state.user?.createdAt)}
                  </span>
                </div>

                {state.user?.role === "seller" && (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-font-secondary text-sm flex items-center gap-2">
                        <Star size={16} />
                        Rating
                      </span>
                      <span className="text-font-main text-sm font-medium">
                        {state.user?.rating || 0} ⭐ (
                        {state.user?.total_reviews || 0} reviews)
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-font-secondary text-sm flex items-center gap-2">
                        <Package size={16} />
                        Total Listings
                      </span>
                      <span className="text-font-main text-sm font-medium">
                        {state.userListings?.length || 0}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right Content - Profile Details & Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-font-main flex items-center gap-2">
                  <User size={20} />
                  Personal Information
                </h3>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn-secondary flex items-center gap-2"
                  >
                    <Edit size={16} />
                    Edit
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({
                        name: state.user?.name || "",
                        email: state.user?.email || "",
                        phone: state.user?.phone || "",
                        address: state.user?.address || "",
                      });
                      setErrors({});
                    }}
                    className="btn-secondary flex items-center gap-2"
                  >
                    <X size={16} />
                    Cancel
                  </button>
                )}
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-font-main mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-font-secondary"
                      size={18}
                    />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full pl-10 pr-4 py-2 bg-surface border ${
                        errors.name ? "border-error-500" : "border-border"
                      } rounded-lg text-font-main focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-60 disabled:cursor-not-allowed`}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-error-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-font-main mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-font-secondary"
                      size={18}
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full pl-10 pr-4 py-2 bg-surface border ${
                        errors.email ? "border-error-500" : "border-border"
                      } rounded-lg text-font-main focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-60 disabled:cursor-not-allowed`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-error-500 text-xs mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-font-main mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-font-secondary"
                      size={18}
                    />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full pl-10 pr-4 py-2 bg-surface border ${
                        errors.phone ? "border-error-500" : "border-border"
                      } rounded-lg text-font-main focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-60 disabled:cursor-not-allowed`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-error-500 text-xs mt-1">
                      {errors.phone}
                    </p>
                  )}
                  <p className="text-xs text-font-secondary mt-1">
                    Note: Phone and address updates are stored locally. Contact
                    support to update in database.
                  </p>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-font-main mb-2">
                    Address
                  </label>
                  <div className="relative">
                    <MapPin
                      className="absolute left-3 top-3 text-font-secondary"
                      size={18}
                    />
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      rows={3}
                      className={`w-full pl-10 pr-4 py-2 bg-surface border ${
                        errors.address ? "border-error-500" : "border-border"
                      } rounded-lg text-font-main focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-60 disabled:cursor-not-allowed`}
                    />
                  </div>
                  {errors.address && (
                    <p className="text-error-500 text-xs mt-1">
                      {errors.address}
                    </p>
                  )}
                </div>

                {isEditing && (
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-primary w-full flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save size={16} />
                        Save Changes
                      </>
                    )}
                  </button>
                )}
              </form>
            </div>

            {/* Security Settings */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-font-main flex items-center gap-2">
                  <Lock size={20} />
                  Security Settings
                </h3>
                {!isChangingPassword && (
                  <button
                    onClick={() => setIsChangingPassword(true)}
                    className="btn-secondary"
                  >
                    Change Password
                  </button>
                )}
              </div>

              {isChangingPassword ? (
                <form onSubmit={handleChangePassword} className="space-y-4">
                  {/* Current Password */}
                  <div>
                    <label className="block text-sm font-medium text-font-main mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className={`w-full px-4 py-2 bg-surface border ${
                        errors.currentPassword
                          ? "border-error-500"
                          : "border-border"
                      } rounded-lg text-font-main focus:outline-none focus:ring-2 focus:ring-primary-500`}
                    />
                    {errors.currentPassword && (
                      <p className="text-error-500 text-xs mt-1">
                        {errors.currentPassword}
                      </p>
                    )}
                  </div>

                  {/* New Password */}
                  <div>
                    <label className="block text-sm font-medium text-font-main mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className={`w-full px-4 py-2 bg-surface border ${
                        errors.newPassword
                          ? "border-error-500"
                          : "border-border"
                      } rounded-lg text-font-main focus:outline-none focus:ring-2 focus:ring-primary-500`}
                    />
                    {errors.newPassword && (
                      <p className="text-error-500 text-xs mt-1">
                        {errors.newPassword}
                      </p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-medium text-font-main mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className={`w-full px-4 py-2 bg-surface border ${
                        errors.confirmPassword
                          ? "border-error-500"
                          : "border-border"
                      } rounded-lg text-font-main focus:outline-none focus:ring-2 focus:ring-primary-500`}
                    />
                    {errors.confirmPassword && (
                      <p className="text-error-500 text-xs mt-1">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="btn-primary flex-1 flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Changing...
                        </>
                      ) : (
                        <>
                          <Lock size={16} />
                          Update Password
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsChangingPassword(false);
                        setPasswordData({
                          currentPassword: "",
                          newPassword: "",
                          confirmPassword: "",
                        });
                        setErrors({});
                      }}
                      className="btn-secondary flex-1"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-3 px-4 bg-surface rounded-lg">
                    <span className="text-font-main">Password</span>
                    <span className="text-font-secondary">••••••••</span>
                  </div>
                  <p className="text-sm text-font-secondary">
                    Keep your account secure with a strong password
                  </p>
                </div>
              )}
            </div>

            {/* Danger Zone */}
            <div className="card p-6 border-2 border-error-500 border-opacity-30">
              <h3 className="text-xl font-semibold text-error-500 mb-4">
                Danger Zone
              </h3>
              <p className="text-font-secondary mb-4">
                Once you delete your account, there is no going back. Please be
                certain.
              </p>
              <button
                onClick={handleDeleteAccount}
                disabled={isLoading}
                className="bg-error-500 text-white px-6 py-2 rounded-lg hover:bg-error-600 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Deleting..." : "Delete Account"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
