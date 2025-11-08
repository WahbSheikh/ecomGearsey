import React, { useState, useEffect } from "react";
import {
  Package,
  Search,
  MoreVertical,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
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
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [categories, setCategories] = useState([]);

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
    if (!window.confirm("Are you sure you want to delete this listing?")) {
      return;
    }

    try {
      await productListingAPI.deleteProduct(listingId);
      setListings(listings.filter((listing) => listing._id !== listingId));
      setActiveDropdown(null);

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

  const handleViewListing = (listingId) => {
    navigate(`/product/${listingId}`);
    setActiveDropdown(null);
  };

  const getTypeBadge = (isAuction) => {
    if (isAuction) {
      return (
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-secondary-500/20 text-secondary-500 border border-secondary-500">
          Auction
        </span>
      );
    }
    return (
      <span className="px-2 py-1 text-xs font-medium rounded-full bg-tertiary-500/20 text-tertiary-500 border border-tertiary-500">
        Buy Now
      </span>
    );
  };

  const filteredListings = listings.filter((listing) => {
    const matchesSearch =
      listing.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || listing.category === filterCategory;
    const matchesType =
      filterType === "all" ||
      (filterType === "auction" && listing.isAuction) ||
      (filterType === "buynow" && !listing.isAuction);
    return matchesSearch && matchesCategory && matchesType;
  });

  const listingCounts = {
    total: listings.length,
    auction: listings.filter((l) => l.isAuction).length,
    buynow: listings.filter((l) => !l.isAuction).length,
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-font-secondary">Loading listings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-font-main mb-2">
              Listings Management
            </h2>
            <p className="text-font-secondary">Manage all product listings</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-primary-500/10 rounded-lg border border-primary-500">
            <Package className="text-primary-500" size={20} />
            <span className="text-font-main font-bold">
              {listingCounts.total} Listings
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-surface-elevated p-4 rounded-lg border border-border">
            <div className="flex items-center gap-3">
              <Package className="text-secondary-500" size={24} />
              <div>
                <p className="text-font-secondary text-sm">Auctions</p>
                <p className="text-font-main text-2xl font-bold">
                  {listingCounts.auction}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-surface-elevated p-4 rounded-lg border border-border">
            <div className="flex items-center gap-3">
              <Package className="text-tertiary-500" size={24} />
              <div>
                <p className="text-font-secondary text-sm">Buy Now</p>
                <p className="text-font-main text-2xl font-bold">
                  {listingCounts.buynow}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-font-secondary"
              size={20}
            />
            <input
              type="text"
              placeholder="Search listings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-surface border border-border rounded-lg text-font-main placeholder-font-secondary focus:outline-none focus:border-primary-500"
            />
          </div>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 bg-surface border border-border rounded-lg text-font-main focus:outline-none focus:border-primary-500"
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
            className="px-4 py-2 bg-surface border border-border rounded-lg text-font-main focus:outline-none focus:border-primary-500"
          >
            <option value="all">All Types</option>
            <option value="auction">Auctions</option>
            <option value="buynow">Buy Now</option>
          </select>

          <button
            onClick={fetchListings}
            className="px-4 py-2 bg-primary-500 text-font-main rounded-lg hover:bg-primary-700 transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.length === 0 ? (
          <div className="col-span-full card p-12 text-center">
            <Package size={48} className="mx-auto text-border mb-4" />
            <p className="text-font-secondary">No listings found</p>
          </div>
        ) : (
          filteredListings.map((listing) => (
            <div
              key={listing._id}
              className="card overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Image */}
              <div className="relative h-48 bg-surface-elevated">
                {listing.images && listing.images.length > 0 ? (
                  <img
                    src={listing.images[0]}
                    alt={listing.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package size={48} className="text-border" />
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  {getTypeBadge(listing.isAuction)}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-font-main font-semibold mb-2 line-clamp-2">
                  {listing.title}
                </h3>
                <p className="text-font-secondary text-sm mb-3 line-clamp-2">
                  {listing.description}
                </p>

                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-font-secondary text-xs">Price</p>
                    <p className="text-font-main font-bold text-lg">
                      ${listing.price || listing.startingBid || 0}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-font-secondary text-xs">Category</p>
                    <p className="text-font-main text-sm capitalize">
                      {listing.category}
                    </p>
                  </div>
                </div>

                {/* Seller Info */}
                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-border">
                  <div className="w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center text-font-main text-xs font-bold">
                    S
                  </div>
                  <p className="text-font-secondary text-xs">
                    Seller ID: {listing.sellerId?.slice(0, 8)}...
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewListing(listing._id)}
                    className="flex-1 px-3 py-2 bg-primary-500 text-font-main rounded-lg hover:bg-primary-700 transition-colors text-sm flex items-center justify-center gap-2"
                  >
                    <Eye size={16} />
                    View
                  </button>
                  <button
                    onClick={() => handleDeleteListing(listing._id)}
                    className="px-3 py-2 bg-error-500 text-font-main rounded-lg hover:bg-error-500/80 transition-colors flex items-center justify-center"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ListingsManagementTab;
