import { useState, useEffect } from "react";
import {
  mockBids,
  mockAuctions,
  getCurrentUserId,
} from "../../../data/mockData";
import { useAuth } from "../../../hooks/useAuth";

export const useUserBids = (status = null) => {
  const { user } = useAuth();
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const userId = getCurrentUserId(user);
      let userBids = mockBids.filter((b) => b.userId === userId);

      if (status) {
        userBids = userBids.filter((b) => b.status === status);
      }

      const enrichedBids = userBids.map((bid) => {
        const auction = mockAuctions.find((a) => a._id === bid.auctionId);
        return {
          ...bid,
          auction,
        };
      });

      setBids(enrichedBids);
      setLoading(false);
    }, 500);
  }, [status, user]);

  const placeBid = (bidData) => {
    const newBid = {
      _id: `bid${Date.now()}`,
      ...bidData,
      userId: getCurrentUserId(user),
      userName: user?.name || "Current User",
      status: "Active",
      isWinning: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setBids((prev) =>
      prev.map((bid) =>
        bid.auctionId === bidData.auctionId
          ? { ...bid, status: "Outbid", isWinning: false }
          : bid
      )
    );

    const auction = mockAuctions.find((a) => a._id === bidData.auctionId);
    setBids((prev) => [{ ...newBid, auction }, ...prev]);

    return newBid;
  };

  const getBidStats = () => {
    const userId = getCurrentUserId(user);
    const userBids = mockBids.filter((b) => b.userId === userId);

    return {
      totalBids: userBids.length,
      activeBids: userBids.filter((b) => b.status === "Active").length,
      wonBids: userBids.filter((b) => b.status === "Won").length,
      lostBids: userBids.filter((b) => b.status === "Lost").length,
      totalSpent: userBids
        .filter((b) => b.status === "Won")
        .reduce((sum, b) => sum + b.bid_amount, 0),
      winRate:
        userBids.length > 0
          ? (
              (userBids.filter((b) => b.status === "Won").length /
                userBids.length) *
              100
            ).toFixed(1)
          : 0,
    };
  };

  return {
    bids,
    loading,
    placeBid,
    getBidStats,
  };
};
