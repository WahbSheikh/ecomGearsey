import { useState } from "react";
import { useAppContext } from "../../../../../config/context/AppContext";
import { useAuth } from "../../../../../hooks/useAuth";
import { validateLoginForm } from "../utils/validation";
import { authService } from "../utils/authService";
import { INITIAL_FORM_DATA } from "../utils/constants";

export const useLoginForm = () => {
  const { dispatch } = useAppContext();
  const { refreshSession } = useAuth();

  const [formData, setFormData] = useState({
    email: INITIAL_FORM_DATA.email,
    password: INITIAL_FORM_DATA.password,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateLoginForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return null;
    }

    setIsLoading(true);

    try {
      console.log("🔐 Starting login with:", formData.email);

      // ✅ Step 1: Login
      const loginResult = await authService.login(
        formData.email,
        formData.password
      );
      console.log("✅ Login API result:", loginResult);

      if (loginResult.error) {
        throw new Error(loginResult.error.message || "Login failed");
      }

      // ✅ Step 2: Wait a bit for session to be created
      await new Promise((resolve) => setTimeout(resolve, 500));

      // ✅ Step 3: Refresh session to get user data
      const session = await refreshSession();
      console.log("✅ Session after login:", session);

      const loggedInUser = session?.data?.user;

      if (!loggedInUser) {
        throw new Error("Failed to get user data after login");
      }

      console.log("✅ Logged in user:", loggedInUser);

      // Show success notification
      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          type: "success",
          message: `Welcome back, ${loggedInUser.name || "User"}!`,
        },
      });

      return loggedInUser;
    } catch (error) {
      console.error("❌ Login error:", error);

      // Show user-friendly error
      const errorMessage =
        error.message || "Login failed. Please check your credentials.";

      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          type: "error",
          message: errorMessage,
        },
      });

      setErrors({
        email: " ",
        password: errorMessage,
      });

      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      email: INITIAL_FORM_DATA.email,
      password: INITIAL_FORM_DATA.password,
    });
    setErrors({});
  };

  return {
    formData,
    errors,
    isLoading,
    handleInputChange,
    handleSubmit,
    resetForm,
  };
};
