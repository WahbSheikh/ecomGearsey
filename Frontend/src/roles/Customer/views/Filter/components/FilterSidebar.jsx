import React from 'react';
import { useAppContext } from '../../../../../config/context/AppContext';
import {
  Filter,
  Tag,
  SortAsc,
  DollarSign,
  Package,
  X,
} from 'lucide-react';

function FilterSidebar({ categories = [] }) {
  const { state, dispatch } = useAppContext();
  const [priceRange, setPriceRange] = React.useState({ min: "", max: "" });

  // Debug current filter state
  React.useEffect(() => {
    console.log('📊 FilterSidebar - Current filters state:', state.filters);
  }, [state.filters]);

  const handleFilterChange = (filterType, value) => {
    console.log('🔧 FilterSidebar - Filter change:', { filterType, value });
    dispatch({
      type: "SET_FILTERS",
      payload: { [filterType]: value },
    });
  };

  const handlePriceRangeApply = () => {
    console.log('💰 FilterSidebar - Price range apply:', priceRange);
    dispatch({
      type: "SET_FILTERS",
      payload: {
        priceMin: priceRange.min ? parseFloat(priceRange.min) : null,
        priceMax: priceRange.max ? parseFloat(priceRange.max) : null,
      },
    });
  };

  const handleClearAll = () => {
    console.log('🧹 FilterSidebar - Clearing all filters');
    dispatch({
      type: "SET_FILTERS",
      payload: {
        show: "all",
        category: "all",
        sortBy: "latest",
        priceMin: null,
        priceMax: null,
      },
    });
    setPriceRange({ min: "", max: "" });
  };

  const FilterSection = ({ children }) => (
    <div className="bg-surface rounded-xl p-5 border border-border shadow-sm">
      {children}
    </div>
  );

  // Count active filters
  const activeFiltersCount = Object.entries(state.filters).filter(
    ([key, value]) => {
      if (key === "show" && value !== "all") return true;
      if (key === "category" && value !== "all") return true;
      if (key === "sortBy" && value !== "latest") return true;
      if (key === "priceMin" || key === "priceMax") return value !== null;
      return false;
    }
  ).length;

  return (
    <div className="space-y-4">
      {/* Clear All Button */}
      {activeFiltersCount > 0 && (
        <button
          onClick={handleClearAll}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-error-500 hover:bg-error-500/80 text-white rounded-lg font-semibold transition-all text-sm"
        >
          <X size={16} />
          Clear All ({activeFiltersCount})
        </button>
      )}

      {/* Listing Type */}
      <FilterSection>
        <label className="flex items-center gap-2 text-sm font-bold text-font-main mb-4">
          <Tag size={18} className="text-secondary-500" />
          Listing Type
        </label>
        <div className="grid grid-cols-1 gap-2">
          {[
            { value: "all", label: "All Products" },
            { value: "fixed", label: "Fixed Price" },
            { value: "auctions", label: "Auctions" }
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => {
                console.log('🏷️ Listing type filter clicked:', option.value);
                handleFilterChange("show", option.value);
              }}
              className={`px-3 py-2.5 rounded-lg font-semibold transition-all text-sm text-left
                ${
                  (state.filters.show || "all") === option.value
                    ? "bg-primary-500 text-white shadow-lg"
                    : "bg-surface-elevated border border-border text-font-secondary hover:border-primary-500 hover:text-primary-500"
                }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Price Range */}
      <FilterSection>
        <label className="flex items-center gap-2 text-sm font-bold text-font-main mb-4">
          <DollarSign size={18} className="text-tertiary-500" />
          Price Range
        </label>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              placeholder="Min ($)"
              value={priceRange.min}
              onChange={(e) =>
                setPriceRange({ ...priceRange, min: e.target.value })
              }
              className="input-field text-sm"
            />
            <input
              type="number"
              placeholder="Max ($)"
              value={priceRange.max}
              onChange={(e) =>
                setPriceRange({ ...priceRange, max: e.target.value })
              }
              className="input-field text-sm"
            />
          </div>
          <button
            onClick={handlePriceRangeApply}
            className="w-full btn-secondary text-sm py-2"
          >
            Apply Range
          </button>
          {/* Quick Price Filters */}
          <div className="pt-2 border-t border-border">
            <p className="text-xs text-font-secondary mb-2">Quick Select:</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Under $50", min: null, max: 50 },
                { label: "$50-$200", min: 50, max: 200 },
                { label: "$200-$500", min: 200, max: 500 },
                { label: "$500+", min: 500, max: null },
              ].map((range) => (
                <button
                  key={range.label}
                  onClick={() => {
                    console.log('💰 Quick price filter clicked:', range);
                    setPriceRange({
                      min: range.min || "",
                      max: range.max || "",
                    });
                    dispatch({
                      type: "SET_FILTERS",
                      payload: { priceMin: range.min, priceMax: range.max },
                    });
                  }}
                  className="px-2 py-1.5 rounded text-xs bg-surface-elevated border border-border text-font-secondary hover:border-tertiary-500 hover:text-tertiary-500 transition-all"
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </FilterSection>

      {/* Categories */}
      <FilterSection>
        <label className="flex items-center gap-2 text-sm font-bold text-font-main mb-4">
          <Package size={18} className="text-secondary-500" />
          Category
        </label>
        <select
          value={state.filters.category || "all"}
          onChange={(e) => {
            console.log('📂 Category filter clicked:', e.target.value);
            handleFilterChange("category", e.target.value);
          }}
          className="input-field text-sm"
        >
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category._id || category.name} value={category.name}>
              {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
            </option>
          ))}
        </select>
      </FilterSection>

      {/* Sort By */}
      <FilterSection>
        <label className="flex items-center gap-2 text-sm font-bold text-font-main mb-4">
          <SortAsc size={18} className="text-warning-500" />
          Sort By
        </label>
        <select
          value={state.filters.sortBy || "latest"}
          onChange={(e) => {
            console.log('🔄 Sort filter clicked:', e.target.value);
            handleFilterChange("sortBy", e.target.value);
          }}
          className="input-field text-sm"
        >
          <option value="latest">🆕 Latest Listed</option>
          <option value="price-low">💰 Price: Low to High</option>
          <option value="price-high">💎 Price: High to Low</option>
        </select>
      </FilterSection>
    </div>
  );
}

export default FilterSidebar;