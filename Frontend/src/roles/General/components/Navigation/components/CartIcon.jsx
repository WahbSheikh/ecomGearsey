import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

function CartIcon({ cartCount }) {
  return (
    <Link
      to="/cart"
      className="relative p-2 text-font-main hover:text-tertiary-500 transition-colors"
      aria-label="Cart"
    >
      <ShoppingCart size={24} />
      {cartCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-tertiary-500 text-bg text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-lg border border-border font-bold">
          {cartCount}
        </span>
      )}
    </Link>
  );
}

export default CartIcon;
