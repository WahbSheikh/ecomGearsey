import React from "react";
import AuctionTimer from "./AuctionTimer";

const AuctionCard = ({ auction, onBid, onEdit, onDelete, isOwner = false }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-success-500 text-font-main";
      case "Closed":
        return "bg-surface-elevated text-font-secondary";
      case "Pending":
        return "bg-secondary-500 text-bg";
      case "Cancelled":
        return "bg-error-500 text-font-main";
      default:
        return "bg-border text-font-main";
    }
  };

  return (
    <div className="card overflow-hidden hover:shadow-xl transition-shadow duration-300 animate-fade-in">
      <div className="relative">
        <img
          src={auction.imageUrl}
          alt={auction.title}
          className="w-full h-48 object-cover"
        />
        <span
          className={`absolute top-2 right-2 px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
            auction.status
          )}`}
        >
          {auction.status}
        </span>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-font-main mb-2">
          {auction.title}
        </h3>
        <p className="text-font-secondary mb-4 line-clamp-2">
          {auction.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-font-secondary">Current Price:</span>
            <span className="text-lg font-bold text-success-500">
              ${auction.current_price.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-font-secondary">Starting Price:</span>
            <span className="text-sm font-semibold text-font-main">
              ${auction.start_price.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-font-secondary">Total Bids:</span>
            <span className="text-sm font-semibold text-font-main">
              {auction.totalBids}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-font-secondary">Bidders:</span>
            <span className="text-sm font-semibold text-font-main">
              {auction.bidders.length}
            </span>
          </div>
        </div>

        {auction.status === "Active" && (
          <AuctionTimer endTime={auction.end_time} />
        )}

        <div className="flex gap-3 mt-4">
          {isOwner ? (
            <>
              <button
                className="btn-secondary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => onEdit(auction)}
                disabled={auction.status === "Closed"}
              >
                Edit
              </button>
              <button
                className="flex-1 bg-error-500 hover:bg-red-700 text-font-main px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg active:transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => onDelete(auction._id)}
                disabled={auction.status === "Closed"}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              {auction.status === "Active" && (
                <button
                  className="btn-primary w-full"
                  onClick={() => onBid(auction)}
                >
                  Place Bid
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuctionCard;
