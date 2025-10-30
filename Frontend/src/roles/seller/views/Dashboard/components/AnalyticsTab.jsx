import React from "react";
import { Eye, Heart, TrendingUp, Users } from "lucide-react";

function AnalyticsTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-font-main">
        Analytics Overview
      </h2>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-font-secondary text-sm">Total Views</p>
              <h3 className="text-2xl font-bold text-font-main mt-1">1,234</h3>
            </div>
            <Eye className="text-primary-500" size={32} />
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-font-secondary text-sm">Favorites</p>
              <h3 className="text-2xl font-bold text-font-main mt-1">89</h3>
            </div>
            <Heart className="text-error-500" size={32} />
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-font-secondary text-sm">Conversion Rate</p>
              <h3 className="text-2xl font-bold text-font-main mt-1">7.2%</h3>
            </div>
            <TrendingUp className="text-success-500" size={32} />
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-font-secondary text-sm">Unique Visitors</p>
              <h3 className="text-2xl font-bold text-font-main mt-1">456</h3>
            </div>
            <Users className="text-warning-500" size={32} />
          </div>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="card p-8">
        <h3 className="text-lg font-semibold text-font-main mb-4">
          Performance Over Time
        </h3>
        <div className="h-64 flex items-center justify-center bg-bg rounded-lg">
          <p className="text-font-secondary">Chart visualization coming soon</p>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsTab;
