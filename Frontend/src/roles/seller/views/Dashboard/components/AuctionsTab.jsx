import React, { useState } from "react";
import { useAuctions } from "../../../hooks/useAuctions";
import AuctionList from "../../../components/AuctionList";
import AuctionForm from "../../../components/AuctionForm";

const AuctionsTab = () => {
  const { auctions, loading, createAuction, updateAuction, deleteAuction } =
    useAuctions();
  const [showForm, setShowForm] = useState(false);
  const [editingAuction, setEditingAuction] = useState(null);
  const [filter, setFilter] = useState("all");

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
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-font-main tracking-wide">
          Manage Auctions
        </h2>
        <button
          className="btn-primary"
          onClick={() => {
            setEditingAuction(null);
            setShowForm(true);
          }}
        >
          + Create New Auction
        </button>
      </div>

      <div className="flex gap-2 flex-wrap">
        <button
          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
            filter === "all"
              ? "bg-primary-500 text-white"
              : "bg-surface-elevated border border-border text-font-secondary hover:border-primary-500"
          }`}
          onClick={() => setFilter("all")}
        >
          All ({auctions.length})
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
            filter === "Active"
              ? "bg-primary-500 text-white"
              : "bg-surface-elevated border border-border text-font-secondary hover:border-primary-500"
          }`}
          onClick={() => setFilter("Active")}
        >
          Active ({auctions.filter((a) => a.status === "Active").length})
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
            filter === "Pending"
              ? "bg-primary-500 text-white"
              : "bg-surface-elevated border border-border text-font-secondary hover:border-primary-500"
          }`}
          onClick={() => setFilter("Pending")}
        >
          Pending ({auctions.filter((a) => a.status === "Pending").length})
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
            filter === "Closed"
              ? "bg-primary-500 text-white"
              : "bg-surface-elevated border border-border text-font-secondary hover:border-primary-500"
          }`}
          onClick={() => setFilter("Closed")}
        >
          Closed ({auctions.filter((a) => a.status === "Closed").length})
        </button>
      </div>

      {showForm ? (
        <div className="card p-6">
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

export default AuctionsTab;
