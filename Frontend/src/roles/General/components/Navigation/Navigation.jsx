import React from "react";
import { Menu, X } from "lucide-react";
import { useNavigation } from "./hooks/useNavigation";
import Logo from "./components/Logo";
import SearchBar from "./components/SearchBar";
import CartIcon from "./components/CartIcon";
import UserAvatar from "./components/UserAvatar";
import UserMenu from "./components/UserMenu";
import DesktopLinks from "./components/DesktopLinks";
import MobileMenu from "./components/MobileMenu";

function Navigation() {
  const {
    state,
    user,
    isPending,
    isMenuOpen,
    isUserMenuOpen,
    searchQuery,
    roleInfo,
    userMenuRef,
    setIsMenuOpen,
    setIsUserMenuOpen,
    setSearchQuery,
    handleSearch,
    handleMarketplaceClick,
    handleSellItemClick,
    handleLogout,
    handleLoginClick,
  } = useNavigation();

  const { isAdmin } = roleInfo;

  return (
    <nav
      className="bg-gradient-to-br from-bg to-surface-elevated shadow-lg sticky top-0 z-50"
      role="navigation"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex gap-5 items-center justify-between h-16">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <DesktopLinks
            user={user}
            roleInfo={roleInfo}
            handleMarketplaceClick={handleMarketplaceClick}
            handleSellItemClick={handleSellItemClick}
          />

          {/* Search Bar - Hidden for Admin */}
          {!isAdmin && (
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleSearch={handleSearch}
              className="hidden md:flex items-center flex-1 max-w-md mx-8"
            />
          )}

          {/* Right side items */}
          <div className="flex items-center space-x-4">
            {/* Cart - Hidden for Admin */}
            {!isAdmin && (
              <CartIcon cartCount={state.cart?.length || 0} />
            )}

            {/* User Section */}
            <div className="relative" ref={userMenuRef}>
              <UserAvatar
                user={user}
                isPending={isPending}
                isUserMenuOpen={isUserMenuOpen}
                setIsUserMenuOpen={setIsUserMenuOpen}
                handleLoginClick={handleLoginClick}
              />

              {isUserMenuOpen && (
                <UserMenu
                  user={user}
                  roleInfo={roleInfo}
                  setIsUserMenuOpen={setIsUserMenuOpen}
                  handleLogout={handleLogout}
                />
              )}
            </div>

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
      <MobileMenu
        isMenuOpen={isMenuOpen}
        user={user}
        roleInfo={roleInfo}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        handleMarketplaceClick={handleMarketplaceClick}
        handleSellItemClick={handleSellItemClick}
        setIsMenuOpen={setIsMenuOpen}
        handleLogout={handleLogout}
        handleLoginClick={handleLoginClick}
      />
    </nav>
  );
}

export default Navigation;
