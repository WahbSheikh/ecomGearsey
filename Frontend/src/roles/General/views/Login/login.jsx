import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../hooks/useAuth";
import { useLoginForm } from "./hooks/useLoginForm";
import { useSignupForm } from "./hooks/useSignupForm";
import AuthHeader from "./components/AuthHeader";
import RoleSelector from "./components/RoleSelector";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import { authService } from "./utils/authService";
import { ROLES } from "./utils/constants";

function Login() {
  const navigate = useNavigate();
  const { user, isPending } = useAuth(); // ✅ Added isPending
  const [isLogin, setIsLogin] = useState(true);

  const loginForm = useLoginForm();
  const signupForm = useSignupForm();

  // ✅ Redirect if already logged in (after loading complete)
  useEffect(() => {
    if (!isPending && user) {
      console.log("👤 User already logged in, redirecting...", user);
      const dashboardPath = authService.getRoleDashboardPath(user.role);
      navigate(dashboardPath, { replace: true });
    }
  }, [user, isPending, navigate]);

  // Handle login submit
  const handleLoginSubmit = async (e) => {
    try {
      const loggedInUser = await loginForm.handleSubmit(e);

      if (!loggedInUser) {
        console.error("❌ No user returned from login");
        return;
      }

      console.log("🎯 Navigating to dashboard for role:", loggedInUser.role);

      const dashboardPath = authService.getRoleDashboardPath(loggedInUser.role);

      setTimeout(() => {
        navigate(dashboardPath, {
          replace: true,
          state: { user: loggedInUser },
        });
      }, 100);
    } catch (error) {
      console.error("❌ Login submit error:", error);
    }
  };

  // Handle signup submit
  const handleSignupSubmit = async (e) => {
    try {
      await signupForm.handleSubmit(e);

      console.log("✅ Signup successful, switching to login tab");
      setTimeout(() => {
        setIsLogin(true);
        signupForm.resetForm();
      }, 1000);
    } catch (error) {
      console.error("❌ Signup submit error:", error);
    }
  };

  // ✅ Show loading while checking auth
  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-white">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-md w-full space-y-8">
        <AuthHeader isLogin={isLogin} />

        {!isLogin && (
          <RoleSelector
            selectedRole={signupForm.selectedRole}
            onRoleChange={signupForm.setSelectedRole}
          />
        )}

        <div className="flex bg-gray-800 rounded-lg p-1 border border-gray-700">
          <button
            type="button"
            onClick={() => {
              setIsLogin(true);
              signupForm.resetForm();
            }}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-200 ${
              isLogin
                ? "bg-orange-500 text-white shadow-lg"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setIsLogin(false);
              loginForm.resetForm();
            }}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-200 ${
              !isLogin
                ? "bg-orange-500 text-white shadow-lg"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Sign Up
          </button>
        </div>

        {isLogin ? (
          <LoginForm
            formData={loginForm.formData}
            errors={loginForm.errors}
            isLoading={loginForm.isLoading}
            onInputChange={loginForm.handleInputChange}
            onSubmit={handleLoginSubmit}
          />
        ) : (
          <SignupForm
            formData={signupForm.formData}
            errors={signupForm.errors}
            isLoading={signupForm.isLoading}
            selectedRole={signupForm.selectedRole}
            onInputChange={signupForm.handleInputChange}
            onSubmit={handleSignupSubmit}
          />
        )}

        {!isLogin && (
          <div className="text-center bg-gray-800/50 rounded-lg p-4 border border-gray-700">
            <p className="text-gray-400 text-sm">
              Creating account as a{" "}
              <span className="text-orange-400 font-medium">
                {ROLES.find((r) => r.id === signupForm.selectedRole)?.name}
              </span>
            </p>
            <p className="text-gray-500 text-xs mt-1">
              {ROLES.find((r) => r.id === signupForm.selectedRole)?.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
