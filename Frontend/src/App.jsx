import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navigation from "./roles/General/components/Navigation/Navigation";
import Homepage from "./roles/General/views/Home/Homepage";
import ProductGrid from "./roles/Customer/views/MarketPlace/ProductGrid";
import ProductDetails from "./roles/Customer/views/ProductDetails/ProductDetails";
import Cart from "./roles/Customer/views/Cart/Cart";
import Dashboard from "./roles/General/views/Dashboard/Dashboard";
import UserDashboard from "./roles/Customer/views/Dashboard/UserDashboard";
import Login from "./roles/General/views/Login/login";
import Profile from "./roles/General/views/Profile/Profile";
import SellerDashboard from "./roles/seller/views/Dashboard/SellerDashboard";
import AdminDashboard from "./roles/admin/views/Dashboard/AdminDashboard";
import SellItem from "./roles/seller/views/ProductListing/ProductListing";
import NotificationToast from "./roles/General/components/NotificationToast/NotificationToast";
import Filter from "./roles/Customer/views/Filter/Filters";
import Footer from "./roles/General/components/Footer/Footer";
import { AppProvider } from "./config/context/AppContext";
import { useAuth } from "./hooks/useAuth";

// Protected Route Component
function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user, isPending } = useAuth();

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

function AppRoutes() {
  return (
    <div className="min-h-screen bg-bg flex flex-col">
      <Navigation />
      <NotificationToast />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/marketplace" element={<ProductGrid />} />
          <Route path="/filter" element={<Filter />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/sell"
            element={
              <ProtectedRoute allowedRoles={["seller"]}>
                <SellItem />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/user"
            element={
              <ProtectedRoute allowedRoles={["customer"]}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  <div className="mb-8">
                    <h1 className="text-3xl font-bold text-font-main mb-2">
                      My Dashboard
                    </h1>
                  </div>
                  <UserDashboard />
                </div>
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/seller"
            element={
              <ProtectedRoute allowedRoles={["seller"]}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  <div className="mb-8">
                    <h1 className="text-3xl font-bold text-font-main mb-2">
                      Seller Dashboard
                    </h1>
                  </div>
                  <SellerDashboard />
                </div>
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  <div className="mb-8">
                    <h1 className="text-3xl font-bold text-font-main mb-2">
                      Admin Dashboard
                    </h1>
                  </div>
                  <AdminDashboard />
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AppProvider>
  );
}

export default App;
