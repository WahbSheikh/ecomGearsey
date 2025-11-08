import React, { useState, useEffect } from "react";
import {
  BarChart3,
  TrendingUp,
  Users,
  Package,
  DollarSign,
  ShoppingCart,
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
      // Fetch users and listings in parallel
      const [usersResponse, listingsResponse] = await Promise.all([
        userAPI.getAllUsers().catch(() => ({ users: [] })),
        productListingAPI
          .getProducts({ limit: 1000 })
          .catch(() => ({ products: [] })),
      ]);

      const users = usersResponse.users || usersResponse.data || [];
      const listings = listingsResponse.products || listingsResponse.data || [];

      // Calculate analytics
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-font-secondary">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card p-6">
        <h2 className="text-2xl font-bold text-font-main mb-2">
          System Analytics
        </h2>
        <p className="text-font-secondary">
          Overview of platform performance and metrics
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <Users className="h-8 w-8 text-primary-500" />
            <span className="text-success-500 text-sm font-medium">Total</span>
          </div>
          <h3 className="text-font-secondary text-sm mb-1">Total Users</h3>
          <p className="text-3xl font-bold text-font-main">
            {analytics.totalUsers}
          </p>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <Package className="h-8 w-8 text-secondary-500" />
            <span className="text-success-500 text-sm font-medium">Total</span>
          </div>
          <h3 className="text-font-secondary text-sm mb-1">Total Listings</h3>
          <p className="text-3xl font-bold text-font-main">
            {analytics.totalListings}
          </p>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="h-8 w-8 text-tertiary-500" />
            <span className="text-secondary-500 text-sm font-medium">
              Active
            </span>
          </div>
          <h3 className="text-font-secondary text-sm mb-1">Auctions</h3>
          <p className="text-3xl font-bold text-font-main">
            {analytics.totalAuctions}
          </p>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <ShoppingCart className="h-8 w-8 text-primary-500" />
            <span className="text-tertiary-500 text-sm font-medium">
              Listed
            </span>
          </div>
          <h3 className="text-font-secondary text-sm mb-1">Buy Now Items</h3>
          <p className="text-3xl font-bold text-font-main">
            {analytics.totalBuyNow}
          </p>
        </div>
      </div>

      {/* Users by Role */}
      <div className="card p-6">
        <h3 className="text-xl font-bold text-font-main mb-4">Users by Role</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-primary-500/10 p-4 rounded-lg border border-primary-500">
            <p className="text-font-secondary text-sm mb-1">Admins</p>
            <p className="text-3xl font-bold text-primary-500">
              {analytics.usersByRole.admin}
            </p>
            <p className="text-font-secondary text-xs mt-2">
              {(
                (analytics.usersByRole.admin / analytics.totalUsers) * 100 || 0
              ).toFixed(1)}
              % of total
            </p>
          </div>
          <div className="bg-secondary-500/10 p-4 rounded-lg border border-secondary-500">
            <p className="text-font-secondary text-sm mb-1">Sellers</p>
            <p className="text-3xl font-bold text-secondary-500">
              {analytics.usersByRole.seller}
            </p>
            <p className="text-font-secondary text-xs mt-2">
              {(
                (analytics.usersByRole.seller / analytics.totalUsers) * 100 || 0
              ).toFixed(1)}
              % of total
            </p>
          </div>
          <div className="bg-tertiary-500/10 p-4 rounded-lg border border-tertiary-500">
            <p className="text-font-secondary text-sm mb-1">Customers</p>
            <p className="text-3xl font-bold text-tertiary-500">
              {analytics.usersByRole.customer}
            </p>
            <p className="text-font-secondary text-xs mt-2">
              {(
                (analytics.usersByRole.customer / analytics.totalUsers) * 100 ||
                0
              ).toFixed(1)}
              % of total
            </p>
          </div>
        </div>
      </div>

      {/* Refresh Button */}
      <div className="card p-6 text-center">
        <button
          onClick={fetchAnalytics}
          className="px-6 py-3 bg-primary-500 text-font-main rounded-lg hover:bg-primary-700 transition-colors font-medium"
        >
          Refresh Analytics
        </button>
      </div>
    </div>
  );
}

export default SystemAnalyticsTab;
