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
      return null;
    }

    setIsLoading(true);

    try {
      console.log(
        "📝 Starting signup for:",
        formData.email,
        "as",
        selectedRole
      );

      // ✅ Step 1: Create user account
      const signupResult = await authService.signup({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
      });

      console.log("✅ Signup result:", signupResult);

      if (signupResult.error) {
        throw new Error(signupResult.error.message || "Signup failed");
      }

      // ✅ Step 2: Wait for session to be created
      await new Promise((resolve) => setTimeout(resolve, 500));

      // ✅ Step 3: Refresh session to get the user ID
      const session = await refreshSession();
      const newUser = session?.data?.user;

      if (!newUser?.id) {
        throw new Error("Failed to get user ID after signup");
      }

      console.log("✅ New user created with ID:", newUser.id);

      // ✅ Step 4: Set the role (if not customer)
      if (selectedRole !== "customer") {
        console.log(`🔄 Setting role to ${selectedRole}...`);

        const roleResult = await authService.setUserRole(
          newUser.id,
          selectedRole
        );

        if (roleResult.error) {
          console.error("⚠️ Failed to set role:", roleResult.error);
          // Continue anyway - user is created
        } else {
          console.log("✅ Role set successfully");
        }

        // ✅ Step 5: Refresh session again to get updated role
        await new Promise((resolve) => setTimeout(resolve, 300));
        const updatedSession = await refreshSession();
        const updatedUser = updatedSession?.data?.user;

        console.log("✅ User with role:", updatedUser);

        dispatch({
          type: "ADD_NOTIFICATION",
          payload: {
            type: "success",
            message: `Account created as ${selectedRole}! Please sign in.`,
          },
        });
      } else {
        dispatch({
          type: "ADD_NOTIFICATION",
          payload: {
            type: "success",
            message: "Account created successfully! Please sign in.",
          },
        });
      }

      // ✅ Return null to indicate signup success (user should login)
      return null;
    } catch (error) {
      console.error("❌ Signup error:", error);

      const errorMessage = error.message || "Signup failed. Please try again.";

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
