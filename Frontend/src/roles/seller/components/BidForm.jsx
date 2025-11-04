import React, { useState } from "react";

const BidForm = ({ auction, onSubmit, onCancel }) => {
  const [bidAmount, setBidAmount] = useState("");
  const [error, setError] = useState("");

  const minBid = auction.current_price + 1;

  const handleSubmit = (e) => {
    e.preventDefault();

    const amount = parseFloat(bidAmount);

    if (amount <= auction.current_price) {
      setError(
        `Bid must be higher than current price: $${auction.current_price}`
      );
      return;
    }

    setError("");
    onSubmit({
      auctionId: auction._id,
      bid_amount: amount,
    });
  };

  return (
    <div className="bid-form-overlay">
      <div className="bid-form">
        <h2 className="bid-form__title">Place Your Bid</h2>

        <div className="bid-form__auction-info">
          <h3>{auction.title}</h3>
          <p className="current-price">
            Current Price:{" "}
            <strong>${auction.current_price.toLocaleString()}</strong>
          </p>
          <p className="bid-count">
            {auction.totalBids} bids from {auction.bidders.length} bidders
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="bidAmount">Your Bid Amount ($) *</label>
            <input
              type="number"
              id="bidAmount"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              required
              min={minBid}
              step="0.01"
              placeholder={`Minimum: $${minBid}`}
            />
            {error && <p className="error-message">{error}</p>}
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn--secondary"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn--primary">
              Place Bid
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BidForm;
