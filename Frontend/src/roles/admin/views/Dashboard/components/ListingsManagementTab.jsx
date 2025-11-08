import React, { useState, useEffect } from "react";
import {
  Package,
  Search,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  X,
  User,
  Calendar,
  Tag,
  DollarSign,
  Box,
  TrendingUp,
  Filter,
  RefreshCw,
  AlertCircle,
  ExternalLink,
  ShoppingCart,
  Gavel,
} from "lucide-react";
import { productListingAPI } from "../../../../../apis/productListing";
import { useAppContext } from "../../../../../config/context/AppContext";
import { useNavigate } from "react-router-dom";

function ListingsManagementTab() {
  const { dispatch } = useAppContext();
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [categories, setCategories] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchListings();
    fetchCategories();
  }, []);

  const fetchListings = async () => {
    setIsLoading(true);
    try {
      const response = await productListingAPI.getProducts({ limit: 100 });
      console.log("📦 Fetched listings:", response);

      const listingsData = response.products || response.data || response;
      setListings(Array.isArray(listingsData) ? listingsData : []);
    } catch (error) {
      console.error("❌ Error fetching listings:", error);
      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          type: "error",
          message: "Failed to load listings",
        },
      });
      setListings([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await productListingAPI.getCategories();
      const categoriesData = response.categories || response.data || response;
      setCategories(Array.isArray(categoriesData) ? categoriesData : []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleDeleteListing = async (listingId) => {
    try {
      await productListingAPI.deleteProduct(listingId);
      setListings(listings.filter((listing) => listing._id !== listingId));
      setDeleteConfirm(null);
      setShowDetailModal(false);

      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          type: "success",
          message: "Listing deleted successfully",
        },
      });
    } catch (error) {
      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          type: "error",
          message: "Failed to delete listing",
        },
      });
    }
  };

  const handleViewDetails = async (listing) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL || "http://localhost:3000"
        }/api/products/${listing._id}`
      );
      const data = await response.json();

      setSelectedProduct(data.product || listing);
      setShowDetailModal(true);
    } catch (error) {
      console.error("Error fetching product details:", error);
      setSelectedProduct(listing);
      setShowDetailModal(true);
    }
  };

  const getTypeBadge = (isAuction) => {
    if (isAuction) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-secondary-500/20 to-secondary-600/20 text-secondary-500 border border-secondary-500/50 shadow-sm">
          <Gavel size={12} />
          Auction
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-tertiary-500/20 to-tertiary-600/20 text-tertiary-500 border border-tertiary-500/50 shadow-sm">
        <ShoppingCart size={12} />
        Buy Now
      </span>
    );
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      Active: {
        class:
          "bg-gradient-to-r from-success-500/20 to-success-600/20 text-success-500 border-success-500/50",
        icon: CheckCircle,
      },
      Sold: {
        class:
          "bg-gradient-to-r from-font-secondary/20 to-font-secondary/30 text-font-secondary border-font-secondary/50",
        icon: Package,
      },
      Removed: {
        class:
          "bg-gradient-to-r from-error-500/20 to-error-600/20 text-error-500 border-error-500/50",
        icon: XCircle,
      },
    };

    const config = statusConfig[status] || statusConfig.Active;
    const Icon = config.icon;

    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full border shadow-sm ${config.class}`}
      >
        <Icon size={12} />
        {status || "Active"}
      </span>
    );
  };

  const getImageUrl = (listing) => {
    if (listing.imageUrl) return listing.imageUrl;
    if (
      listing.images &&
      Array.isArray(listing.images) &&
      listing.images.length > 0
    ) {
      return listing.images[0];
    }
    if (listing.image) return listing.image;
    return null;
  };

  const filteredListings = listings.filter((listing) => {
    const title = listing.title || listing.name || "";
    const description = listing.description || "";

    const matchesSearch =
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      description.toLowerCase().includes(searchTerm.toLowerCase());

    const categoryName = listing.category || listing.categoryId?.name || "";
    const matchesCategory =
      filterCategory === "all" || categoryName === filterCategory;

    const matchesType =
      filterType === "all" ||
      (filterType === "auction" && listing.isAuction) ||
      (filterType === "buynow" && !listing.isAuction);

    const status = listing.status || "Active";
    const matchesStatus = filterStatus === "all" || status === filterStatus;

    return matchesSearch && matchesCategory && matchesType && matchesStatus;
  });

  const listingCounts = {
    total: listings.length,
    auction: listings.filter((l) => l.isAuction).length,
    buynow: listings.filter((l) => !l.isAuction).length,
    active: listings.filter((l) => !l.status || l.status === "Active").length,
    sold: listings.filter((l) => l.status === "Sold").length,
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-500/20 border-t-primary-500 mx-auto mb-4"></div>
            <Package
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary-500"
              size={24}
            />
          </div>
          <p className="text-font-secondary font-medium">Loading listings...</p>
          <p className="text-font-secondary/60 text-sm mt-1">Please wait</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Enhanced Header with Gradient - FIXED LAYOUT */}
      <div className="relative overflow-hidden bg-gradient-to-br from-surface-elevated via-surface-elevated to-primary-500/5 rounded-2xl border border-border shadow-lg">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl"></div>
        <div className="relative p-6 lg:p-8">
          {/* Header Section - FIXED */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 bg-primary-500/10 rounded-xl border border-primary-500/20">
                  <Package className="text-primary-500" size={24} />
                </div>
                <h2 className="text-3xl font-bold text-font-main">
                  Listings Management
                </h2>
              </div>
              <p className="text-font-secondary text-sm lg:text-base">
                Monitor and manage all product listings across the platform
              </p>
            </div>

            {/* Total Listings Badge - Moved to separate row on mobile */}
            <div className="flex items-center gap-3">
              <div className="px-5 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl border border-primary-400 shadow-lg">
                <div className="flex items-center gap-2">
                  <TrendingUp size={20} />
                  <div className="text-left">
                    <p className="text-xs opacity-90">Total Listings</p>
                    <p className="text-2xl font-bold">{listingCounts.total}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Stats Grid - FIXED */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-secondary-500/10 to-secondary-600/5 p-4 rounded-xl border border-secondary-500/20 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-secondary-500/20 rounded-lg">
                  <Gavel className="text-secondary-500" size={20} />
                </div>
                <div>
                  <p className="text-font-secondary text-xs font-medium">
                    Auctions
                  </p>
                  <p className="text-font-main text-2xl font-bold">
                    {listingCounts.auction}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-tertiary-500/10 to-tertiary-600/5 p-4 rounded-xl border border-tertiary-500/20 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-tertiary-500/20 rounded-lg">
                  <ShoppingCart className="text-tertiary-500" size={20} />
                </div>
                <div>
                  <p className="text-font-secondary text-xs font-medium">
                    Buy Now
                  </p>
                  <p className="text-font-main text-2xl font-bold">
                    {listingCounts.buynow}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-success-500/10 to-success-600/5 p-4 rounded-xl border border-success-500/20 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-success-500/20 rounded-lg">
                  <CheckCircle className="text-success-500" size={20} />
                </div>
                <div>
                  <p className="text-font-secondary text-xs font-medium">
                    Active
                  </p>
                  <p className="text-font-main text-2xl font-bold">
                    {listingCounts.active}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-font-secondary/10 to-font-secondary/5 p-4 rounded-xl border border-font-secondary/20 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-font-secondary/20 rounded-lg">
                  <Package className="text-font-secondary" size={20} />
                </div>
                <div>
                  <p className="text-font-secondary text-xs font-medium">
                    Sold
                  </p>
                  <p className="text-font-main text-2xl font-bold">
                    {listingCounts.sold}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Filters - FIXED */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-font-secondary text-sm font-medium">
                <Filter size={16} />
                <span>Filters</span>
              </div>

              {/* Refresh Button - Moved here */}
              <button
                onClick={fetchListings}
                className="px-4 py-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-all flex items-center gap-2 font-medium shadow-lg shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-500/30"
              >
                <RefreshCw size={16} />
                <span className="hidden sm:inline">Refresh</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
              <div className="lg:col-span-2 relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-font-secondary"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search by title or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-surface border border-border rounded-xl text-font-main placeholder-font-secondary focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                />
              </div>

              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2.5 bg-surface border border-border rounded-xl text-font-main focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all appearance-none cursor-pointer"
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat._id || cat.name} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2.5 bg-surface border border-border rounded-xl text-font-main focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all appearance-none cursor-pointer"
              >
                <option value="all">All Types</option>
                <option value="auction">Auctions</option>
                <option value="buynow">Buy Now</option>
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2.5 bg-surface border border-border rounded-xl text-font-main focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all appearance-none cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="Active">Active</option>
                <option value="Sold">Sold</option>
                <option value="Removed">Removed</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      {searchTerm ||
      filterCategory !== "all" ||
      filterType !== "all" ||
      filterStatus !== "all" ? (
        <div className="flex items-center gap-2 px-4 py-3 bg-surface-elevated rounded-xl border border-border">
          <AlertCircle size={18} className="text-primary-500" />
          <p className="text-font-secondary text-sm">
            Showing{" "}
            <span className="font-semibold text-font-main">
              {filteredListings.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-font-main">
              {listings.length}
            </span>{" "}
            listings
          </p>
        </div>
      ) : null}

      {/* Enhanced Listings Grid - FIXED CARD HEIGHT */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredListings.length === 0 ? (
          <div className="col-span-full">
            <div className="card p-16 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 rounded-full bg-surface-elevated flex items-center justify-center mx-auto mb-4">
                  <Package size={40} className="text-border" />
                </div>
                <h3 className="text-xl font-bold text-font-main mb-2">
                  No listings found
                </h3>
                <p className="text-font-secondary mb-6">
                  {searchTerm ||
                  filterCategory !== "all" ||
                  filterType !== "all" ||
                  filterStatus !== "all"
                    ? "Try adjusting your filters to see more results"
                    : "There are no product listings available at the moment"}
                </p>
                {(searchTerm ||
                  filterCategory !== "all" ||
                  filterType !== "all" ||
                  filterStatus !== "all") && (
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setFilterCategory("all");
                      setFilterType("all");
                      setFilterStatus("all");
                    }}
                    className="px-6 py-2.5 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          filteredListings.map((listing) => {
            const imageUrl = getImageUrl(listing);
            const title = listing.title || listing.name || "Untitled";
            const price = listing.price || listing.startingBid || 0;
            const categoryName =
              listing.category || listing.categoryId?.name || "Uncategorized";

            return (
              <div
                key={listing._id}
                className="group bg-surface-elevated rounded-2xl border border-border overflow-hidden hover:shadow-2xl hover:border-primary-500/30 transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                {/* Enhanced Image - FIXED HEIGHT */}
                <div className="relative h-48 bg-gradient-to-br from-surface to-surface-elevated overflow-hidden flex-shrink-0">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                  ) : null}
                  <div
                    className="w-full h-full flex items-center justify-center bg-gradient-to-br from-surface to-surface-elevated"
                    style={{ display: imageUrl ? "none" : "flex" }}
                  >
                    <Package size={56} className="text-border opacity-50" />
                  </div>

                  {/* Badges Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2 flex-wrap">
                    {getStatusBadge(listing.status)}
                    {getTypeBadge(listing.isAuction)}
                  </div>

                  {/* Quick View Overlay */}
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <button
                      onClick={() => handleViewDetails(listing)}
                      className="px-6 py-3 bg-white text-font-main rounded-xl font-semibold hover:bg-primary-500 hover:text-white transition-all transform scale-90 group-hover:scale-100 shadow-xl flex items-center gap-2"
                    >
                      <Eye size={18} />
                      Quick View
                    </button>
                  </div>
                </div>

                {/* Enhanced Content - FIXED FLEX LAYOUT */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-font-main font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary-500 transition-colors h-14">
                    {title}
                  </h3>
                  <p className="text-font-secondary text-sm mb-4 line-clamp-2 h-10">
                    {listing.description || "No description available"}
                  </p>

                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
                    <div>
                      <p className="text-font-secondary text-xs mb-1">Price</p>
                      <p className="text-primary-500 font-bold text-xl">
                        ${price.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-font-secondary text-xs mb-1">
                        Category
                      </p>
                      <p className="text-font-main text-xs font-semibold capitalize bg-surface px-2.5 py-1 rounded-lg truncate max-w-[100px]">
                        {categoryName}
                      </p>
                    </div>
                  </div>

                  {/* Seller Info */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white text-xs font-bold shadow-md flex-shrink-0">
                      {listing.sellerId?.slice(0, 1).toUpperCase() || "S"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-font-secondary text-xs">Seller</p>
                      <p className="text-font-main text-xs font-mono truncate">
                        {listing.sellerId?.slice(0, 12)}...
                      </p>
                    </div>
                  </div>

                  {/* Inventory Badge */}
                  {listing.quantity !== undefined && (
                    <div className="mb-4 p-3 bg-gradient-to-r from-success-500/10 to-success-600/5 rounded-xl border border-success-500/20">
                      <div className="flex items-center gap-2">
                        <Box
                          className="text-success-500 flex-shrink-0"
                          size={16}
                        />
                        <div>
                          <p className="text-success-500 text-xs font-medium">
                            In Stock
                          </p>
                          <p className="text-font-main text-sm font-bold">
                            {listing.quantity} units
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Enhanced Actions - PUSHED TO BOTTOM */}
                  <div className="flex gap-2 mt-auto">
                    <button
                      onClick={() => handleViewDetails(listing)}
                      className="flex-1 px-4 py-2.5 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-all text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-500/30"
                    >
                      <Eye size={16} />
                      Details
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(listing._id)}
                      className="px-4 py-2.5 bg-error-500 text-white rounded-xl hover:bg-error-600 transition-all flex items-center justify-center shadow-lg shadow-error-500/20 hover:shadow-xl hover:shadow-error-500/30"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-surface-elevated rounded-2xl border border-border max-w-md w-full shadow-2xl transform animate-scaleIn">
            <div className="p-6">
              <div className="w-16 h-16 rounded-full bg-error-500/10 flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="text-error-500" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-font-main text-center mb-2">
                Delete Listing?
              </h3>
              <p className="text-font-secondary text-center mb-6">
                This action cannot be undone. The listing will be permanently
                removed from the system.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 px-4 py-3 bg-surface border border-border text-font-main rounded-xl hover:bg-surface-elevated transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteListing(deleteConfirm)}
                  className="flex-1 px-4 py-3 bg-error-500 text-white rounded-xl hover:bg-error-600 transition-colors font-semibold shadow-lg shadow-error-500/20"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Product Detail Modal */}
      {showDetailModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-surface-elevated rounded-2xl border border-border max-w-5xl w-full my-8 shadow-2xl transform animate-scaleIn">
            {/* Enhanced Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-surface-elevated to-primary-500/5 border-b border-border p-6 flex items-center justify-between z-10 rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-500/10 rounded-xl">
                  <Package className="text-primary-500" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-font-main">
                    Product Details
                  </h2>
                  <p className="text-font-secondary text-sm">
                    Complete listing information
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowDetailModal(false)}
                className="p-2.5 hover:bg-surface rounded-xl transition-colors group"
              >
                <X
                  size={24}
                  className="text-font-main group-hover:text-error-500 transition-colors"
                />
              </button>
            </div>

            {/* Enhanced Modal Content */}
            <div className="p-6 lg:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Enhanced Product Image */}
                <div className="relative">
                  <div className="aspect-square bg-gradient-to-br from-surface to-surface-elevated rounded-2xl overflow-hidden border border-border shadow-lg">
                    {getImageUrl(selectedProduct) ? (
                      <img
                        src={getImageUrl(selectedProduct)}
                        alt={selectedProduct.title || selectedProduct.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package size={80} className="text-border opacity-50" />
                      </div>
                    )}
                  </div>
                  {/* Badges on Image */}
                  <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-2">
                    <div className="flex flex-col gap-2">
                      {getStatusBadge(selectedProduct.status)}
                      {getTypeBadge(selectedProduct.isAuction)}
                    </div>
                  </div>
                </div>

                {/* Enhanced Product Info */}
                <div className="space-y-5">
                  <div>
                    <h3 className="text-3xl font-bold text-font-main mb-3">
                      {selectedProduct.title || selectedProduct.name}
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {/* Price */}
                    <div className="p-4 bg-gradient-to-br from-primary-500/10 to-primary-600/5 rounded-xl border border-primary-500/20">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary-500/20 rounded-lg">
                          <DollarSign className="text-primary-500" size={24} />
                        </div>
                        <div>
                          <p className="text-font-secondary text-xs font-medium mb-1">
                            {selectedProduct.isAuction
                              ? "Starting Bid"
                              : "Price"}
                          </p>
                          <p className="text-primary-500 font-bold text-3xl">
                            $
                            {(
                              selectedProduct.price ||
                              selectedProduct.startingBid ||
                              0
                            ).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Category */}
                    <div className="p-4 bg-gradient-to-br from-secondary-500/10 to-secondary-600/5 rounded-xl border border-secondary-500/20">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-secondary-500/20 rounded-lg">
                          <Tag className="text-secondary-500" size={20} />
                        </div>
                        <div className="flex-1">
                          <p className="text-font-secondary text-xs font-medium mb-1">
                            Category
                          </p>
                          <p className="text-font-main font-semibold text-lg capitalize">
                            {selectedProduct.category ||
                              selectedProduct.categoryId?.name ||
                              "Uncategorized"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Condition */}
                    {selectedProduct.condition && (
                      <div className="p-4 bg-gradient-to-br from-tertiary-500/10 to-tertiary-600/5 rounded-xl border border-tertiary-500/20">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-tertiary-500/20 rounded-lg">
                            <CheckCircle
                              className="text-tertiary-500"
                              size={20}
                            />
                          </div>
                          <div className="flex-1">
                            <p className="text-font-secondary text-xs font-medium mb-1">
                              Condition
                            </p>
                            <p className="text-font-main font-semibold text-lg">
                              {selectedProduct.condition}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Inventory */}
                    {selectedProduct.quantity !== undefined && (
                      <div className="p-4 bg-gradient-to-br from-success-500/10 to-success-600/5 rounded-xl border border-success-500/20">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-success-500/20 rounded-lg">
                            <Box className="text-success-500" size={20} />
                          </div>
                          <div className="flex-1">
                            <p className="text-font-secondary text-xs font-medium mb-1">
                              Inventory
                            </p>
                            <p className="text-font-main font-semibold text-lg">
                              {selectedProduct.quantity} units in stock
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Seller */}
                    <div className="p-4 bg-surface rounded-xl border border-border">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-font-secondary/10 rounded-lg">
                          <User className="text-font-secondary" size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-font-secondary text-xs font-medium mb-1">
                            Seller ID
                          </p>
                          <p className="text-font-main font-mono text-sm truncate">
                            {selectedProduct.sellerId}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Date */}
                    <div className="p-4 bg-surface rounded-xl border border-border">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-font-secondary/10 rounded-lg">
                          <Calendar className="text-font-secondary" size={20} />
                        </div>
                        <div>
                          <p className="text-font-secondary text-xs font-medium mb-1">
                            Listed On
                          </p>
                          <p className="text-font-main font-semibold">
                            {new Date(
                              selectedProduct.createdAt
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Description */}
              <div className="mb-8 p-6 bg-surface rounded-2xl border border-border">
                <h4 className="text-lg font-bold text-font-main mb-3 flex items-center gap-2">
                  <div className="w-1 h-6 bg-primary-500 rounded-full"></div>
                  Description
                </h4>
                <p className="text-font-secondary leading-relaxed text-sm lg:text-base">
                  {selectedProduct.description ||
                    "No description provided for this listing."}
                </p>
              </div>

              {/* Enhanced Admin Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-border">
                <button
                  onClick={() => {
                    setShowDetailModal(false);
                    setDeleteConfirm(selectedProduct._id);
                  }}
                  className="flex-1 px-6 py-3.5 bg-error-500 text-white rounded-xl hover:bg-error-600 transition-all font-semibold shadow-lg shadow-error-500/20 hover:shadow-xl hover:shadow-error-500/30 flex items-center justify-center gap-2"
                >
                  <Trash2 size={18} />
                  Delete Listing
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListingsManagementTab;
