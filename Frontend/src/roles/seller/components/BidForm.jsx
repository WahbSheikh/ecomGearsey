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
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="card shadow-xl max-w-md w-full p-6 animate-scale-in">
        <h2 className="text-2xl font-bold text-font-main mb-4">
          Place Your Bid
        </h2>

        <div className="bg-surface-elevated rounded-lg p-4 mb-6 border border-border">
          <h3 className="text-lg font-semibold text-font-main mb-2">
            {auction.title}
          </h3>
          <p className="text-font-secondary mb-2">
            Current Price:{" "}
            <strong className="text-success-500 text-xl">
              ${auction.current_price.toLocaleString()}
            </strong>
          </p>
          <p className="text-sm text-font-secondary">
            {auction.totalBids} bids from {auction.bidders.length} bidders
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="bidAmount"
              className="block text-sm font-medium text-font-main mb-2"
            >
              Your Bid Amount ($) *
            </label>
            <input
              type="number"
              id="bidAmount"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              required
              min={minBid}
              step="0.01"
              placeholder={`Minimum: $${minBid}`}
              className="input-field"
            />
            {error && <p className="text-error-500 text-sm mt-2">{error}</p>}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              className="btn-secondary flex-1"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary flex-1">
              Place Bid
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BidForm;
