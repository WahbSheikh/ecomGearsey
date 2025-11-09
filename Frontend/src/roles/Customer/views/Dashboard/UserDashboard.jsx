import React, { useState } from "react";
import { Clock, Package, Hammer, Edit, MoreHorizontal } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppContext } from "../../../../config/context/AppContext";
import { useAuth } from "../../../../hooks/useAuth";
import MyOrders from "./MyOrders"; // Import the MyOrders component

function UserDashboard() {
  const { state } = useAppContext();
  const { user, isPending } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("bids");

  const handleCreateListing = () => {
    navigate("/sell");
  };

  // Show loading state
  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  // Redirect if not logged in
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-font-secondary">
          Please log in to view your dashboard.
        </p>
      </div>
    );
  }

  const formatTimeLeft = (timeLeft) => {
    if (!timeLeft) return "Ended";
    return `${timeLeft.hours}h ${timeLeft.minutes}m`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-font-main mb-2">My Dashboard</h1>
        <p className="text-font-secondary">
          Welcome back, {user.name || user.email}
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-border mb-8">
        <nav className="flex space-x-8">
          {[
            { key: "bids", label: "My Bids", icon: Hammer },
            { key: "orders", label: "Orders", icon: Package },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium transition-colors ${
                activeTab === key
                  ? "border-primary-600 text-primary-500"
                  : "border-transparent text-font-secondary hover:text-font-main"
              }`}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === "bids" && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-font-main mb-4">
              Active Bids
            </h2>
            <div className="space-y-4">
              {state.userBids && state.userBids.length > 0 ? (
                state.userBids.map((bid) => (
                  <div key={bid.id} className="card p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-font-main mb-2">
                          {bid.productTitle}
                        </h3>
                        <p className="text-font-secondary">
                          Your Bid:{" "}
                          <span className="font-semibold text-primary-500">
                            ${bid.currentBid}
                          </span>
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              bid.status === "leading"
                                ? "bg-success-500 text-white"
                                : "bg-error-500 text-white"
                            }`}
                          >
                            {bid.status === "leading" ? "Leading" : "Outbid"}
                          </span>
                          <div className="flex items-center gap-1 text-warning-500 text-sm">
                            <Clock size={14} />
                            {formatTimeLeft(bid.timeLeft)}
                          </div>
                        </div>
                      </div>
                      <NavLink to={`/product/${bid.id}`}>
                        <button className="btn-secondary">View Item</button>
                      </NavLink>
                    </div>
                  </div>
                ))
              ) : (
                <div className="card p-12 text-center">
                  <Hammer size={48} className="mx-auto text-border mb-4" />
                  <p className="text-font-secondary">No active bids found</p>
                  <p className="text-font-secondary text-sm mt-2">
                    Start bidding on auction items!
                  </p>
                  <NavLink
                    to="/marketplace"
                    className="btn-primary inline-block mt-4"
                  >
                    Browse Auctions
                  </NavLink>
                </div>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-font-main mb-4">
              Won Items
            </h2>
            <div className="card p-8 text-center">
              <Package size={48} className="mx-auto text-border mb-4" />
              <p className="text-font-secondary">No won items yet</p>
            </div>
          </div>
        </div>
      )}

      {/* Use MyOrders component for the orders tab */}
      {activeTab === "orders" && <MyOrders />}

      {activeTab === "listings" && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-font-main tracking-wide">
              My Listings
            </h2>
            <button className="btn-primary" onClick={handleCreateListing}>
              Create New Listing
            </button>
          </div>

          <div className="space-y-4">
            {state.userListings && state.userListings.length > 0 ? (
              state.userListings.map((listing) => (
                <div
                  key={listing.id}
                  className="card p-6 flex items-center justify-between hover:shadow-lg transition-shadow"
                >
                  <div>
                    <h3 className="font-semibold text-font-main mb-2">
                      {listing.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          listing.type === "fixed"
                            ? "bg-success-500 text-white"
                            : "bg-warning-500 text-white"
                        }`}
                      >
                        {listing.type === "fixed" ? "Fixed Price" : "Auction"}
                      </span>
                      <span className="text-font-secondary font-mono">
                        {listing.type === "fixed"
                          ? `$${listing.price}`
                          : `Current Bid: $${listing.currentBid}`}
                      </span>
                      {listing.type === "auction" && (
                        <div className="flex items-center gap-1 text-warning-500 text-sm font-mono">
                          <Clock size={14} />
                          Ends in {formatTimeLeft(listing.timeLeft)}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button className="btn-secondary flex items-center gap-2 rounded-lg px-4 py-2 font-semibold shadow hover:shadow-lg transition-shadow">
                      <Edit size={18} />
                      Edit
                    </button>
                    {listing.type === "auction" && (
                      <button className="btn-secondary rounded-lg px-4 py-2 font-semibold shadow hover:shadow-lg transition-shadow">
                        Extend
                      </button>
                    )}
                    <button className="p-2 text-font-secondary hover:text-font-main transition-colors rounded-full">
                      <MoreHorizontal size={20} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-font-secondary italic text-center">
                You have no listings yet.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDashboard;
