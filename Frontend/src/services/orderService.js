const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const orderService = {
  // Create a new order
  async createOrder(orderData) {
    try {
      console.log("🌐 Sending POST request to:", `${API_URL}/api/orders`);
      console.log("📤 Request body:", JSON.stringify(orderData, null, 2));

      const response = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const responseData = await response.json();
      console.log("📥 Response status:", response.status);
      console.log("📥 Response data:", responseData);

      if (!response.ok) {
        throw new Error(
          responseData.message || `Server error: ${response.status}`
        );
      }

      return responseData;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  },

  // Get all orders for a user
  async getUserOrders(userId, limit = 10) {
    try {
      const response = await fetch(
        `${API_URL}/api/orders/${userId}?limit=${limit}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch user orders");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching user orders:", error);
      throw error;
    }
  },

  // Get specific order details with items
  async getOrderDetails(userId, orderId) {
    try {
      const response = await fetch(
        `${API_URL}/api/orders/${userId}/${orderId}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch order details");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching order details:", error);
      throw error;
    }
  },

  // Confirm order (update payment status)
  async confirmOrder(userId, orderId) {
    try {
      const response = await fetch(`${API_URL}/api/orders/confirm`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, orderId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to confirm order");
      }

      return await response.json();
    } catch (error) {
      console.error("Error confirming order:", error);
      throw error;
    }
  },

  // Cancel order
  async cancelOrder(userId, orderId) {
    try {
      const response = await fetch(`${API_URL}/api/orders/cancel`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, orderId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to cancel order");
      }

      return await response.json();
    } catch (error) {
      console.error("Error cancelling order:", error);
      throw error;
    }
  },

  // Delete order
  async deleteOrder(userId, orderId) {
    try {
      const response = await fetch(`${API_URL}/api/orders`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, orderId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete order");
      }

      return await response.json();
    } catch (error) {
      console.error("Error deleting order:", error);
      throw error;
    }
  },
};
