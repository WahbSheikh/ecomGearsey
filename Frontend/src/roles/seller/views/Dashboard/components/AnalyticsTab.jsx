import React from "react";
import { Eye, Heart, TrendingUp, Users } from "lucide-react";
import { useAnalytics } from "../../../hooks/useAnalytics";
import SalesChart from "../../../components/SalesChart";
import BidsChart from "../../../components/BidsChart";
import AuctionStatsChart from "../../../components/AuctionStatsChart";

function AnalyticsTab() {
  const { analytics, loading } = useAnalytics();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

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
              <p className="text-font-secondary text-sm">Total Auctions</p>
              <h3 className="text-2xl font-bold text-font-main mt-1">
                {analytics.totalAuctions}
              </h3>
            </div>
            <Eye className="text-primary-500" size={32} />
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-font-secondary text-sm">Total Bids</p>
              <h3 className="text-2xl font-bold text-font-main mt-1">
                {analytics.totalBids}
              </h3>
            </div>
            <Heart className="text-error-500" size={32} />
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-font-secondary text-sm">Active Auctions</p>
              <h3 className="text-2xl font-bold text-font-main mt-1">
                {analytics.activeAuctions}
              </h3>
            </div>
            <TrendingUp className="text-success-500" size={32} />
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-font-secondary text-sm">Total Revenue</p>
              <h3 className="text-2xl font-bold text-font-main mt-1">
                ${analytics.totalRevenue.toLocaleString()}
              </h3>
            </div>
            <Users className="text-warning-500" size={32} />
          </div>
        </div>
      </div>

      {/* Charts with Recharts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <SalesChart data={analytics.salesByMonth} />
        </div>

        <div className="card p-6">
          <BidsChart data={analytics.bidsByAuction} />
        </div>
      </div>

      <div className="card p-6">
        <AuctionStatsChart data={analytics.auctionStatus} />
      </div>
    </div>
  );
}

export default AnalyticsTab;
