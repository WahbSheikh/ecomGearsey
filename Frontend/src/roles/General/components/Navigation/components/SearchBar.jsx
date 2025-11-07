import React from "react";
import { Search } from "lucide-react";

function SearchBar({ searchQuery, setSearchQuery, handleSearch, className = "" }) {
  return (
    <form
      onSubmit={handleSearch}
      className={className}
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
  );
}

export default SearchBar;
