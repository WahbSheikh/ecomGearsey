import React, { useState, useEffect } from "react";
import {
  Package,
  DollarSign,
  Calendar,
  User,
  AlertCircle,
  CheckCircle,
  XCircle,
  Truck,
  Eye,
  Loader2,
  ShoppingCart,
} from "lucide-react";
import { orderService } from "../../../../../services/orderService";
import { useAppContext } from "../../../../../config/context/AppContext";

function OrdersTab() {
  const { state, dispatch } = useAppContext();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [updatingOrderId, setUpdatingOrderId] = useState(null);

  useEffect(() => {
    fetchSellerOrders();
  }, [state.user?.id]);

  const fetchSellerOrders = async () => {
    if (!state.user?.id) return;
    
    setIsLoading(true);
    try {
      // In a real implementation, you'd have a seller-specific endpoint
      // For now, we'll fetch all orders and filter by seller's products
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api/orders?limit=1000`
      );
      const data = await response.json();
      
      // TODO: Filter orders that contain this seller's products
      // This would require the order items to include seller information
      setOrders(data.orders || []);
    } catch (error) {
      console.error("Error fetching seller orders:", error);
      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          type: "error",
          message: "Failed to load orders",
        },
      });
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    setUpdatingOrderId(orderId);
    try {
      // Update delivery status
      await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api/orders/update-status`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId,
            delivery_status: newStatus,
          }),
        }
      );

      // Update local state
      setOrders(
        orders.map((o) =>
          o._id === orderId ? { ...o, delivery_status: newStatus } : o
        )
      );

      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          type: "success",
          message: `Order status updated to ${newStatus}`,
        },
      });
    } catch (error) {
      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          type: "error",
          message: "Failed to update order status",
        },
      });
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      const pakistanTime = new Date(date.getTime() + 5 * 60 * 60 * 1000);
      return pakistanTime.toLocaleString("en-PK", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } catch (err) {
      return "Invalid Date";
    }
  };

  const getStatusBadge = (status, type = "delivery") => {
    const configs = {
      delivery: {
        Pending: {
          class: "bg-warning-500/20 text-warning-500 border-warning-500/50",
          icon: AlertCircle,
        },
        Shipped: {
          class: "bg-primary-500/20 text-primary-500 border-primary-500/50",
          icon: Truck,
        },
        Delivered: {
          class: "bg-success-500/20 text-success-500 border-success-500/50",
          icon: CheckCircle,
        },
        Cancelled: {
          class: "bg-error-500/20 text-error-500 border-error-500/50",
          icon: XCircle,
        },
      },
      payment: {
        Pending: {
          class: "bg-warning-500/20 text-warning-500 border-warning-500/50",
          icon: AlertCircle,
        },
        Paid: {
          class: "bg-success-500/20 text-success-500 border-success-500/50",
          icon: CheckCircle,
        },
        Failed: {
          class: "bg-error-500/20 text-error-500 border-error-500/50",
          icon: XCircle,
        },
        Refunded: {
          class: "bg-warning-500/20 text-warning-500 border-warning-500/50",
          icon: DollarSign,
        },
      },
    };

    const config = configs[type][status] || configs[type].Pending;
    const Icon = config.icon;

    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border ${config.class}`}
      >
        <Icon size={12} />
        {status}
      </span>
    );
  };

  const orderStats = {
    total: orders.length,
    pending: orders.filter((o) => o.delivery_status === "Pending").length,
    shipped: orders.filter((o) => o.delivery_status === "Shipped").length,
    delivered: orders.filter((o) => o.delivery_status === "Delivered").length,
    totalRevenue: orders.reduce((sum, o) => sum + (o.total_amount || 0), 0),
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="animate-spin h-12 w-12 text-primary-500 mx-auto mb-4" />
          <p className="text-font-secondary">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-font-main">Orders Management</h2>
          <p className="text-font-secondary">Manage your sales and deliveries</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-500/10 rounded-lg">
              <ShoppingCart className="text-primary-500" size={20} />
            </div>
            <div>
              <p className="text-font-secondary text-xs">Total Orders</p>
              <p className="text-2xl font-bold text-font-main">
                {orderStats.total}
              </p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-warning-500/10 rounded-lg">
              <AlertCircle className="text-warning-500" size={20} />
            </div>
            <div>
              <p className="text-font-secondary text-xs">Pending</p>
              <p className="text-2xl font-bold text-font-main">
                {orderStats.pending}
              </p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-success-500/10 rounded-lg">
              <CheckCircle className="text-success-500" size={20} />
            </div>
            <div>
              <p className="text-font-secondary text-xs">Delivered</p>
              <p className="text-2xl font-bold text-font-main">
                {orderStats.delivered}
              </p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-success-500/10 rounded-lg">
              <DollarSign className="text-success-500" size={20} />
            </div>
            <div>
              <p className="text-font-secondary text-xs">Revenue</p>
              <p className="text-2xl font-bold text-font-main">
                ${orderStats.totalRevenue.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface-elevated border-b border-border">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-font-secondary uppercase">
                  Order ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-font-secondary uppercase">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-font-secondary uppercase">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-font-secondary uppercase">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-font-secondary uppercase">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-font-secondary uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <Package size={48} className="mx-auto text-border mb-4" />
                    <p className="text-font-secondary">No orders yet</p>
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr
                    key={order._id}
                    className="hover:bg-surface-elevated transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm font-semibold">
                        #{order._id.slice(-8).toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-mono text-xs text-font-secondary">
                        {order.userId.slice(0, 12)}...
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-font-main">
                        ${order.total_amount.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-2">
                        {getStatusBadge(order.payment_status, "payment")}
                        {getStatusBadge(order.delivery_status, "delivery")}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-font-secondary text-sm">
                        <Calendar size={14} />
                        {formatDate(order.createdAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedOrder(order);
                            setShowDetailModal(true);
                          }}
                          className="px-3 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-all text-xs font-semibold"
                        >
                          <Eye size={14} />
                        </button>
                        {order.delivery_status === "Pending" && (
                          <button
                            onClick={() =>
                              handleUpdateOrderStatus(order._id, "Shipped")
                            }
                            disabled={updatingOrderId === order._id}
                            className="px-3 py-2 bg-success-500 text-white rounded-lg hover:bg-success-600 transition-all text-xs font-semibold disabled:opacity-50"
                          >
                            {updatingOrderId === order._id ? (
                              <Loader2 className="animate-spin" size={14} />
                            ) : (
                              "Ship"
                            )}
                          </button>
                        )}
                        {order.delivery_status === "Shipped" && (
                          <button
                            onClick={() =>
                              handleUpdateOrderStatus(order._id, "Delivered")
                            }
                            disabled={updatingOrderId === order._id}
                            className="px-3 py-2 bg-tertiary-500 text-white rounded-lg hover:bg-tertiary-600 transition-all text-xs font-semibold disabled:opacity-50"
                          >
                            {updatingOrderId === order._id ? (
                              <Loader2 className="animate-spin" size={14} />
                            ) : (
                              "Deliver"
                            )}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {showDetailModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-surface-elevated rounded-2xl border border-border max-w-2xl w-full shadow-2xl">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-font-main">
                  Order Details
                </h3>
                <p className="text-sm text-font-secondary">
                  #{selectedOrder._id.slice(-8).toUpperCase()}
                </p>
              </div>
              <button
                onClick={() => setShowDetailModal(false)}
                className="p-2 hover:bg-surface rounded-lg transition-colors"
              >
                <XCircle size={24} />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-surface rounded-lg border border-border">
                  <p className="text-xs text-font-secondary mb-1">Amount</p>
                  <p className="text-2xl font-bold text-primary-500">
                    ${selectedOrder.total_amount.toFixed(2)}
                  </p>
                </div>
                <div className="p-4 bg-surface rounded-lg border border-border">
                  <p className="text-xs text-font-secondary mb-1">Date</p>
                  <p className="text-sm font-semibold">
                    {formatDate(selectedOrder.createdAt)}
                  </p>
                </div>
                <div className="p-4 bg-surface rounded-lg border border-border">
                  <p className="text-xs text-font-secondary mb-2">Payment</p>
                  {getStatusBadge(selectedOrder.payment_status, "payment")}
                </div>
                <div className="p-4 bg-surface rounded-lg border border-border">
                  <p className="text-xs text-font-secondary mb-2">Delivery</p>
                  {getStatusBadge(selectedOrder.delivery_status, "delivery")}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrdersTab;