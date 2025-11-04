import { useState, useEffect } from "react";
import { mockAuctions, getCurrentSellerId } from "../../../data/mockData";
import { useAuth } from "../../../hooks/useAuth";

export const useAuctions = (status = null) => {
  const { user } = useAuth();
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const sellerId = getCurrentSellerId(user);
      let filtered = mockAuctions.filter((a) => a.sellerId === sellerId);

      if (status) {
        filtered = filtered.filter((a) => a.status === status);
      }

      setAuctions(filtered);
      setLoading(false);
    }, 500);
  }, [status, user]);

  const createAuction = (auctionData) => {
    const newAuction = {
      _id: `auction${Date.now()}`,
      ...auctionData,
      sellerId: getCurrentSellerId(user),
      current_price: auctionData.start_price,
      status:
        new Date(auctionData.start_time) <= new Date() ? "Active" : "Pending",
      totalBids: 0,
      bidders: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setAuctions((prev) => [newAuction, ...prev]);
    return newAuction;
  };

  const updateAuction = (id, updates) => {
    setAuctions((prev) =>
      prev.map((auction) =>
        auction._id === id
          ? { ...auction, ...updates, updatedAt: new Date() }
          : auction
      )
    );
  };

  const deleteAuction = (id) => {
    setAuctions((prev) =>
      prev.map((auction) =>
        auction._id === id ? { ...auction, status: "Cancelled" } : auction
      )
    );
  };

  return {
    auctions,
    loading,
    createAuction,
    updateAuction,
    deleteAuction,
  };
};
