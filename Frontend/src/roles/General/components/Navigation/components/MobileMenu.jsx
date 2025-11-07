import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { getDashboardRoute } from "../utils/navigationHelpers";

function MobileMenu({
  isMenuOpen,
  user,
  roleInfo,
  searchQuery,
  setSearchQuery,
  handleSearch,
  handleMarketplaceClick,
  handleSellItemClick,
  setIsMenuOpen,
  handleLogout,
  handleLoginClick,
}) {
  if (!isMenuOpen) return null;

  const { isAdmin, isSeller, isCustomer } = roleInfo;

  return (
    <div className="md:hidden bg-surface-elevated border-t border-border">
      <div className="px-4 py-4 space-y-4">
        {!isAdmin && (
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
          />
        )}

        <div className="space-y-2">
          <Link
            to="/"
            className="block py-2 text-font-main font-bold uppercase tracking-wide hover:text-primary-500 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>

          {!isAdmin && (
            <a
              href="#marketplace"
              onClick={handleMarketplaceClick}
              className="block py-2 text-font-main font-bold uppercase tracking-wide hover:text-secondary-500 transition-colors cursor-pointer"
            >
              Marketplace
            </a>
          )}

          {isAdmin && (
            <Link
              to="/dashboard/admin"
              className="block py-2 text-font-main font-bold uppercase tracking-wide hover:text-primary-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Admin Dashboard
            </Link>
          )}

          {isCustomer && (
            <Link
              to="/dashboard/user"
              className="block py-2 text-font-main font-bold uppercase tracking-wide hover:text-primary-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              My Dashboard
            </Link>
          )}

          {isSeller && (
            <>
              <Link
                to="/dashboard/seller"
                className="block py-2 text-font-main font-bold uppercase tracking-wide hover:text-primary-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>

              <Link
                to="/sell"
                className="block py-2 text-font-main font-bold uppercase tracking-wide hover:text-primary-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Sell an Item
              </Link>
            </>
          )}

          {!user && (
            <Link
              to="/sell"
              onClick={handleSellItemClick}
              className="block py-2 text-font-main font-bold uppercase tracking-wide hover:text-primary-500 transition-colors"
            >
              Sell an Item
            </Link>
          )}

          {user ? (
            <div className="pt-4 border-t border-border space-y-2">
              <Link
                to="/profile"
                className="block py-2 text-font-main hover:text-primary-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>

              {isSeller && (
                <Link
                  to="/sell"
                  className="block py-2 text-font-main hover:text-primary-500 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sell an Item
                </Link>
              )}

              {isCustomer && (
                <Link
                  to="/dashboard/user"
                  className="block py-2 text-font-main hover:text-primary-500 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Bids
                </Link>
              )}

              <Link
                to={getDashboardRoute(roleInfo.role)}
                className="block py-2 text-font-main hover:text-primary-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {isAdmin ? "Admin Dashboard" : "Dashboard"}
              </Link>

              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="block py-2 text-font-main hover:text-primary-500 transition-colors w-full text-left"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="pt-4 border-t border-border">
              <button
                onClick={() => {
                  handleLoginClick();
                  setIsMenuOpen(false);
                }}
                className="w-full py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-font-main rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 font-bold shadow-lg"
              >
                Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MobileMenu;
