import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../utils/authService";

export const useAuthRedirect = (user) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const dashboardPath = authService.getRoleDashboardPath(user.role);
      navigate(dashboardPath);
    }
  }, [user, navigate]);
};
