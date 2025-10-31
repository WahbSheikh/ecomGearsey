import React from "react";
import { useAppContext } from "../../../../config/context/AppContext";
import { useAuth } from "../../../../hooks/useAuth";
import UserDashboard from "../../../Customer/views/Dashboard/UserDashboard";
import SellerDashboard from "../../../seller/views/Dashboard/SellerDashboard";
import AdminDashboard from "../../../admin/views/Dashboard/AdminDashboard";

function Dashboard() {
  const { state } = useAppContext();
  const { user, isPending } = useAuth();

  // ✅ Show loading state
  if (isPending) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      </div>
    );
  }

  // ✅ Use user from either source
  const currentUser = user || state.user;

  // Determine which dashboard to show based on user role
  const getUserRole = () => {
    console.log("Dashboard - Current user:", currentUser);
    console.log("Dashboard - User role:", currentUser?.role);

    if (currentUser?.role === "admin") return "admin";
    if (currentUser?.role === "seller") return "seller";
    if (currentUser?.role === "customer") return "user";

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
