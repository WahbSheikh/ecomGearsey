import React from "react";
import { Navigate, useLocation } from "react-router-dom";
// Correct relative path: routes.jsx is in config/routes, AppContext is in config/context
import { useAppContext } from "../context/AppContext";

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const location = useLocation();
  const { state } = useAppContext();
  const user = state?.user ?? null;

  if (!user || !user.isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  let role = null;
  if (typeof user.role === "string" && user.role.length > 0) {
    role = user.role;
  } else if (user.isAdmin) {
    role = "admin";
  } else if (user.isSeller) {
    role = "seller";
  } else {
    role = "customer";
  }

  if (Array.isArray(allowedRoles) && allowedRoles.length > 0) {
    if (!allowedRoles.includes(role)) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return children;
}
