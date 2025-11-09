import React, { useState, useEffect } from "react";
import {
  Package,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Calendar,
  User,
  AlertCircle,
  CheckCircle,
  XCircle,
  Truck,
  Search,
  Filter,
  Download,
  Eye,
} from "lucide-react";
import { orderService } from "../../../../../services/orderService";
import { useAppContext } from "../../../../../config/context/AppContext";

function OrdersManagementTab() {
  const { dispatch } = useAppContext();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const fetchAllOrders = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL || "http://localhost:3000"
        }/api/orders?limit=1000`
      );
      const data = await response.json();
      setOrders(data.orders || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
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

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.userId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || order.delivery_status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const orderStats = {
    total: orders.length,
    pending: orders.filter((o) => o.delivery_status === "Pending").length,
    shipped: orders.filter((o) => o.delivery_status === "Shipped").length,
    delivered: orders.filter((o) => o.delivery_status === "Delivered").length,
    cancelled: orders.filter((o) => o.delivery_status === "Cancelled").length,
    totalRevenue: orders.reduce((sum, o) => sum + (o.total_amount || 0), 0),
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-500/20 border-t-primary-500 mx-auto mb-4"></div>
            <Package
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary-500"
              size={24}
            />
          </div>
          <p className="text-font-secondary font-medium">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-surface-elevated via-surface-elevated to-primary-500/5 rounded-2xl border border-border shadow-lg">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl"></div>
        <div className="relative p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 bg-primary-500/10 rounded-xl border border-primary-500/20">
                  <ShoppingCart className="text-primary-500" size={24} />
                </div>
                <h2 className="text-3xl font-bold text-font-main">
                  Orders & Sales Management
                </h2>
              </div>
              <p className="text-font-secondary text-sm lg:text-base">
                Monitor all platform orders and sales activity
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-5 py-3 bg-gradient-to-r from-success-500 to-success-600 text-white rounded-xl border border-success-400 shadow-lg">
                <div className="flex items-center gap-2">
                  <DollarSign size={20} />
                  <div className="text-left">
                    <p className="text-xs opacity-90">Total Revenue</p>
                    <p className="text-2xl font-bold">
                      ${orderStats.totalRevenue.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-gradient-to-br from-primary-500/10 to-primary-600/5 p-4 rounded-xl border border-primary-500/20 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-500/20 rounded-lg">
                  <Package className="text-primary-500" size={20} />
                </div>
                <div>
                  <p className="text-font-secondary text-xs font-medium">
                    Total Orders
                  </p>
                  <p className="text-font-main text-2xl font-bold">
                    {orderStats.total}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-warning-500/10 to-warning-600/5 p-4 rounded-xl border border-warning-500/20 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-warning-500/20 rounded-lg">
                  <AlertCircle className="text-warning-500" size={20} />
                </div>
                <div>
                  <p className="text-font-secondary text-xs font-medium">
                    Pending
                  </p>
                  <p className="text-font-main text-2xl font-bold">
                    {orderStats.pending}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary-500/10 to-primary-600/5 p-4 rounded-xl border border-primary-500/20 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-500/20 rounded-lg">
                  <Truck className="text-primary-500" size={20} />
                </div>
                <div>
                  <p className="text-font-secondary text-xs font-medium">
                    Shipped
                  </p>
                  <p className="text-font-main text-2xl font-bold">
                    {orderStats.shipped}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-success-500/10 to-success-600/5 p-4 rounded-xl border border-success-500/20 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-success-500/20 rounded-lg">
                  <CheckCircle className="text-success-500" size={20} />
                </div>
                <div>
                  <p className="text-font-secondary text-xs font-medium">
                    Delivered
                  </p>
                  <p className="text-font-main text-2xl font-bold">
                    {orderStats.delivered}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-error-500/10 to-error-600/5 p-4 rounded-xl border border-error-500/20 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-error-500/20 rounded-lg">
                  <XCircle className="text-error-500" size={20} />
                </div>
                <div>
                  <p className="text-font-secondary text-xs font-medium">
                    Cancelled
                  </p>
                  <p className="text-font-main text-2xl font-bold">
                    {orderStats.cancelled}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-1 relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-font-secondary"
                size={18}
              />
              <input
                type="text"
                placeholder="Search by Order ID or User ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-surface border border-border rounded-xl text-font-main placeholder-font-secondary focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2.5 bg-surface border border-border rounded-xl text-font-main focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all appearance-none cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            <button
              onClick={fetchAllOrders}
              className="px-4 py-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-all flex items-center justify-center gap-2 font-medium shadow-lg shadow-primary-500/20"
            >
              <Download size={16} />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-surface-elevated rounded-2xl border border-border overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-surface to-surface-elevated border-b-2 border-border">
              <tr>
                <th className="px-6 py-5 text-left text-xs font-bold text-font-secondary uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-5 text-left text-xs font-bold text-font-secondary uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-5 text-left text-xs font-bold text-font-secondary uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-5 text-left text-xs font-bold text-font-secondary uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-5 text-left text-xs font-bold text-font-secondary uppercase tracking-wider">
                  Delivery
                </th>
                <th className="px-6 py-5 text-left text-xs font-bold text-font-secondary uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-5 text-left text-xs font-bold text-font-secondary uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-16 text-center">
                    <Package size={48} className="mx-auto text-border mb-4" />
                    <p className="text-font-secondary text-lg font-medium">
                      No orders found
                    </p>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr
                    key={order._id}
                    className="hover:bg-surface transition-all duration-200 group"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <Package className="text-primary-500" size={16} />
                        <span className="font-mono text-sm font-semibold text-font-main">
                          #{order._id.slice(-8).toUpperCase()}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <User className="text-font-secondary" size={14} />
                        <span className="font-mono text-xs text-font-secondary">
                          {order.userId.slice(0, 12)}...
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-1">
                        <DollarSign className="text-success-500" size={16} />
                        <span className="text-font-main font-bold">
                          {order.total_amount.toFixed(2)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      {getStatusBadge(order.payment_status, "payment")}
                    </td>
                    <td className="px-6 py-5">
                      {getStatusBadge(order.delivery_status, "delivery")}
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-font-secondary text-sm">
                        <Calendar size={14} />
                        {formatDate(order.createdAt)}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setShowDetailModal(true);
                        }}
                        className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-all flex items-center gap-2 text-sm font-semibold"
                      >
                        <Eye size={14} />
                        View
                      </button>
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
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-surface-elevated rounded-2xl border border-border max-w-3xl w-full my-8 shadow-2xl transform animate-scaleIn">
            <div className="sticky top-0 bg-gradient-to-r from-surface-elevated to-primary-500/5 border-b border-border p-6 flex items-center justify-between z-10 rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-500/10 rounded-xl">
                  <Package className="text-primary-500" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-font-main">
                    Order Details
                  </h2>
                  <p className="text-font-secondary text-sm">
                    #{selectedOrder._id.slice(-8).toUpperCase()}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowDetailModal(false)}
                className="p-2.5 hover:bg-surface rounded-xl transition-colors"
              >
                <XCircle size={24} className="text-font-main" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-surface rounded-xl border border-border">
                  <p className="text-font-secondary text-xs mb-1">
                    Order Amount
                  </p>
                  <p className="text-2xl font-bold text-primary-500">
                    ${selectedOrder.total_amount.toFixed(2)}
                  </p>
                </div>
                <div className="p-4 bg-surface rounded-xl border border-border">
                  <p className="text-font-secondary text-xs mb-1">Order Date</p>
                  <p className="text-sm font-semibold text-font-main">
                    {formatDate(selectedOrder.createdAt)}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-surface rounded-xl border border-border">
                  <p className="text-font-secondary text-xs mb-2">
                    Payment Status
                  </p>
                  {getStatusBadge(selectedOrder.payment_status, "payment")}
                </div>
                <div className="p-4 bg-surface rounded-xl border border-border">
                  <p className="text-font-secondary text-xs mb-2">
                    Delivery Status
                  </p>
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

export default OrdersManagementTab;
