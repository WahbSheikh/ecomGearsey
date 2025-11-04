import React from "react";
import AuctionCard from "./AuctionCard";

const AuctionList = ({
  auctions,
  onBid,
  onEdit,
  onDelete,
  isOwner = false,
  emptyMessage = "No auctions found",
}) => {
  if (!auctions || auctions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[300px] bg-surface rounded-xl border border-border">
        <p className="text-font-secondary text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {auctions.map((auction, index) => (
        <div
          key={auction._id}
          className={`animate-slide-up animate-delay-${Math.min(
            index * 100,
            900
          )}`}
        >
          <AuctionCard
            auction={auction}
            onBid={onBid}
            onEdit={onEdit}
            onDelete={onDelete}
            isOwner={isOwner}
          />
        </div>
      ))}
    </div>
  );
};

export default AuctionList;
