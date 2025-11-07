import React, { useState } from "react";
import { useAppContext } from "../../../../config/context/AppContext";
import { Filter, X } from "lucide-react";
import FilterSidebar from "./components/FilterSidebar";
import ProductGrid from "./components/ProductGrid";
import { useFilteredProducts } from "./hooks/useFilteredProducts";

function FiltersPage() {
  const { state } = useAppContext();
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // Use the custom hook to fetch filtered products
  const { products, loading, error, categories } = useFilteredProducts(state.filters);

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
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <div className="bg-surface border-b border-border sticky top-0 z-20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-font-main mb-1">
                Browse Car Parts
              </h1>
              <p className="text-font-secondary">
                Find exactly what you need from our inventory
              </p>
            </div>
            {!loading && (
              <div className="text-sm text-font-secondary">
                {products.length} product{products.length !== 1 ? 's' : ''} found
                {activeFiltersCount > 0 && ` with ${activeFiltersCount} filter${activeFiltersCount !== 1 ? 's' : ''}`}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="lg:hidden fixed bottom-6 right-6 z-30 flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-full shadow-2xl font-bold"
          >
            <Filter size={20} />
            Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
          </button>

          {/* Sidebar Filters */}
          <aside
            className={`
              ${showMobileFilters ? "translate-x-0" : "-translate-x-full"}
              lg:translate-x-0 fixed lg:sticky top-0 left-0 h-screen lg:h-auto
              w-80 lg:w-72 bg-bg lg:bg-transparent z-40 lg:z-0
              transition-transform duration-300 overflow-y-auto
              pt-20 lg:pt-0 px-4 lg:px-0
            `}
          >
            {/* Mobile Close Button */}
            <button
              onClick={() => setShowMobileFilters(false)}
              className="lg:hidden absolute top-4 right-4 p-2 bg-surface-elevated rounded-full"
            >
              <X size={20} className="text-font-main" />
            </button>

            <div className="pb-8">
              <FilterSidebar categories={categories} />
            </div>
          </aside>

          {/* Mobile Overlay */}
          {showMobileFilters && (
            <div
              onClick={() => setShowMobileFilters(false)}
              className="lg:hidden fixed inset-0 bg-black/50 z-30"
            />
          )}

          {/* Products Grid */}
          <main className="flex-1">
            <ProductGrid products={products} loading={loading} error={error} />
          </main>
        </div>
      </div>
    </div>
  );
}

export default FiltersPage;
