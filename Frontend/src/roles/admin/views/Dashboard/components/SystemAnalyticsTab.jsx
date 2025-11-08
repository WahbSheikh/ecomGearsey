import React, { useState, useEffect } from "react";
import {
  BarChart3,
  TrendingUp,
  Users,
  Package,
  DollarSign,
  ShoppingCart,
  Activity,
  Zap,
  ArrowUp,
  Shield,
  Store,
  User,
  RefreshCw,
} from "lucide-react";
import { userAPI } from "../../../../../apis/userAPI";
import { productListingAPI } from "../../../../../apis/productListing";

function SystemAnalyticsTab() {
  const [analytics, setAnalytics] = useState({
    totalUsers: 0,
    totalListings: 0,
    totalAuctions: 0,
    totalBuyNow: 0,
    usersByRole: {
      admin: 0,
      seller: 0,
      customer: 0,
    },
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    setIsLoading(true);
    try {
      const [usersResponse, listingsResponse] = await Promise.all([
        userAPI.getAllUsers().catch(() => ({ users: [] })),
        productListingAPI
          .getProducts({ limit: 1000 })
          .catch(() => ({ products: [] })),
      ]);

      const users = usersResponse.users || usersResponse.data || [];
      const listings = listingsResponse.products || listingsResponse.data || [];

      const usersByRole = users.reduce(
        (acc, user) => {
          acc[user.role] = (acc[user.role] || 0) + 1;
          return acc;
        },
        { admin: 0, seller: 0, customer: 0 }
      );

      const totalAuctions = listings.filter((l) => l.isAuction).length;
      const totalBuyNow = listings.filter((l) => !l.isAuction).length;

      setAnalytics({
        totalUsers: users.length,
        totalListings: listings.length,
        totalAuctions,
        totalBuyNow,
        usersByRole,
      });
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 relative mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-surface-elevated"></div>
            <div className="absolute inset-0 rounded-full border-4 border-tertiary-500 border-t-transparent animate-spin"></div>
          </div>
          <p className="text-font-main font-semibold mb-1">
            Loading analytics...
          </p>
          <p className="text-font-secondary text-sm">Crunching the numbers</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-surface-elevated via-surface to-surface-elevated border border-border p-8 shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-tertiary-500/5 rounded-full blur-3xl animate-breathe"></div>
        <div
          className="absolute bottom-0 left-0 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl animate-breathe"
          style={{ animationDelay: "1s" }}
        ></div>

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-tertiary-500 to-success-500 flex items-center justify-center shadow-lg shadow-tertiary-500/20">
              <BarChart3 className="text-white" size={32} />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-font-main mb-1">
                System Analytics
              </h2>
              <p className="text-font-secondary">
                Real-time platform performance and metrics
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="group relative overflow-hidden bg-gradient-to-br from-primary-500/10 to-primary-500/5 hover:from-primary-500/20 hover:to-primary-500/10 p-6 rounded-2xl border-2 border-primary-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary-500/10 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/30 group-hover:scale-110 transition-transform">
              <Users className="text-white" size={28} />
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-success-500/20 text-success-500 rounded-full text-xs font-bold">
              <ArrowUp size={12} />
              12%
            </div>
          </div>
          <div>
            <p className="text-font-secondary text-sm font-medium mb-1">
              Total Users
            </p>
            <p className="text-4xl font-bold text-font-main mb-1">
              {analytics.totalUsers}
            </p>
            <p className="text-font-secondary text-xs">Platform members</p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-primary-700"></div>
        </div>

        <div className="group relative overflow-hidden bg-gradient-to-br from-secondary-500/10 to-secondary-500/5 hover:from-secondary-500/20 hover:to-secondary-500/10 p-6 rounded-2xl border-2 border-secondary-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-secondary-500/10 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary-500 to-warning-500 flex items-center justify-center shadow-lg shadow-secondary-500/30 group-hover:scale-110 transition-transform">
              <Package className="text-white" size={28} />
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-success-500/20 text-success-500 rounded-full text-xs font-bold">
              <ArrowUp size={12} />
              8%
            </div>
          </div>
          <div>
            <p className="text-font-secondary text-sm font-medium mb-1">
              Total Listings
            </p>
            <p className="text-4xl font-bold text-font-main mb-1">
              {analytics.totalListings}
            </p>
            <p className="text-font-secondary text-xs">Products available</p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary-500 to-warning-500"></div>
        </div>

        <div className="group relative overflow-hidden bg-gradient-to-br from-tertiary-500/10 to-tertiary-500/5 hover:from-tertiary-500/20 hover:to-tertiary-500/10 p-6 rounded-2xl border-2 border-tertiary-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-tertiary-500/10 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-tertiary-500 to-success-500 flex items-center justify-center shadow-lg shadow-tertiary-500/30 group-hover:scale-110 transition-transform">
              <TrendingUp className="text-white" size={28} />
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-warning-500/20 text-warning-500 rounded-full text-xs font-bold">
              <Activity size={12} />
              Live
            </div>
          </div>
          <div>
            <p className="text-font-secondary text-sm font-medium mb-1">
              Active Auctions
            </p>
            <p className="text-4xl font-bold text-font-main mb-1">
              {analytics.totalAuctions}
            </p>
            <p className="text-font-secondary text-xs">Ongoing bids</p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-tertiary-500 to-success-500"></div>
        </div>

        <div className="group relative overflow-hidden bg-gradient-to-br from-success-500/10 to-success-500/5 hover:from-success-500/20 hover:to-success-500/10 p-6 rounded-2xl border-2 border-success-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-success-500/10 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-success-500 to-tertiary-500 flex items-center justify-center shadow-lg shadow-success-500/30 group-hover:scale-110 transition-transform">
              <ShoppingCart className="text-white" size={28} />
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-success-500/20 text-success-500 rounded-full text-xs font-bold">
              <Zap size={12} />
              Active
            </div>
          </div>
          <div>
            <p className="text-font-secondary text-sm font-medium mb-1">
              Buy Now Items
            </p>
            <p className="text-4xl font-bold text-font-main mb-1">
              {analytics.totalBuyNow}
            </p>
            <p className="text-font-secondary text-xs">Instant purchase</p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-success-500 to-tertiary-500"></div>
        </div>
      </div>

      {/* Users by Role - Enhanced */}
      <div className="bg-surface-elevated rounded-2xl border-2 border-border p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
            <Users className="text-white" size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-font-main">
              User Distribution
            </h3>
            <p className="text-font-secondary text-sm">
              Breakdown by role type
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="group relative overflow-hidden bg-gradient-to-br from-primary-500/10 to-primary-500/5 hover:from-primary-500/15 hover:to-primary-500/10 p-6 rounded-xl border-2 border-primary-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/10 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Shield className="text-white" size={24} />
              </div>
            </div>
            <p className="text-font-secondary text-sm font-medium mb-2">
              Administrators
            </p>
            <p className="text-4xl font-bold text-primary-500 mb-3">
              {analytics.usersByRole.admin}
            </p>
            <div className="relative w-full h-2 bg-surface rounded-full overflow-hidden mb-2">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary-500 to-primary-700 transition-all duration-1000"
                style={{
                  width: `${
                    (analytics.usersByRole.admin / analytics.totalUsers) *
                      100 || 0
                  }%`,
                }}
              ></div>
            </div>
            <p className="text-font-secondary text-xs font-semibold">
              {(
                (analytics.usersByRole.admin / analytics.totalUsers) * 100 || 0
              ).toFixed(1)}
              % of total users
            </p>
          </div>

          <div className="group relative overflow-hidden bg-gradient-to-br from-secondary-500/10 to-secondary-500/5 hover:from-secondary-500/15 hover:to-secondary-500/10 p-6 rounded-xl border-2 border-secondary-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-secondary-500/10 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary-500 to-warning-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Store className="text-white" size={24} />
              </div>
            </div>
            <p className="text-font-secondary text-sm font-medium mb-2">
              Sellers
            </p>
            <p className="text-4xl font-bold text-secondary-500 mb-3">
              {analytics.usersByRole.seller}
            </p>
            <div className="relative w-full h-2 bg-surface rounded-full overflow-hidden mb-2">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-secondary-500 to-warning-500 transition-all duration-1000"
                style={{
                  width: `${
                    (analytics.usersByRole.seller / analytics.totalUsers) *
                      100 || 0
                  }%`,
                }}
              ></div>
            </div>
            <p className="text-font-secondary text-xs font-semibold">
              {(
                (analytics.usersByRole.seller / analytics.totalUsers) * 100 || 0
              ).toFixed(1)}
              % of total users
            </p>
          </div>

          <div className="group relative overflow-hidden bg-gradient-to-br from-tertiary-500/10 to-tertiary-500/5 hover:from-tertiary-500/15 hover:to-tertiary-500/10 p-6 rounded-xl border-2 border-tertiary-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-tertiary-500/10 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-tertiary-500 to-success-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <User className="text-white" size={24} />
              </div>
            </div>
            <p className="text-font-secondary text-sm font-medium mb-2">
              Customers
            </p>
            <p className="text-4xl font-bold text-tertiary-500 mb-3">
              {analytics.usersByRole.customer}
            </p>
            <div className="relative w-full h-2 bg-surface rounded-full overflow-hidden mb-2">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-tertiary-500 to-success-500 transition-all duration-1000"
                style={{
                  width: `${
                    (analytics.usersByRole.customer / analytics.totalUsers) *
                      100 || 0
                  }%`,
                }}
              ></div>
            </div>
            <p className="text-font-secondary text-xs font-semibold">
              {(
                (analytics.usersByRole.customer / analytics.totalUsers) * 100 ||
                0
              ).toFixed(1)}
              % of total users
            </p>
          </div>
        </div>
      </div>

      {/* Refresh Button */}
      <div className="bg-surface-elevated rounded-2xl border-2 border-border p-8 text-center shadow-xl">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
            <BarChart3 className="text-white" size={32} />
          </div>
          <h3 className="text-xl font-bold text-font-main mb-2">
            Keep Analytics Fresh
          </h3>
          <p className="text-font-secondary text-sm mb-6">
            Click below to refresh and get the latest platform metrics
          </p>
          <button
            onClick={fetchAnalytics}
            disabled={isLoading}
            className="px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl font-bold hover:from-primary-600 hover:to-secondary-600 transition-all duration-300 shadow-lg shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-500/30 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 mx-auto"
          >
            <RefreshCw size={20} className={isLoading ? "animate-spin" : ""} />
            {isLoading ? "Refreshing..." : "Refresh Analytics"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SystemAnalyticsTab;
