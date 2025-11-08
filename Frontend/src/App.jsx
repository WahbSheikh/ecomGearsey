import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navigation from "./roles/General/components/Navigation/Navigation";
import NotificationToast from "./roles/General/components/NotificationToast/NotificationToast";
import Footer from "./roles/General/components/Footer/Footer";
import { AppProvider } from "./config/context/AppContext";
import { useAuth } from "./hooks/useAuth";

// Lazy load components for better performance
const Homepage = lazy(() => import("./roles/General/views/Home/Homepage"));
const ProductGrid = lazy(() =>
  import("./roles/Customer/views/MarketPlace/ProductGrid")
);
const ProductDetails = lazy(() =>
  import("./roles/Customer/views/ProductDetails/ProductDetails")
);
const Cart = lazy(() => import("./roles/Customer/views/Cart/Cart"));
const Checkout = lazy(() => import("./roles/Customer/views/Checkout/Checkout"));
const Login = lazy(() => import("./roles/General/views/Login/login"));
const Profile = lazy(() => import("./roles/General/views/Profile/Profile"));
const SellerDashboard = lazy(() =>
  import("./roles/seller/views/Dashboard/SellerDashboard")
);
const AdminDashboard = lazy(() =>
  import("./roles/admin/views/Dashboard/AdminDashboard")
);
const UserDashboard = lazy(() =>
  import("./roles/Customer/views/Dashboard/UserDashboard")
);
const SellItem = lazy(() =>
  import("./roles/seller/views/ProductListing/ProductListing")
);
const Filter = lazy(() => import("./roles/Customer/views/Filter/Filters"));

// Loading Component
function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
        <p className="mt-4 text-text-muted">Loading...</p>
      </div>
    </div>
  );
}

// Protected Route Component
function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user, isPending } = useAuth();

  if (isPending) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // Redirect to role-specific dashboard
    const dashboardMap = {
      admin: "/dashboard/admin",
      seller: "/dashboard/seller",
      customer: "/dashboard/user",
    };

    const redirectPath = dashboardMap[user.role] || "/";
    console.warn(
      `User role "${user.role}" attempted to access restricted route. Redirecting to ${redirectPath}`
    );

    return <Navigate to={redirectPath} replace />;
  }

  return children;
}

// Public Only Route Component (e.g., login page)
function PublicOnlyRoute({ children }) {
  const { user, isPending } = useAuth();

  if (isPending) {
    return <LoadingSpinner />;
  }

  if (user) {
    // User is already logged in, redirect to their dashboard
    const dashboardMap = {
      admin: "/dashboard/admin",
      seller: "/dashboard/seller",
      customer: "/dashboard/user",
    };

    return <Navigate to={dashboardMap[user.role] || "/"} replace />;
  }

  return children;
}

// Homepage Route Component - Restricts admin and seller access
function HomepageRoute({ children }) {
  const { user, isPending } = useAuth();

  if (isPending) {
    return <LoadingSpinner />;
  }

  // If user is admin or seller, redirect to their dashboard
  if (user && (user.role === "admin" || user.role === "seller")) {
    const dashboardMap = {
      admin: "/dashboard/admin",
      seller: "/dashboard/seller",
    };

    return <Navigate to={dashboardMap[user.role]} replace />;
  }

  // Allow customers and non-logged-in users
  return children;
}

// Dashboard Redirect Component
function DashboardRedirect() {
  const { user, isPending } = useAuth();

  if (isPending) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const dashboardMap = {
    admin: "/dashboard/admin",
    seller: "/dashboard/seller",
    customer: "/dashboard/user",
  };

  const redirectPath = dashboardMap[user.role];

  if (!redirectPath) {
    console.error("Unknown user role:", user.role);
    return <Navigate to="/" replace />;
  }

  return <Navigate to={redirectPath} replace />;
}

// Dashboard Wrapper Component
function DashboardWrapper({ children }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {children}
    </div>
  );
}

// 404 Not Found Component
function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-text mb-4">404</h1>
        <p className="text-xl text-text-muted mb-8">Page not found</p>
        <a
          href="/"
          className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}

function AppRoutes() {
  return (
    <div className="min-h-screen bg-bg flex flex-col">
      <Navigation />
      <NotificationToast />

      <main className="flex-1">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Homepage - Restricted for admin and seller */}
            <Route
              path="/"
              element={
                <HomepageRoute>
                  <Homepage />
                </HomepageRoute>
              }
            />

            {/* Public Routes */}
            <Route path="/marketplace" element={<ProductGrid />} />
            <Route path="/filter" element={<Filter />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />

            {/* Public Only Route - redirects to dashboard if already logged in */}
            <Route
              path="/login"
              element={
                <PublicOnlyRoute>
                  <Login />
                </PublicOnlyRoute>
              }
            />

            {/* Protected Routes - Requires Authentication */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            {/* Checkout - Protected Route (customer only) */}
            <Route
              path="/checkout"
              element={
                <ProtectedRoute allowedRoles={["customer"]}>
                  <Checkout />
                </ProtectedRoute>
              }
            />

            {/* Dashboard - Redirects to role-specific dashboard */}
            <Route path="/dashboard" element={<DashboardRedirect />} />

            {/* Seller Routes */}
            <Route
              path="/sell"
              element={
                <ProtectedRoute allowedRoles={["seller"]}>
                  <SellItem />
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard/seller"
              element={
                <ProtectedRoute allowedRoles={["seller"]}>
                  <DashboardWrapper>
                    <SellerDashboard />
                  </DashboardWrapper>
                </ProtectedRoute>
              }
            />

            {/* Customer Routes */}
            <Route
              path="/dashboard/user"
              element={
                <ProtectedRoute allowedRoles={["customer"]}>
                  <DashboardWrapper>
                    <UserDashboard />
                  </DashboardWrapper>
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/dashboard/admin"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <DashboardWrapper>
                    <AdminDashboard />
                  </DashboardWrapper>
                </ProtectedRoute>
              }
            />

            {/* 404 - Catch all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
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
