import { useState, useEffect } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { orderService } from "../../../services/orderService";

export const useUserOrders = (orderType = null) => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await orderService.getUserOrders(user.id, 50);
        let userOrders = response.orders || [];

        // Filter by order type if specified
        if (orderType && orderType !== "all") {
          userOrders = userOrders.filter((o) => o.orderType === orderType);
        }

        setOrders(userOrders);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError(err.message || "Failed to fetch orders");
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [orderType, user?.id]);

  return {
    orders,
    loading,
    error,
  };
};
