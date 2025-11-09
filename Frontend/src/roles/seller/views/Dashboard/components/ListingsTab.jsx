import React, { useEffect, useState } from "react";
import {
  Clock,
  Edit,
  MoreHorizontal,
  Trash2,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../../../config/context/AppContext";
import { productListingAPI } from "../../../../../apis/productListing";
import {
  EditProductModal,
  DeleteConfirmModal,
} from "../../../components/ProductModals";

function ListingsTab() {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();
  const [userListings, setUserListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModal, setEditModal] = useState({ isOpen: false, product: null });
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    product: null,
  });
  const [actionLoading, setActionLoading] = useState(false);
  const [togglingStatus, setTogglingStatus] = useState(null);

  const handleCreateListing = () => {
    navigate("/sell");
  };

  const formatTimeLeft = (timeLeft) => {
    if (!timeLeft) return "Ended";
    return `${timeLeft.hours}h ${timeLeft.minutes}m`;
  };

  useEffect(() => {
    fetchMyListings();
  }, [state.user]);

  const fetchMyListings = async () => {
    setLoading(true);
    try {
      if (!state.user?.id) {
        setUserListings([]);
        return;
      }
      const res = await productListingAPI.getSellerProducts(state.user.id, 50);
      const products = res.products || [];
      const transformed = products.map((p) => ({
        id: p._id,
        title: p.title || p.name,
        description: p.description,
        price: p.price,
        image: p.imageUrl || p.imageId,
        type: p.is_auction ? "auction" : "fixed",
        condition: p.condition,
        status: p.status || "Active",
        timeLeft: null,
      }));
      setUserListings(transformed);
    } catch (error) {
      console.error("Error fetching seller listings:", error);
      setUserListings([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEditProduct = async (updatedData) => {
    setActionLoading(true);
    try {
      await productListingAPI.updateProduct(updatedData);
      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          type: "success",
          message: "Product updated successfully!",
        },
      });
      setEditModal({ isOpen: false, product: null });
      fetchMyListings();

      // ✅ Refresh global products in AppContext
      refreshGlobalProducts();
    } catch (error) {
      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          type: "error",
          message: `Failed to update product: ${error.message}`,
        },
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteProduct = async () => {
    setActionLoading(true);
    try {
      await productListingAPI.deleteProduct(deleteModal.product.id);
      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          type: "success",
          message: "Product deleted successfully!",
        },
      });
      setDeleteModal({ isOpen: false, product: null });
      fetchMyListings();

      // ✅ Refresh global products in AppContext
      refreshGlobalProducts();
    } catch (error) {
      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          type: "error",
          message: `Failed to delete product: ${error.message}`,
        },
      });
    } finally {
      setActionLoading(false);
    }
  };

  // ✅ NEW: Refresh global products after status change
  const refreshGlobalProducts = async () => {
    try {
      const response = await productListingAPI.getProducts({ limit: 100 });
      const products = response.products || [];

      const transformedProducts = products.map((p) => ({
        id: p._id,
        title: p.title || p.name,
        description: p.description,
        price: p.price,
        image: p.imageUrl || p.imageId,
        images: [p.imageUrl || p.imageId],
        category: p.categoryId?.name || "Uncategorized",
        seller: p.sellerId?.name || "Unknown",
        condition: p.condition,
        type: p.is_auction ? "auction" : "fixed",
        status: p.status || "Active",
        inStock: p.status === "Active",
        currentBid: p.is_auction ? p.price : null,
        timeLeft: p.is_auction ? { hours: 2, minutes: 30 } : null,
      }));

      dispatch({
        type: "SET_PRODUCTS",
        payload: transformedProducts,
      });

      console.log("✅ Global products refreshed after status change");
    } catch (error) {
      console.error("❌ Failed to refresh global products:", error);
    }
  };

  // Toggle product status between Active and Sold
  const handleToggleStatus = async (productId, currentStatus) => {
    setTogglingStatus(productId);
    try {
      const newStatus = currentStatus === "Active" ? "Sold" : "Active";

      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL || "http://localhost:3000"
        }/api/products/status`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productId,
            status: newStatus,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      // Update local state
      setUserListings(
        userListings.map((listing) =>
          listing.id === productId ? { ...listing, status: newStatus } : listing
        )
      );

      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          type: "success",
          message: `Product marked as ${newStatus}`,
        },
      });

      // ✅ Refresh global products so customers see updated status
      await refreshGlobalProducts();
    } catch (error) {
      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          type: "error",
          message: "Failed to update product status",
        },
      });
    } finally {
      setTogglingStatus(null);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6 animate-slide-down">
        <h2 className="text-xl font-semibold text-font-main tracking-wide">
          My Listings
        </h2>
        <button className="btn-primary" onClick={handleCreateListing}>
          Create New Listing
        </button>
      </div>

      <div className="space-y-4">
        {loading ? (
          <p className="text-font-secondary italic text-center py-8">
            Loading your listings...
          </p>
        ) : userListings && userListings.length > 0 ? (
          userListings.map((listing, index) => (
            <div
              key={listing.id}
              className={`card p-6 flex items-center gap-4 hover:shadow-xl transition-shadow animate-slide-up animate-delay-${Math.min(
                index * 100,
                900
              )}`}
            >
              {/* Product Image */}
              <div className="flex-shrink-0">
                <img
                  src={listing.image || "/api/placeholder/80/80"}
                  alt={listing.title}
                  className="w-20 h-20 rounded-lg object-cover border border-border"
                  onError={(e) => {
                    e.target.src = "/api/placeholder/80/80";
                  }}
                />
              </div>

              {/* Product Details */}
              <div className="flex-grow">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-font-main">
                    {listing.title}
                  </h3>
                  {/* Status Badge */}
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      listing.status === "Sold"
                        ? "bg-error-500/20 text-error-500 border border-error-500/50"
                        : listing.status === "Active"
                        ? "bg-success-500/20 text-success-500 border border-success-500/50"
                        : "bg-warning-500/20 text-warning-500 border border-warning-500/50"
                    }`}
                  >
                    {listing.status}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      listing.type === "fixed"
                        ? "bg-success-500 bg-opacity-20 text-success-500"
                        : "bg-secondary-500 bg-opacity-20 text-secondary-500"
                    }`}
                  >
                    {listing.type === "fixed" ? "Fixed Price" : "Auction"}
                  </span>
                  <span className="text-font-secondary font-mono">
                    {listing.type === "fixed"
                      ? `$${listing.price}`
                      : `Current Bid: $${listing.currentBid || listing.price}`}
                  </span>
                  {listing.type === "auction" && (
                    <div className="flex items-center gap-1 text-warning-500 text-sm font-mono">
                      <Clock size={14} />
                      Ends in {formatTimeLeft(listing.timeLeft)}
                    </div>
                  )}
                </div>
                <div className="mt-2">
                  <span className="text-sm text-font-secondary bg-surface-elevated px-2 py-1 rounded">
                    {listing.condition}
                  </span>
                  <p
                    className="text-sm text-font-secondary mt-1"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {listing.description}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex-shrink-0 flex items-center gap-3">
                {/* Status Toggle */}
                <button
                  onClick={() => handleToggleStatus(listing.id, listing.status)}
                  disabled={togglingStatus === listing.id}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                    listing.status === "Active"
                      ? "bg-error-500/20 text-error-500 hover:bg-error-500/30"
                      : "bg-success-500/20 text-success-500 hover:bg-success-500/30"
                  }`}
                  title={
                    listing.status === "Active"
                      ? "Mark as Sold"
                      : "Mark as Available"
                  }
                >
                  {togglingStatus === listing.id ? (
                    <>
                      <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                      Updating...
                    </>
                  ) : listing.status === "Active" ? (
                    <>
                      <ToggleLeft size={18} />
                      Mark Sold
                    </>
                  ) : (
                    <>
                      <ToggleRight size={18} />
                      Mark Active
                    </>
                  )}
                </button>

                <button
                  onClick={() =>
                    setEditModal({ isOpen: true, product: listing })
                  }
                  className="btn-secondary flex items-center gap-2"
                >
                  <Edit size={18} />
                  Edit
                </button>
                {listing.type === "auction" && (
                  <button className="btn-secondary">Extend</button>
                )}
                <button
                  onClick={() =>
                    setDeleteModal({ isOpen: true, product: listing })
                  }
                  className="p-2 text-red-500 hover:text-red-600 transition-colors rounded-full hover:bg-red-50"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-font-secondary italic text-center py-8">
            You have no listings yet.
          </p>
        )}
      </div>

      {/* Modals */}
      <EditProductModal
        isOpen={editModal.isOpen}
        product={editModal.product}
        onClose={() => setEditModal({ isOpen: false, product: null })}
        onSave={handleEditProduct}
        isLoading={actionLoading}
      />

      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        productName={deleteModal.product?.title}
        onClose={() => setDeleteModal({ isOpen: false, product: null })}
        onConfirm={handleDeleteProduct}
        isLoading={actionLoading}
      />
    </div>
  );
}

export default ListingsTab;
