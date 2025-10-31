import React from "react";
import { useAppContext } from "../../../../config/context/AppContext";
import UserDashboard from "../../../Customer/views/Dashboard/UserDashboard";
import SellerDashboard from "../../../seller/views/Dashboard/SellerDashboard";
import AdminDashboard from "../../../admin/views/Dashboard/AdminDashboard";

function Dashboard() {
  const { state } = useAppContext();

  // Determine which dashboard to show based on user role
  const getUserRole = () => {
    console.log("Dashboard - Current user:", state.user);
    console.log("Dashboard - User role:", state.user?.role);

    if (state.user?.role === "admin") return "admin";
    if (state.user?.role === "seller") return "seller";
    if (state.user?.role === "customer") return "user";

    // Fallback to user if no role set
    return "user";
  };

  const role = getUserRole();
  console.log("Dashboard - Determined role:", role);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {role === "admin" && <AdminDashboard />}
      {role === "seller" && <SellerDashboard />}
      {role === "user" && <UserDashboard />}
    </div>
  );
}

export default Dashboard;
