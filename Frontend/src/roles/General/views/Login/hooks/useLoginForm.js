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
      return;
    }

    setIsLoading(true);

    try {
      console.log("🔐 Starting login...");

      // Login
      await authService.login(formData.email, formData.password);
      console.log("✅ Login API call successful");

      // Refresh session
      const session = await refreshSession();
      const loggedInUser = session?.data?.user;

      console.log("✅ Session refreshed, user:", loggedInUser);

      if (!loggedInUser) {
        throw new Error("Failed to get user data after login");
      }

      // Show success notification
      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          type: "success",
          message: `Welcome back, ${loggedInUser.name || "User"}!`,
        },
      });

      console.log("✅ Login complete, returning user");

      return loggedInUser;
    } catch (error) {
      console.error("❌ Login error:", error);
      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          type: "error",
          message: error.message || "Login failed. Please try again.",
        },
      });
      throw error;
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
