import React from "react";
import { Link } from "react-router-dom";
import { getDashboardRoute } from "../utils/navigationHelpers";

function UserMenu({ user, roleInfo, setIsUserMenuOpen, handleLogout }) {
  if (!user) return null;

  const { isAdmin, isSeller, isCustomer } = roleInfo;

  return (
    <div className="absolute right-0 mt-2 w-48 bg-surface-elevated text-font-main rounded-lg shadow-xl border border-border py-2 z-50">
      <Link
        to="/profile"
        className="block px-4 py-2 text-font-main hover:bg-surface font-medium transition-colors"
        onClick={() => setIsUserMenuOpen(false)}
      >
        Profile
      </Link>

      {isSeller && (
        <Link
          to="/sell"
          className="block px-4 py-2 text-font-main hover:bg-surface font-medium transition-colors"
          onClick={() => setIsUserMenuOpen(false)}
        >
          Sell an Item
        </Link>
      )}

      {isCustomer && (
        <Link
          to="/dashboard/user"
          className="block px-4 py-2 text-font-main hover:bg-surface font-medium transition-colors"
          onClick={() => setIsUserMenuOpen(false)}
        >
          My Bids
        </Link>
      )}

      <Link
        to={getDashboardRoute(roleInfo.role)}
        className="block px-4 py-2 text-font-main hover:bg-surface font-medium transition-colors"
        onClick={() => setIsUserMenuOpen(false)}
      >
        {isAdmin ? "Admin Dashboard" : "Dashboard"}
      </Link>

      <hr className="my-2 border-border" />
      <button
        onClick={handleLogout}
        className="block w-full text-left px-4 py-2 text-font-main hover:bg-surface font-medium transition-colors"
      >
        Logout
      </button>
    </div>
  );
}

export default UserMenu;
