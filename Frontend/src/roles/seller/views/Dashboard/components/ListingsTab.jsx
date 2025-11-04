import React from "react";
import { Clock, Edit, MoreHorizontal } from "lucide-react";
import { useAppContext } from "../../../../../config/context/AppContext";

function ListingsTab() {
  const { state } = useAppContext();

  const formatTimeLeft = (timeLeft) => {
    if (!timeLeft) return "Ended";
    return `${timeLeft.hours}h ${timeLeft.minutes}m`;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6 animate-slide-down">
        <h2 className="text-xl font-semibold text-font-main tracking-wide">
          My Listings
        </h2>
        <button className="btn-primary">Create New Listing</button>
      </div>

      <div className="space-y-4">
        {state.userListings?.length > 0 ? (
          state.userListings.map((listing, index) => (
            <div
              key={listing.id}
              className={`card p-6 flex items-center justify-between hover:shadow-xl transition-shadow animate-slide-up animate-delay-${Math.min(
                index * 100,
                900
              )}`}
            >
              <div>
                <h3 className="font-semibold text-font-main mb-2">
                  {listing.title}
                </h3>
                <div className="flex flex-wrap items-center gap-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      listing.type === "fixed"
                        ? "bg-success-500 bg-opacity-20 text-success-500"
                        : "bg-secondary-500 bg-opacity-20 text-secondary-500"
                    }`}
                  >
                    {listing.type === "fixed" ? "Fixed Price" : "Auction"}
                  </span>
                  <span className="text-font-secondary font-mono">
                    {listing.type === "fixed"
                      ? `$${listing.price}`
                      : `Current Bid: $${listing.currentBid}`}
                  </span>
                  {listing.type === "auction" && (
                    <div className="flex items-center gap-1 text-warning-500 text-sm font-mono">
                      <Clock size={14} />
                      Ends in {formatTimeLeft(listing.timeLeft)}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="btn-secondary flex items-center gap-2">
                  <Edit size={18} />
                  Edit
                </button>
                {listing.type === "auction" && (
                  <button className="btn-secondary">Extend</button>
                )}
                <button className="p-2 text-font-secondary hover:text-font-main transition-colors rounded-full hover:bg-surface-elevated">
                  <MoreHorizontal size={20} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-font-secondary italic text-center py-8">
            You have no listings yet.
          </p>
        )}
      </div>
    </div>
  );
}

export default ListingsTab;
