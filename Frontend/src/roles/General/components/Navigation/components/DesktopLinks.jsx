import React from "react";
import { Link } from "react-router-dom";

function DesktopLinks({ user, roleInfo, handleMarketplaceClick, handleSellItemClick }) {
  const { isAdmin, isSeller, isCustomer } = roleInfo;

  return (
    <div className="hidden md:flex items-center space-x-8">
      <Link
        to="/"
        className="text-font-main hover:text-primary-500 font-bold uppercase tracking-wide transition-colors"
      >
        Home
      </Link>

      {!isAdmin && (
        <a
          href="#marketplace"
          onClick={handleMarketplaceClick}
          className="text-font-main hover:text-secondary-500 font-bold uppercase tracking-wide transition-colors cursor-pointer"
        >
          Marketplace
        </a>
      )}

      {isAdmin && (
        <Link
          to="/dashboard/admin"
          className="text-font-main hover:text-primary-500 font-bold uppercase tracking-wide transition-colors"
        >
          Admin Dashboard
        </Link>
      )}

      {isCustomer && (
        <Link
          to="/dashboard/user"
          className="text-font-main hover:text-primary-500 font-bold uppercase tracking-wide transition-colors"
        >
          My Dashboard
        </Link>
      )}

      {isSeller && (
        <>
          <Link
            to="/dashboard/seller"
            className="text-font-main hover:text-primary-500 font-bold uppercase tracking-wide transition-colors"
          >
            Dashboard
          </Link>

          <Link
            to="/sell"
            className="text-font-main hover:text-primary-500 font-bold uppercase tracking-wide transition-colors"
          >
            Sell <span className="max-lg:hidden">an Item</span>
          </Link>
        </>
      )}

      {!user && (
        <Link
          to="/sell"
          onClick={handleSellItemClick}
          className="text-font-main hover:text-primary-500 font-bold uppercase tracking-wide transition-colors"
        >
          Sell <span className="max-lg:hidden">an Item</span>
        </Link>
      )}
    </div>
  );
}

export default DesktopLinks;
