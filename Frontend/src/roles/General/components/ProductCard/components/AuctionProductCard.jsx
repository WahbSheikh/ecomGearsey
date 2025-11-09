import React from "react";
import { Link } from "react-router-dom";
import { Clock, Hammer, PackageX } from "lucide-react";

function AuctionProductCard({ product }) {
  const isSold = product.status === "Sold";

  const formatTimeLeft = (timeLeft) => {
    if (!timeLeft) return "Ended";
    return `${timeLeft.hours}h ${timeLeft.minutes}m`;
  };

  return (
    <Link to={`/product/${product.id}`} className="group">
      <div
        className={`card hover:scale-105 transition-transform duration-300 overflow-hidden bg-surface border shadow-md hover:shadow-lg rounded-xl ${
          isSold ? "border-error-500/30 opacity-75" : "border-border"
        }`}
      >
        <div className="relative">
          <img
            src={
              Array.isArray(product.images) && product.images.length > 0
                ? product.images[0]
                : product.image || product.imageUrl
            }
            alt={product.title}
            className={`w-full h-48 object-cover rounded-t-xl group-hover:scale-110 transition-transform duration-300 ${
              isSold ? "grayscale" : ""
            }`}
          />
          <div className="absolute top-3 right-3">
            {isSold ? (
              <span className="bg-error-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg">
                <PackageX size={12} />
                Sold
              </span>
            ) : (
              <span className="bg-warning-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-sm">
                <Hammer size={12} />
                Auction
              </span>
            )}
          </div>

          {/* Sold Overlay */}
          {isSold && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-t-xl">
              <span className="bg-error-500 text-white px-6 py-3 rounded-lg text-lg font-bold shadow-xl">
                AUCTION ENDED
              </span>
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-font-main mb-2 group-hover:text-primary-500 transition-colors text-lg truncate">
            {product.title}
          </h3>

          <div className="space-y-0">
            <div className="flex items-center justify-between">
              <p className="text-sm text-font-secondary">
                {isSold ? "Final Bid" : "Current Bid"}
              </p>
              {!isSold && (
                <div className="flex items-center gap-1 text-warning-600 text-sm">
                  <Clock size={14} />
                  {formatTimeLeft(product.timeLeft)}
                </div>
              )}
            </div>

            <span
              className={`text-xl mt-0 font-bold ${
                isSold ? "text-error-500" : "text-warning-500"
              }`}
            >
              ${product.currentBid || product.price}
            </span>

            <button
              disabled={isSold}
              className={`w-full py-1 rounded-lg font-semibold transition-colors shadow ${
                isSold
                  ? "bg-error-500/20 text-error-500 cursor-not-allowed"
                  : "bg-warning-500 hover:bg-warning-600 text-white"
              }`}
            >
              {isSold ? "Auction Ended" : "Place Bid"}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default AuctionProductCard;
