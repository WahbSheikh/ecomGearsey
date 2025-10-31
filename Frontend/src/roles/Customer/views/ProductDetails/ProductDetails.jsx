import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ShoppingCart,
  Clock,
  Hammer,
  User,
  Shield,
  Package,
  MapPin,
  Star,
} from "lucide-react";
import { useAppContext } from "../../../../config/context/AppContext";
import { ReviewList } from "../../../General/components/Reviews";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useAppContext();
  const [bidAmount, setBidAmount] = useState("");

  const product = state.products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-font-main mb-4">
          Product Not Found
        </h2>
        <button onClick={() => navigate("/")} className="btn-primary">
          Back to Marketplace
        </button>
      </div>
    );
  }

  const addToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: product });
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: { type: "success", message: `${product.title} added to cart!` },
    });
  };

  const placeBid = () => {
    const amount = parseFloat(bidAmount);
    if (amount <= product.currentBid) {
      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          type: "error",
          message: `Bid must be higher than current bid of $${product.currentBid}`,
        },
      });
      return;
    }
    dispatch({ type: "PLACE_BID", payload: { productId: product.id, amount } });
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: {
        type: "success",
        message: "Bid placed successfully! You are now the highest bidder.",
      },
    });
    setBidAmount("");
  };

  const formatTimeLeft = (timeLeft) =>
    !timeLeft ? "Ended" : `${timeLeft.hours}h ${timeLeft.minutes}m`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-font-secondary hover:text-primary-500 mb-6 transition-colors"
      >
        <ArrowLeft size={20} />
        Back to Marketplace
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Swiper Image Carousel */}
        <div className="bg-surface rounded-xl p-4 shadow-lg">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            loop
            slidesPerView={1}
            className="rounded-xl"
          >
            {(product.images ?? [product.image]).map((imgUrl, index) => (
              <SwiperSlide key={index}>
                <img
                  src={imgUrl}
                  alt={`${product.title} image ${index + 1}`}
                  className="w-full h-96 object-cover rounded-xl"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Title & Category */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-surface-elevated text-secondary-500 text-xs font-semibold rounded-full border border-secondary-500/30">
                {product.category}
              </span>
              {product.type === "fixed" ? (
                <span className="px-3 py-1 bg-success-500/20 text-success-500 text-xs font-semibold rounded-full border border-success-500/30 flex items-center gap-1">
                  <ShoppingCart size={12} />
                  Fixed Price
                </span>
              ) : (
                <span className="px-3 py-1 bg-warning-500/20 text-warning-500 text-xs font-semibold rounded-full border border-warning-500/30 flex items-center gap-1">
                  <Hammer size={12} />
                  Auction
                </span>
              )}
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-font-main mb-3">
              {product.title}
            </h1>
          </div>

          {/* Seller Info */}
          <div className="flex items-center gap-3 p-4 bg-surface-elevated rounded-lg border border-border">
            <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
              <User size={24} className="text-bg" />
            </div>
            <div>
              <p className="text-sm text-font-secondary">Sold by</p>
              <p className="font-semibold text-font-main">{product.seller}</p>
            </div>
            <Shield size={20} className="ml-auto text-success-500" />
          </div>

          {/* Condition */}
          {product.condition && (
            <div className="p-4 bg-surface-elevated rounded-lg border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Package size={20} className="text-secondary-500" />
                <span className="font-semibold text-font-main">Condition</span>
              </div>
              <p className="text-font-secondary">{product.condition}</p>
            </div>
          )}

          {/* Description */}
          <div className="p-4 bg-surface-elevated rounded-lg border border-border">
            <h3 className="font-semibold text-font-main mb-2 text-lg">
              Description
            </h3>
            <p className="text-font-secondary leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Fixed Price Section */}
          {product.type === "fixed" && (
            <div className="bg-surface border-2 border-primary-500 rounded-xl p-6 space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-primary-500">
                  ${product.price}
                </span>
              </div>
              {product.inStock ? (
                <div className="flex items-center gap-2 text-success-500">
                  <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
                  <span className="font-semibold">In Stock</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-error-500">
                  <div className="w-2 h-2 bg-error-500 rounded-full"></div>
                  <span className="font-semibold">Out of Stock</span>
                </div>
              )}
              <button
                onClick={addToCart}
                disabled={!product.inStock}
                className="w-full bg-primary-500 hover:bg-primary-600 disabled:bg-font-secondary disabled:cursor-not-allowed text-bg py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
            </div>
          )}

          {/* Auction Section */}
          {product.type === "auction" && (
            <div className="bg-surface border-2 border-warning-500 rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-font-secondary mb-1">
                    Current Bid
                  </p>
                  <span className="text-3xl font-bold text-warning-500">
                    ${product.currentBid}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm text-font-secondary mb-1">Time Left</p>
                  <div className="flex items-center gap-1 text-warning-500">
                    <Clock size={18} />
                    <span className="font-semibold">
                      {formatTimeLeft(product.timeLeft)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-semibold text-font-secondary mb-2">
                    Your Bid Amount ($)
                  </label>
                  <input
                    type="number"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    placeholder={`Minimum: $${product.currentBid + 1}`}
                    className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-3 text-font-main focus:border-warning-500 focus:ring-2 focus:ring-warning-500/70 transition-all"
                  />
                </div>
                <button
                  onClick={placeBid}
                  className="w-full bg-warning-500 hover:bg-warning-600 text-bg py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <Hammer size={20} />
                  Place Bid
                </button>
              </div>

              {/* Recent Bids */}
              {product.bids && product.bids.length > 0 && (
                <div className="mt-6 pt-6 border-t border-border">
                  <h4 className="font-semibold text-font-main mb-3">
                    Recent Bids
                  </h4>
                  <div className="space-y-2">
                    {product.bids.slice(0, 3).map((bid, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-font-secondary">
                          {bid.bidder}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-font-main">
                            ${bid.amount}
                          </span>
                          <span className="text-font-secondary text-xs">
                            {bid.time}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Shipping Info */}
          <div className="p-4 bg-surface-elevated rounded-lg border border-border">
            <div className="flex items-center gap-2 mb-2">
              <MapPin size={20} className="text-tertiary-500" />
              <span className="font-semibold text-font-main">
                Shipping Information
              </span>
            </div>
            <p className="text-font-secondary text-sm">
              Ships within 2-3 business days. Tracking provided.
            </p>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12 border-t border-border pt-12">
        <ReviewList
          listingId={id}
          partId={`PART-${id}`}
          currentUserId={state.user?.id}
        />
      </div>
    </div>
  );
}

export default ProductDetails;
