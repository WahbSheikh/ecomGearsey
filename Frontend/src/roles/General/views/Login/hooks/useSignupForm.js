import { useState } from "react";
import { useAppContext } from "../../../../../config/context/AppContext";
import { useAuth } from "../../../../../hooks/useAuth";
import { validateSignupForm } from "../utils/validation";
import { authService } from "../utils/authService";
import { INITIAL_FORM_DATA } from "../utils/constants";

export const useSignupForm = () => {
  const { dispatch } = useAppContext();
  const { refreshSession } = useAuth();

  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState("customer");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateSignupForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    try {
      // Signup
      await authService.signup({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        role: selectedRole,
        phone: formData.phone,
        address: formData.address,
      });

      // ✅ Just refresh session - AppContext will automatically update
      const session = await refreshSession();
      const newUser = session?.data?.user;

      // ❌ REMOVE THIS - Don't manually dispatch SET_USER
      // dispatch({
      //   type: "SET_USER",
      //   payload: newUser,
      // });

      // Show success notification
      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          type: "success",
          message: `Account created successfully! Welcome, ${newUser?.name}!`,
        },
      });

      // ✅ Wait longer for AppContext useEffect to complete
      await new Promise((resolve) => setTimeout(resolve, 300));

      return newUser;
    } catch (error) {
      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          type: "error",
          message: error.message || "Signup failed. Please try again.",
        },
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM_DATA);
    setErrors({});
    setSelectedRole("customer");
  };

  return {
    formData,
    errors,
    isLoading,
    selectedRole,
    setSelectedRole,
    handleInputChange,
    handleSubmit,
    resetForm,
  };
};
