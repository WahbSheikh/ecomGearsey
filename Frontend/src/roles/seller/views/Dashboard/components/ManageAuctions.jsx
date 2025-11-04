import React, { useState } from "react";
import { useAuctions } from "../hooks/useAuctions";
import AuctionList from "../components/AuctionList";
import AuctionForm from "../components/AuctionForm";
import DashboardNav from "../components/DashboardNav";

const ManageAuctions = () => {
  const { auctions, loading, createAuction, updateAuction, deleteAuction } =
    useAuctions();
  const [showForm, setShowForm] = useState(false);
  const [editingAuction, setEditingAuction] = useState(null);
  const [filter, setFilter] = useState("all");

  const navItems = [
    { to: "/dashboard/seller", label: "Dashboard", icon: "📊" },
    { to: "/dashboard/seller/auctions", label: "Manage Auctions", icon: "🔨" },
    { to: "/dashboard/seller/analytics", label: "Analytics", icon: "📈" },
    { to: "/sell", label: "Sell Item", icon: "📦" },
  ];

  const handleCreateAuction = (formData) => {
    createAuction(formData);
    setShowForm(false);
    alert("Auction created successfully!");
  };

  const handleUpdateAuction = (formData) => {
    updateAuction(editingAuction._id, formData);
    setEditingAuction(null);
    setShowForm(false);
    alert("Auction updated successfully!");
  };

  const handleEdit = (auction) => {
    setEditingAuction(auction);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to cancel this auction?")) {
      deleteAuction(id);
      alert("Auction cancelled successfully!");
    }
  };

  const getFilteredAuctions = () => {
    if (filter === "all") return auctions;
    return auctions.filter((a) => a.status === filter);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="manage-auctions">
      <DashboardNav
        items={navItems}
        orientation="horizontal"
        className="dashboard-nav"
      />

      <div className="manage-auctions-header">
        <h1>Manage Auctions</h1>
        <button
          className="btn btn--primary"
          onClick={() => {
            setEditingAuction(null);
            setShowForm(true);
          }}
        >
          + Create New Auction
        </button>
      </div>

      <div className="auction-filters">
        <button
          className={`filter-btn ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All ({auctions.length})
        </button>
        <button
          className={`filter-btn ${filter === "Active" ? "active" : ""}`}
          onClick={() => setFilter("Active")}
        >
          Active ({auctions.filter((a) => a.status === "Active").length})
        </button>
        <button
          className={`filter-btn ${filter === "Pending" ? "active" : ""}`}
          onClick={() => setFilter("Pending")}
        >
          Pending ({auctions.filter((a) => a.status === "Pending").length})
        </button>
        <button
          className={`filter-btn ${filter === "Closed" ? "active" : ""}`}
          onClick={() => setFilter("Closed")}
        >
          Closed ({auctions.filter((a) => a.status === "Closed").length})
        </button>
      </div>

      {showForm ? (
        <div className="form-container">
          <AuctionForm
            auction={editingAuction}
            onSubmit={
              editingAuction ? handleUpdateAuction : handleCreateAuction
            }
            onCancel={() => {
              setShowForm(false);
              setEditingAuction(null);
            }}
          />
        </div>
      ) : (
        <AuctionList
          auctions={getFilteredAuctions()}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isOwner={true}
          emptyMessage="No auctions found. Create your first auction!"
        />
      )}
    </div>
  );
};

export default ManageAuctions;
