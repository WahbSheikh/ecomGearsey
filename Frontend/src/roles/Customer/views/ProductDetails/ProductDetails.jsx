import React, { useState, useEffect } from "react";
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
  AlertCircle,
  PackageX,
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
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch product from API to get latest status
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_API_URL || "http://localhost:3000"
          }/api/products/${id}`
        );
        const data = await response.json();
        setProduct(data.product);
      } catch (error) {
        console.error("Error fetching product:", error);
        // Fallback to context if API fails
        const contextProduct = state.products.find(
          (p) => p.id === parseInt(id)
        );
        setProduct(contextProduct);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, state.products]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
        <p className="text-font-secondary">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <PackageX size={64} className="mx-auto text-error-500 mb-4" />
        <h2 className="text-2xl font-bold text-font-main mb-4">
          Product Not Found
        </h2>
        <button onClick={() => navigate("/")} className="btn-primary">
          Back to Marketplace
        </button>
      </div>
    );
  }

  const isSold = product.status === "Sold" || !product.inStock;

  const addToCart = () => {
    if (isSold) {
      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          type: "error",
          message: "This product is no longer available",
        },
      });
      return;
    }

    dispatch({ type: "ADD_TO_CART", payload: product });
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: { type: "success", message: `${product.title} added to cart!` },
    });
  };

  const placeBid = () => {
    if (isSold) {
      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          type: "error",
          message: "This auction has ended",
        },
      });
      return;
    }

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

      {/* Sold Alert Banner */}
      {isSold && (
        <div className="mb-6 p-4 bg-error-500/10 border border-error-500 rounded-xl flex items-center gap-3 animate-fade-in">
          <AlertCircle className="text-error-500" size={24} />
          <div>
            <p className="font-bold text-error-500">
              This Product is No Longer Available
            </p>
            <p className="text-sm text-error-500/80">
              {product.type === "auction"
                ? "The auction has ended"
                : "This item has been sold"}
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Swiper Image Carousel */}
        <div className="bg-surface rounded-xl p-4 shadow-lg relative">
          {isSold && (
            <div className="absolute inset-0 bg-black/50 z-10 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <PackageX size={64} className="mx-auto text-white mb-4" />
                <span className="bg-error-500 text-white px-8 py-4 rounded-lg text-2xl font-bold shadow-xl">
                  {product.type === "auction" ? "AUCTION ENDED" : "SOLD OUT"}
                </span>
              </div>
            </div>
          )}
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            loop
            slidesPerView={1}
            className="rounded-xl"
          >
            {(product.images ?? [product.image || product.imageUrl]).map(
              (imgUrl, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={imgUrl}
                    alt={`${product.title} image ${index + 1}`}
                    className={`w-full h-96 object-cover rounded-xl ${
                      isSold ? "grayscale" : ""
                    }`}
                  />
                </SwiperSlide>
              )
            )}
          </Swiper>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Title & Category */}
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="px-3 py-1 bg-surface-elevated text-secondary-500 text-xs font-semibold rounded-full border border-secondary-500/30">
                {product.category}
              </span>
              {isSold ? (
                <span className="px-3 py-1 bg-error-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                  <PackageX size={12} />
                  {product.type === "auction" ? "Auction Ended" : "Sold Out"}
                </span>
              ) : product.type === "fixed" ? (
                <span className="px-3 py-1 bg-success-500/20 text-success-500 text-xs font-semibold rounded-full border border-success-500/30 flex items-center gap-1">
                  <ShoppingCart size={12} />
                  Available
                </span>
              ) : (
                <span className="px-3 py-1 bg-warning-500/20 text-warning-500 text-xs font-semibold rounded-full border border-warning-500/30 flex items-center gap-1">
                  <Hammer size={12} />
                  Active Auction
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
              <p className="font-semibold text-font-main">
                {product.seller || "Unknown Seller"}
              </p>
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
            <div
              className={`bg-surface border-2 rounded-xl p-6 space-y-4 ${
                isSold ? "border-error-500" : "border-primary-500"
              }`}
            >
              <div className="flex items-baseline gap-2">
                <span
                  className={`text-4xl font-bold ${
                    isSold ? "text-error-500 line-through" : "text-primary-500"
                  }`}
                >
                  ${product.price}
                </span>
              </div>
              {isSold ? (
                <div className="flex items-center gap-2 text-error-500">
                  <PackageX size={20} />
                  <span className="font-semibold">Sold Out</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-success-500">
                  <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
                  <span className="font-semibold">In Stock</span>
                </div>
              )}
              <button
                onClick={addToCart}
                disabled={isSold}
                className={`w-full py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
                  isSold
                    ? "bg-error-500/20 text-error-500 cursor-not-allowed"
                    : "bg-primary-500 hover:bg-primary-600 text-white"
                }`}
              >
                <ShoppingCart size={20} />
                {isSold ? "Sold Out" : "Add to Cart"}
              </button>
            </div>
          )}

          {/* Auction Section */}
          {product.type === "auction" && (
            <div
              className={`bg-surface border-2 rounded-xl p-6 space-y-4 ${
                isSold ? "border-error-500" : "border-warning-500"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-font-secondary mb-1">
                    {isSold ? "Final Bid" : "Current Bid"}
                  </p>
                  <span
                    className={`text-3xl font-bold ${
                      isSold ? "text-error-500" : "text-warning-500"
                    }`}
                  >
                    ${product.currentBid || product.price}
                  </span>
                </div>
                {!isSold && (
                  <div className="text-right">
                    <p className="text-sm text-font-secondary mb-1">
                      Time Left
                    </p>
                    <div className="flex items-center gap-1 text-warning-500">
                      <Clock size={18} />
                      <span className="font-semibold">
                        {formatTimeLeft(product.timeLeft)}
                      </span>
                    </div>
                  </div>
                )}
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
                    placeholder={
                      isSold
                        ? "Auction Ended"
                        : `Minimum: $${
                            (product.currentBid || product.price) + 1
                          }`
                    }
                    disabled={isSold}
                    className={`w-full bg-surface-elevated border rounded-lg px-4 py-3 text-font-main transition-all ${
                      isSold
                        ? "border-error-500 cursor-not-allowed opacity-50"
                        : "border-border focus:border-warning-500 focus:ring-2 focus:ring-warning-500/70"
                    }`}
                  />
                </div>
                <button
                  onClick={placeBid}
                  disabled={isSold}
                  className={`w-full py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
                    isSold
                      ? "bg-error-500/20 text-error-500 cursor-not-allowed"
                      : "bg-warning-500 hover:bg-warning-600 text-white"
                  }`}
                >
                  <Hammer size={20} />
                  {isSold ? "Auction Ended" : "Place Bid"}
                </button>
              </div>

              {/* Recent Bids */}
              {product.bids && product.bids.length > 0 && (
                <div className="mt-6 pt-6 border-t border-border">
                  <h4 className="font-semibold text-font-main mb-3">
                    {isSold ? "Final Bids" : "Recent Bids"}
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
          {!isSold && (
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
          )}
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
