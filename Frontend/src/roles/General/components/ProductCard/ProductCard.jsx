import React from "react";
import FixedProductCard from "./components/FixedProductCard";
import AuctionProductCard from "./components/AuctionProductCard";

function ProductCard({ product }) {
  // Render the appropriate card based on product type
  if (product.type === "fixed") {
    return <FixedProductCard product={product} />;
  } else if (product.type === "auction") {
    return <AuctionProductCard product={product} />;
  }

  // Fallback for unknown types
  return null;
}

export default ProductCard;


