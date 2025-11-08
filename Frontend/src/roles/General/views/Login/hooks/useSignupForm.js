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
      // ✅ Step 1: Create user account (without role in additionalFields)
      const signupResult = await authService.signup({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
      });

      console.log("✅ User created:", signupResult);

      // ✅ Step 2: Refresh session to get the user ID
      const session = await refreshSession();
      const newUser = session?.data?.user;

      if (!newUser?.id) {
        throw new Error("Failed to get user ID after signup");
      }

      console.log("✅ Session refreshed, user ID:", newUser.id);

      // ✅ Step 3: Set the role using admin.setRole (only if not "customer")
      if (selectedRole !== "customer") {
        console.log(`🔄 Setting role to ${selectedRole}...`);
        const roleResult = await authService.setUserRole(
          newUser.id,
          selectedRole
        );
        console.log("✅ Role set:", roleResult);

        // ✅ Step 4: Refresh session again to get updated role
        const updatedSession = await refreshSession();
        const updatedUser = updatedSession?.data?.user;

        dispatch({
          type: "ADD_NOTIFICATION",
          payload: {
            type: "success",
            message: `Account created successfully as ${selectedRole}! Welcome, ${updatedUser?.name}!`,
          },
        });

        await new Promise((resolve) => setTimeout(resolve, 300));
        return updatedUser;
      }

      // Show success notification for customer
      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          type: "success",
          message: `Account created successfully! Welcome, ${newUser?.name}!`,
        },
      });

      await new Promise((resolve) => setTimeout(resolve, 300));
      return newUser;
    } catch (error) {
      console.error("❌ Signup error:", error);
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
