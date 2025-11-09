import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, PackageX } from "lucide-react";
import { useAppContext } from "../../../../../config/context/AppContext";

function FixedProductCard({ product }) {
  const { dispatch } = useAppContext();

  // ✅ FIXED: Check actual status from backend, not inStock
  const isSold = product.status === "Sold";

  const addToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isSold) {
      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          type: "error",
          message: `${product.title} is no longer available`,
        },
      });
      return;
    }

    dispatch({
      type: "ADD_TO_CART",
      payload: product,
    });
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: {
        type: "success",
        message: `${product.title} added to cart!`,
      },
    });
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
                Sold Out
              </span>
            ) : (
              <span className="bg-success-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-sm">
                <ShoppingCart size={12} />
                Available
              </span>
            )}
          </div>

          {/* Sold Overlay */}
          {isSold && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-t-xl">
              <span className="bg-error-500 text-white px-6 py-3 rounded-lg text-lg font-bold shadow-xl">
                SOLD OUT
              </span>
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-font-main mb-2 group-hover:text-primary-500 transition-colors text-lg truncate">
            {product.title}
          </h3>

          <p className="text-sm text-font-secondary mb-5">
            Condition: {product.condition || "Used"}
          </p>

          <div className="flex items-center justify-between">
            <div>
              <span
                className={`text-2xl font-bold ${
                  isSold ? "text-error-500 line-through" : "text-primary-500"
                }`}
              >
                ${product.price}
              </span>
              {isSold && (
                <p className="text-xs text-error-500 font-semibold mt-1">
                  Not Available
                </p>
              )}
            </div>
            <button
              onClick={addToCart}
              disabled={isSold}
              className={`px-5 py-2 rounded-lg font-semibold transition-colors shadow ${
                isSold
                  ? "bg-error-500/20 text-error-500 cursor-not-allowed"
                  : "bg-primary-500 hover:bg-primary-600 text-white"
              }`}
            >
              {isSold ? "Sold Out" : "Buy Now"}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default FixedProductCard;
