import { useState, useEffect } from "react";
import {
  mockAuctions,
  mockAnalyticsData,
  getCurrentSellerId,
} from "../../../data/mockData";
import { useAuth } from "../../../hooks/useAuth";

export const useAnalytics = () => {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const sellerId = getCurrentSellerId(user);
      const sellerAuctions = mockAuctions.filter(
        (a) => a.sellerId === sellerId
      );

      const stats = {
        totalAuctions: sellerAuctions.length,
        activeAuctions: sellerAuctions.filter((a) => a.status === "Active")
          .length,
        closedAuctions: sellerAuctions.filter((a) => a.status === "Closed")
          .length,
        pendingAuctions: sellerAuctions.filter((a) => a.status === "Pending")
          .length,
        totalBids: sellerAuctions.reduce((sum, a) => sum + a.totalBids, 0),
        totalRevenue: sellerAuctions
          .filter((a) => a.status === "Closed" && a.winnerId)
          .reduce((sum, a) => sum + a.current_price, 0),
        averagePrice:
          sellerAuctions.length > 0
            ? sellerAuctions.reduce((sum, a) => sum + a.current_price, 0) /
              sellerAuctions.length
            : 0,
        salesByMonth: mockAnalyticsData.salesByMonth,
        bidsByAuction: mockAnalyticsData.bidsByAuction,
        auctionStatus: [
          {
            status: "Active",
            count: sellerAuctions.filter((a) => a.status === "Active").length,
          },
          {
            status: "Closed",
            count: sellerAuctions.filter((a) => a.status === "Closed").length,
          },
          {
            status: "Pending",
            count: sellerAuctions.filter((a) => a.status === "Pending").length,
          },
          {
            status: "Cancelled",
            count: sellerAuctions.filter((a) => a.status === "Cancelled")
              .length,
          },
        ],
      };

      setAnalytics(stats);
      setLoading(false);
    }, 500);
  }, [user]);

  return { analytics, loading };
};
