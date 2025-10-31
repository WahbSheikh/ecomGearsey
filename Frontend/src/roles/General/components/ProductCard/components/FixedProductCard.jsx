import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useAppContext } from "../../../../../config/context/AppContext";

function FixedProductCard({ product }) {
  const { dispatch } = useAppContext();

  const addToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
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
      <div className="card hover:scale-105 transition-transform duration-300 overflow-hidden bg-surface border border-border shadow-md hover:shadow-lg rounded-xl">
        <div className="relative">
          <img
            src={
              Array.isArray(product.images) && product.images.length > 0
                ? product.images[0]
                : product.image
            }
            alt={product.title}
            className="w-full h-48 object-cover rounded-t-xl group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3">
            <span className="bg-success-500 text-bg px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-sm">
              <ShoppingCart size={12} />
              Fixed Price
            </span>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-font-main mb-2 group-hover:text-primary-500 transition-colors text-lg truncate">
            {product.title}
          </h3>

          <p className="text-sm text-font-secondary mb-5">
            Condition: {product.condition}
          </p>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-primary-500">
                ${product.price}
              </span>
            </div>
            <button
              onClick={addToCart}
              className="bg-primary-500 hover:bg-primary-600 text-bg px-5 py-2 rounded-lg font-semibold transition-colors shadow"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default FixedProductCard;
