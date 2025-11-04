import React, { useState } from "react";
import { Hammer, Clock, Package } from "lucide-react";
import { useUserBids } from "../../hooks/useUserBids";
import BidForm from "../../../seller/components/BidForm";

const MyBids = () => {
  const { bids, loading, placeBid, getBidStats } = useUserBids();
  const [filter, setFilter] = useState("all");
  const [showBidForm, setShowBidForm] = useState(false);
  const [selectedAuction, setSelectedAuction] = useState(null);

  const handlePlaceBid = (bidData) => {
    placeBid(bidData);
    setShowBidForm(false);
    setSelectedAuction(null);
    alert("Bid placed successfully!");
  };

  const handleBidClick = (auction) => {
    setSelectedAuction(auction);
    setShowBidForm(true);
  };

  const getFilteredBids = () => {
    if (filter === "all") return bids;
    return bids.filter((b) => b.status === filter);
  };

  const bidStats = getBidStats();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-font-main mb-2">My Bids</h1>
        <p className="text-font-secondary">
          Track all your auction bids in one place
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="card p-6">
          <p className="text-font-secondary text-sm mb-1">Total Bids</p>
          <h3 className="text-2xl font-bold text-font-main">
            {bidStats.totalBids}
          </h3>
        </div>
        <div className="card p-6">
          <p className="text-font-secondary text-sm mb-1">Active</p>
          <h3 className="text-2xl font-bold text-warning-500">
            {bidStats.activeBids}
          </h3>
        </div>
        <div className="card p-6">
          <p className="text-font-secondary text-sm mb-1">Won</p>
          <h3 className="text-2xl font-bold text-success-500">
            {bidStats.wonBids}
          </h3>
        </div>
        <div className="card p-6">
          <p className="text-font-secondary text-sm mb-1">Win Rate</p>
          <h3 className="text-2xl font-bold text-primary-500">
            {bidStats.winRate}%
          </h3>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap mb-6">
        {["all", "Active", "Outbid", "Won", "Lost"].map((status) => (
          <button
            key={status}
            className={`px-4 py-2 rounded-lg font-semibold transition-all capitalize ${
              filter === status
                ? "bg-primary-500 text-white"
                : "bg-surface-elevated border border-border text-font-secondary hover:border-primary-500"
            }`}
            onClick={() => setFilter(status)}
          >
            {status} (
            {status === "all"
              ? bids.length
              : bids.filter((b) => b.status === status).length}
            )
          </button>
        ))}
      </div>

      {/* Bids List */}
      <div className="space-y-4">
        {getFilteredBids().map((bid) => (
          <div key={bid._id} className="card p-6">
            <div className="flex gap-4">
              {bid.auction && (
                <>
                  <img
                    src={bid.auction.imageUrl}
                    alt={bid.auction.title}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-font-main mb-2 text-lg">
                      {bid.auction.title}
                    </h3>
                    <p className="text-font-secondary text-sm mb-3">
                      {bid.auction.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-font-secondary">
                        Current:{" "}
                        <strong className="text-font-main">
                          ${bid.auction.current_price}
                        </strong>
                      </span>
                      <span className="text-font-secondary">•</span>
                      <span className="text-font-secondary">
                        {bid.auction.totalBids} bids
                      </span>
                      <span className="text-font-secondary">•</span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          bid.auction.status === "Active"
                            ? "bg-success-500/20 text-success-500"
                            : "bg-gray-500/20 text-gray-500"
                        }`}
                      >
                        {bid.auction.status}
                      </span>
                    </div>
                  </div>
                  <div className="text-right flex flex-col justify-between">
                    <div>
                      <p className="text-sm text-font-secondary mb-1">
                        Your Bid
                      </p>
                      <p className="text-2xl font-bold text-primary-500">
                        ${bid.bid_amount.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold inline-flex items-center gap-1 ${
                          bid.status === "Active"
                            ? "bg-warning-500/20 text-warning-500"
                            : bid.status === "Won"
                            ? "bg-success-500/20 text-success-500"
                            : bid.status === "Outbid"
                            ? "bg-error-500/20 text-error-500"
                            : "bg-gray-500/20 text-gray-500"
                        }`}
                      >
                        {bid.isWinning && "🏆 "}
                        {bid.status}
                      </span>
                    </div>
                    {bid.auction.status === "Active" &&
                      bid.status === "Outbid" && (
                        <button
                          className="btn-primary mt-2"
                          onClick={() => handleBidClick(bid.auction)}
                        >
                          Bid Again
                        </button>
                      )}
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
        {getFilteredBids().length === 0 && (
          <div className="card p-12 text-center">
            <Package size={48} className="mx-auto text-border mb-4" />
            <p className="text-font-secondary text-lg">No bids found</p>
            <p className="text-font-secondary mt-2">
              Start bidding on auctions to see them here!
            </p>
          </div>
        )}
      </div>

      {showBidForm && selectedAuction && (
        <BidForm
          auction={selectedAuction}
          onSubmit={handlePlaceBid}
          onCancel={() => {
            setShowBidForm(false);
            setSelectedAuction(null);
          }}
        />
      )}
    </div>
  );
};

export default MyBids;
