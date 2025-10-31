import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../hooks/useAuth";
import { useAuthRedirect } from "./hooks/useAuthRedirect";
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
  const { user } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

  // Redirect if already logged in
  useAuthRedirect(user);

  // Login hook
  const loginForm = useLoginForm();

  // Signup hook
  const signupForm = useSignupForm();

  // Handle login submit
  const handleLoginSubmit = async (e) => {
    try {
      const loggedInUser = await loginForm.handleSubmit(e);
      const dashboardPath = authService.getRoleDashboardPath(loggedInUser.role);
      navigate(dashboardPath);
    } catch (error) {
      // Error already handled in hook
    }
  };

  // Handle signup submit
  const handleSignupSubmit = async (e) => {
    try {
      const newUser = await signupForm.handleSubmit(e);
      const dashboardPath = authService.getRoleDashboardPath(newUser.role);
      navigate(dashboardPath);
    } catch (error) {
      // Error already handled in hook
    }
  };

  // Toggle between login/signup
  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    if (isLogin) {
      loginForm.resetForm();
    } else {
      signupForm.resetForm();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <AuthHeader isLogin={isLogin} />

        {/* Role Selector - Only for signup */}
        {!isLogin && (
          <RoleSelector
            selectedRole={signupForm.selectedRole}
            onRoleChange={signupForm.setSelectedRole}
          />
        )}

        {/* Auth Type Toggle */}
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

        {/* Forms */}
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

        {/* Role Description - Only for signup */}
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
