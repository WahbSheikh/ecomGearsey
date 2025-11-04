import { useState, useEffect } from "react";
import { mockOrders, getCurrentUserId } from "../../../data/mockData";
import { useAuth } from "../../../hooks/useAuth";

export const useUserOrders = (orderType = null) => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const userId = getCurrentUserId(user);
      let userOrders = mockOrders.filter((o) => o.userId === userId);

      if (orderType) {
        userOrders = userOrders.filter((o) => o.orderType === orderType);
      }

      setOrders(userOrders);
      setLoading(false);
    }, 500);
  }, [orderType, user]);

  return {
    orders,
    loading,
  };
};
