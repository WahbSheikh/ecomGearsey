import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppContext } from "../../../../../config/context/AppContext";
import { useAuth } from "../../../../../hooks/useAuth";
import { getRoleInfo } from "../utils/navigationHelpers";

export function useNavigation() {
  const { state } = useAppContext();
  const { signOut, user, isPending } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const userMenuRef = useRef(null);

  // Get role information
  const roleInfo = getRoleInfo(user);

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

  return {
    // State
    state,
    user,
    isPending,
    isMenuOpen,
    isUserMenuOpen,
    searchQuery,
    roleInfo,

    // Refs
    userMenuRef,

    // State setters
    setIsMenuOpen,
    setIsUserMenuOpen,
    setSearchQuery,

    // Event handlers
    handleSearch,
    handleMarketplaceClick,
    handleSellItemClick,
    handleLogout,
    handleLoginClick,
  };
}
