import React from "react";
import AuctionTimer from "./AuctionTimer";

const AuctionCard = ({ auction, onBid, onEdit, onDelete, isOwner = false }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "status-active";
      case "Closed":
        return "status-closed";
      case "Pending":
        return "status-pending";
      case "Cancelled":
        return "status-cancelled";
      default:
        return "";
    }
  };

  return (
    <div className="auction-card">
      <div className="auction-card__image">
        <img src={auction.imageUrl} alt={auction.title} />
        <span
          className={`auction-card__status ${getStatusColor(auction.status)}`}
        >
          {auction.status}
        </span>
      </div>

      <div className="auction-card__content">
        <h3 className="auction-card__title">{auction.title}</h3>
        <p className="auction-card__description">{auction.description}</p>

        <div className="auction-card__details">
          <div className="detail-item">
            <span className="detail-label">Current Price:</span>
            <span className="detail-value">
              ${auction.current_price.toLocaleString()}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Starting Price:</span>
            <span className="detail-value">
              ${auction.start_price.toLocaleString()}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Total Bids:</span>
            <span className="detail-value">{auction.totalBids}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Bidders:</span>
            <span className="detail-value">{auction.bidders.length}</span>
          </div>
        </div>

        {auction.status === "Active" && (
          <AuctionTimer endTime={auction.end_time} />
        )}

        <div className="auction-card__actions">
          {isOwner ? (
            <>
              <button
                className="btn btn--secondary"
                onClick={() => onEdit(auction)}
                disabled={auction.status === "Closed"}
              >
                Edit
              </button>
              <button
                className="btn btn--danger"
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
                  className="btn btn--primary"
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
