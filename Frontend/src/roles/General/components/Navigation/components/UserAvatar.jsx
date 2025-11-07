import React from "react";
import { User, ChevronDown } from "lucide-react";
import { getInitials } from "../utils/navigationHelpers";

function UserAvatar({ user, isPending, isUserMenuOpen, setIsUserMenuOpen, handleLoginClick }) {
  if (isPending) {
    return (
      <div className="animate-pulse">
        <div className="h-8 w-24 bg-surface rounded-lg"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <button
        onClick={handleLoginClick}
        className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-font-main rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 font-bold shadow-lg"
      >
        <User size={16} />
        <span className="hidden md:block">Login</span>
      </button>
    );
  }

  return (
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
  );
}

export default UserAvatar;
