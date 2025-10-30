import React from "react";
import { useAppContext } from "../../../../config/context/AppContext";
import UserDashboard from "../../../Customer/views/Dashboard/UserDashboard";
import SellerDashboard from "../../../seller/views/Dashboard/SellerDashboard";
import AdminDashboard from "../../../admin/views/Dashboard/AdminDashboard";

function Dashboard() {
  const { state } = useAppContext();

  // Determine which dashboard to show based on user role
  const getUserRole = () => {
    // Check each role explicitly based on user.role only
    if (state.user?.role === "admin") return "admin";
    if (state.user?.role === "seller") return "seller";
    if (state.user?.role === "customer") return "user";

    // Fallback (shouldn't happen if all users have roles)
    return "user";
  };
  const role = getUserRole();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-font-main mb-2">My Dashboard</h1>
        <p className="text-font-secondary">Welcome back, {state.user?.name}</p>
      </div>

      {role === "admin" && <AdminDashboard />}
      {role === "seller" && <SellerDashboard />}
      {role === "user" && <UserDashboard />}
    </div>
  );
}

export default Dashboard;
