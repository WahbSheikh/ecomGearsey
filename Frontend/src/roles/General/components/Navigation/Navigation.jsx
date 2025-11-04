import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Search, ShoppingCart, User, ChevronDown, Menu, X } from "lucide-react";
import { useAppContext } from "../../../../config/context/AppContext";
import { useAuth } from "../../../../hooks/useAuth";

function Navigation() {
  const { state } = useAppContext();
  const { signOut, user, isPending } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const userMenuRef = useRef(null);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    if (isUserMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isUserMenuOpen]);

  // Close dropdowns when user changes
  useEffect(() => {
    if (user) {
      setIsUserMenuOpen(false);
      setIsMenuOpen(false);
    }
  }, [user]);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const handleMarketplaceClick = (e) => {
    e.preventDefault();

    if (location.pathname === "/") {
      document.getElementById("marketplace")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      navigate("/");
      setTimeout(() => {
        document.getElementById("marketplace")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }

    setIsMenuOpen(false);
  };

  const handleSellItemClick = (e) => {
    if (!user) {
      e.preventDefault();
      navigate("/login");
    }
  };

  const handleLogout = async () => {
    await signOut();
    setIsUserMenuOpen(false);
    navigate("/");
  };

  const handleLoginClick = () => {
    navigate("/login");
    setIsUserMenuOpen(false);
  };

  // Helpers for role-based rendering
  const role = user?.role ?? null;
  const isAdmin = role === "admin";
  const isSeller = role === "seller";
  const isCustomer = role === "customer";

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  // Desktop links
  const DesktopLinks = () => (
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

  const UserMenu = () => {
    if (!user) return null;

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
          to={
            isAdmin
              ? "/dashboard/admin"
              : isSeller
              ? "/dashboard/seller"
              : "/dashboard/user"
          }
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
  };

  return (
    <nav
      className="bg-gradient-to-br from-bg to-surface-elevated shadow-lg sticky top-0 z-50"
      role="navigation"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex gap-5 items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <span className="text-font-main font-bold text-sm">G</span>
            </div>
            <span className="text-2xl font-bold uppercase tracking-wide text-font-main">
              Gearsey
            </span>
          </Link>

          {/* Desktop Navigation */}
          <DesktopLinks />

          {/* Search Bar - Hidden for Admin */}
          {!isAdmin && (
            <form
              onSubmit={handleSearch}
              className="hidden md:flex items-center flex-1 max-w-md mx-8"
            >
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by part name, model, or category..."
                  className="w-full pl-4 pr-12 py-2 bg-surface text-font-main border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  aria-label="Search inventory"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-500 hover:text-secondary-500"
                  aria-label="Search"
                >
                  <Search size={20} />
                </button>
              </div>
            </form>
          )}

          {/* Right side items */}
          <div className="flex items-center space-x-4">
            {/* Cart - Hidden for Admin */}
            {!isAdmin && (
              <Link
                to="/cart"
                className="relative p-2 text-font-main hover:text-tertiary-500 transition-colors"
                aria-label="Cart"
              >
                <ShoppingCart size={24} />
                {state.cart && state.cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-tertiary-500 text-bg text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-lg border border-border font-bold">
                    {state.cart.length}
                  </span>
                )}
              </Link>
            )}

            {/* User Section */}
            {isPending ? (
              <div className="animate-pulse">
                <div className="h-8 w-24 bg-surface rounded-lg"></div>
              </div>
            ) : user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-font-main hover:text-primary-500 transition-colors"
                  aria-label="User Menu"
                >
                  <div className="w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold">
                    {getInitials(user.name || user.email)}
                  </div>

                  <span className="hidden md:block font-medium truncate max-w-[120px]">
                    {user.name || user.email}
                  </span>

                  <ChevronDown size={16} />
                </button>

                {isUserMenuOpen && <UserMenu />}
              </div>
            ) : (
              <button
                onClick={handleLoginClick}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-font-main rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 font-bold shadow-lg"
              >
                <User size={16} />
                <span className="hidden md:block">Login</span>
              </button>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-font-main"
              aria-label="Mobile Menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-surface-elevated border-t border-border">
          <div className="px-4 py-4 space-y-4">
            {!isAdmin && (
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="w-full pl-4 pr-12 py-2 bg-surface text-font-main border border-border rounded-lg"
                    aria-label="Search inventory"
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-500 hover:text-secondary-500"
                    aria-label="Search"
                  >
                    <Search size={20} />
                  </button>
                </div>
              </form>
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
                    to={
                      isAdmin
                        ? "/dashboard/admin"
                        : isSeller
                        ? "/dashboard/seller"
                        : "/dashboard/user"
                    }
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
      )}
    </nav>
  );
}

export default Navigation;
