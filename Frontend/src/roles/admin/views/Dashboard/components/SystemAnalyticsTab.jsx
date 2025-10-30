import React from "react";
import { Users, Package, DollarSign, TrendingUp, Activity } from "lucide-react";

function SystemAnalyticsTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-font-main">System Analytics</h2>

      {/* System Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-font-secondary text-sm">Total Users</p>
              <h3 className="text-2xl font-bold text-font-main mt-1">2,543</h3>
            </div>
            <Users className="text-primary-500" size={32} />
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-font-secondary text-sm">Active Listings</p>
              <h3 className="text-2xl font-bold text-font-main mt-1">456</h3>
            </div>
            <Package className="text-warning-500" size={32} />
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-font-secondary text-sm">Total Revenue</p>
              <h3 className="text-2xl font-bold text-font-main mt-1">$45.2K</h3>
            </div>
            <DollarSign className="text-success-500" size={32} />
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-font-secondary text-sm">Growth</p>
              <h3 className="text-2xl font-bold text-font-main mt-1">+12.5%</h3>
            </div>
            <TrendingUp className="text-success-500" size={32} />
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-font-secondary text-sm">Active Now</p>
              <h3 className="text-2xl font-bold text-font-main mt-1">89</h3>
            </div>
            <Activity className="text-primary-500" size={32} />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-font-main mb-4">
            User Growth
          </h3>
          <div className="h-64 flex items-center justify-center bg-bg rounded-lg">
            <p className="text-font-secondary">
              Chart visualization coming soon
            </p>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-semibold text-font-main mb-4">
            Revenue Breakdown
          </h3>
          <div className="h-64 flex items-center justify-center bg-bg rounded-lg">
            <p className="text-font-secondary">
              Chart visualization coming soon
            </p>
          </div>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-font-main mb-4">
          Recent Activity
        </h3>
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 bg-bg rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                <span className="text-font-main">New user registration</span>
              </div>
              <span className="text-font-secondary text-sm">2 mins ago</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SystemAnalyticsTab;
