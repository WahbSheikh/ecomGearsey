import React, { useState, useEffect } from "react";
import {
  Package,
  Loader2,
  Calendar,
  DollarSign,
  X,
  Clock,
  AlertCircle,
  AlertTriangle,
} from "lucide-react";
import { useAppContext } from "../../../../config/context/AppContext";
import { orderService } from "../../../../services/orderService";

const MyOrders = () => {
  const { state, dispatch } = useAppContext();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [cancellingOrderId, setCancellingOrderId] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!state.user?.id) {
        console.log("❌ No user ID found");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        console.log("📦 Fetching orders for user:", state.user.id);

        const response = await orderService.getUserOrders(state.user.id, 50);
        console.log("✅ Orders fetched:", response);

        setOrders(response.orders || []);
      } catch (err) {
        console.error("❌ Error fetching orders:", err);
        setError(err.message || "Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [state.user?.id]);

  const getFilteredOrders = () => {
    if (filter === "all") return orders;
    return orders.filter((o) => o.delivery_status === filter);
  };

  // Check if order can be cancelled (within 24 hours and status is Pending)
  const canCancelOrder = (order) => {
    // Can only cancel if both statuses are Pending
    if (
      order.delivery_status !== "Pending" ||
      order.payment_status === "Paid"
    ) {
      return false;
    }

    const orderTime = new Date(order.createdAt).getTime();
    const now = Date.now();
    const hoursSinceOrder = (now - orderTime) / (1000 * 60 * 60);
    return hoursSinceOrder < 24;
  };

  // Get remaining time to cancel
  const getCancellationTimeLeft = (orderDate) => {
    const orderTime = new Date(orderDate).getTime();
    const now = Date.now();
    const deadline = orderTime + 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    const timeLeft = deadline - now;

    if (timeLeft <= 0) return null;

    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

    return { hours, minutes };
  };

  // Open cancel confirmation modal
  const openCancelModal = (orderId, order) => {
    if (!canCancelOrder(order)) {
      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          type: "error",
          message: "Cannot cancel this order",
        },
      });
      return;
    }
    setOrderToCancel({ id: orderId, order });
    setShowCancelModal(true);
  };

  // Close cancel modal
  const closeCancelModal = () => {
    setShowCancelModal(false);
    setOrderToCancel(null);
  };

  // Confirm order cancellation
  const confirmCancelOrder = async () => {
    if (!orderToCancel) return;

    try {
      setCancellingOrderId(orderToCancel.id);
      console.log("🚫 Cancelling order:", orderToCancel.id);

      await orderService.cancelOrder(state.user.id, orderToCancel.id);

      // Update local state
      setOrders(
        orders.map((o) =>
          o._id === orderToCancel.id
            ? { ...o, payment_status: "Refunded", delivery_status: "Cancelled" }
            : o
        )
      );

      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          type: "success",
          message: "Order cancelled successfully",
        },
      });

      closeCancelModal();
    } catch (err) {
      console.error("❌ Error cancelling order:", err);
      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          type: "error",
          message: err.message || "Failed to cancel order",
        },
      });
    } finally {
      setCancellingOrderId(null);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";

    try {
      const date = new Date(dateString);
      // Convert to Pakistan time (UTC+5)
      const pakistanTime = new Date(date.getTime() + 5 * 60 * 60 * 1000);

      return pakistanTime.toLocaleString("en-PK", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } catch (err) {
      return "Invalid Date";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="animate-spin h-12 w-12 text-primary-500 mx-auto mb-4" />
          <p className="text-font-secondary">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="card p-6 bg-error-500 bg-opacity-10 border border-error-500">
          <p className="text-error-500 font-semibold">Error loading orders</p>
          <p className="text-error-500 text-sm mt-2">{error}</p>
        </div>
      </div>
    );
  }

  const filteredOrders = getFilteredOrders();

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 animate-slide-down">
          <h1 className="text-3xl font-bold text-font-main mb-2">My Orders</h1>
          <p className="text-font-secondary">View and track all your orders</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="card p-6 animate-slide-up">
            <p className="text-font-secondary text-sm mb-1">Total Orders</p>
            <h3 className="text-2xl font-bold text-font-main">
              {orders.length}
            </h3>
          </div>
          <div className="card p-6 animate-slide-up animate-delay-100">
            <p className="text-font-secondary text-sm mb-1">Pending</p>
            <h3 className="text-2xl font-bold text-warning-500">
              {orders.filter((o) => o.delivery_status === "Pending").length}
            </h3>
          </div>
          <div className="card p-6 animate-slide-up animate-delay-200">
            <p className="text-font-secondary text-sm mb-1">Shipped</p>
            <h3 className="text-2xl font-bold text-primary-500">
              {orders.filter((o) => o.delivery_status === "Shipped").length}
            </h3>
          </div>
          <div className="card p-6 animate-slide-up animate-delay-300">
            <p className="text-font-secondary text-sm mb-1">Delivered</p>
            <h3 className="text-2xl font-bold text-success-500">
              {orders.filter((o) => o.delivery_status === "Delivered").length}
            </h3>
          </div>
        </div>

        {/* Filters */}
        {orders.length > 0 && (
          <div className="card p-6 mb-6 animate-fade-in">
            <label className="text-sm font-semibold text-font-main mb-2 block">
              Filter by Status:
            </label>
            <div className="flex gap-2 flex-wrap">
              {["all", "Pending", "Shipped", "Delivered", "Cancelled"].map(
                (status) => (
                  <button
                    key={status}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all capitalize ${
                      filter === status
                        ? "bg-primary-500 text-white"
                        : "bg-surface-elevated border border-border text-font-secondary hover:border-primary-500"
                    }`}
                    onClick={() => setFilter(status)}
                  >
                    {status}
                  </button>
                )
              )}
            </div>
          </div>
        )}

        {/* Orders List */}
        {filteredOrders.length > 0 ? (
          <div className="space-y-4">
            {filteredOrders.map((order, index) => {
              const timeLeft = getCancellationTimeLeft(order.createdAt);
              const isCancellable = canCancelOrder(order);

              return (
                <div
                  key={order._id}
                  className={`card p-6 hover:shadow-lg transition-shadow animate-slide-up animate-delay-${Math.min(
                    index * 100,
                    400
                  )}`}
                >
                  <div className="flex flex-col gap-4">
                    {/* Order Header */}
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <Package className="text-primary-500" size={24} />
                          <div>
                            <h3 className="text-lg font-semibold text-font-main">
                              Order #{order._id.slice(-8).toUpperCase()}
                            </h3>
                            <p className="text-sm text-font-secondary flex items-center gap-2 mt-1">
                              <Calendar size={14} />
                              {formatDate(order.createdAt)}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="text-left md:text-right">
                        <p className="text-2xl font-bold text-primary-500 flex items-center gap-2 mb-3">
                          <DollarSign size={20} />
                          {order.total_amount.toFixed(2)}
                        </p>
                        <div className="flex flex-wrap gap-2 justify-start md:justify-end">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              order.payment_status === "Paid"
                                ? "bg-success-500 text-white"
                                : order.payment_status === "Failed"
                                ? "bg-error-500 text-white"
                                : order.payment_status === "Refunded"
                                ? "bg-warning-500 text-white"
                                : "bg-warning-500 text-white"
                            }`}
                          >
                            {order.payment_status}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              order.delivery_status === "Delivered"
                                ? "bg-success-500 text-white"
                                : order.delivery_status === "Shipped"
                                ? "bg-primary-500 text-white"
                                : order.delivery_status === "Cancelled"
                                ? "bg-error-500 text-white"
                                : "bg-warning-500 text-white"
                            }`}
                          >
                            {order.delivery_status}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Cancellation Info */}
                    {isCancellable && timeLeft && (
                      <div className="bg-warning-500 bg-opacity-10 border border-warning-500 rounded-lg p-4 flex items-start gap-3">
                        <AlertCircle
                          className="text-warning-500 flex-shrink-0 mt-0.5"
                          size={20}
                        />
                        <div className="flex-1">
                          <p className="text-warning-500 font-semibold text-sm">
                            You can cancel this order within 24 hours
                          </p>
                          <p className="text-warning-500 text-xs mt-1 flex items-center gap-2">
                            <Clock size={12} />
                            Time remaining: {timeLeft.hours}h {timeLeft.minutes}
                            m
                          </p>
                        </div>
                        <button
                          onClick={() => openCancelModal(order._id, order)}
                          disabled={cancellingOrderId === order._id}
                          className="btn-secondary flex items-center gap-2 bg-error-500 text-white hover:bg-error-600 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded-lg font-semibold transition-all"
                        >
                          <X size={16} />
                          Cancel Order
                        </button>
                      </div>
                    )}

                    {/* Order Cancelled Message */}
                    {order.delivery_status === "Cancelled" && (
                      <div className="bg-error-500 bg-opacity-10 border border-error-500 rounded-lg p-4 flex items-center gap-3">
                        <X className="text-error-500" size={20} />
                        <p className="text-error-500 font-semibold text-sm">
                          This order has been cancelled
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="card p-12 text-center animate-fade-in">
            <Package size={64} className="mx-auto text-border mb-4" />
            <h3 className="text-xl font-semibold text-font-main mb-2">
              {orders.length === 0 ? "No orders yet" : "No matching orders"}
            </h3>
            <p className="text-font-secondary mb-6">
              {orders.length === 0
                ? "Start shopping to create your first order!"
                : "Try adjusting your filters to see more orders"}
            </p>
            {orders.length === 0 && (
              <a href="/marketplace" className="btn-primary inline-block">
                Browse Products
              </a>
            )}
          </div>
        )}
      </div>

      {/* Cancel Order Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-surface-main rounded-lg shadow-2xl max-w-md w-full animate-scale-in">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-error-500 bg-opacity-20 flex items-center justify-center">
                  <AlertTriangle className="text-error-500" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-font-main">
                    Cancel Order?
                  </h3>
                  <p className="text-sm text-font-secondary">
                    Order #{orderToCancel?.id.slice(-8).toUpperCase()}
                  </p>
                </div>
              </div>

              {/* Modal Body */}
              <div className="mb-6">
                <p className="text-font-secondary mb-4">
                  Are you sure you want to cancel this order? This action cannot
                  be undone.
                </p>
                <div className="bg-surface-elevated border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-font-secondary text-sm">
                      Order Total:
                    </span>
                    <span className="text-font-main font-bold">
                      ${orderToCancel?.order.total_amount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-font-secondary text-sm">
                      Refund Status:
                    </span>
                    <span className="text-success-500 font-semibold text-sm">
                      Full Refund
                    </span>
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex gap-3">
                <button
                  onClick={closeCancelModal}
                  disabled={cancellingOrderId}
                  className="flex-1 btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Keep Order
                </button>
                <button
                  onClick={confirmCancelOrder}
                  disabled={cancellingOrderId}
                  className="flex-1 bg-error-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-error-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {cancellingOrderId ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      Cancelling...
                    </>
                  ) : (
                    <>
                      <X size={18} />
                      Yes, Cancel Order
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyOrders;
