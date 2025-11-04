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
      <div className="empty-state">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="auction-list">
      {auctions.map((auction) => (
        <AuctionCard
          key={auction._id}
          auction={auction}
          onBid={onBid}
          onEdit={onEdit}
          onDelete={onDelete}
          isOwner={isOwner}
        />
      ))}
    </div>
  );
};

export default AuctionList;
