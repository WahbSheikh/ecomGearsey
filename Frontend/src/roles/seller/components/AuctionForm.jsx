import React, { useState, useEffect } from "react";

const AuctionForm = ({ auction, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    partId: "",
    imageUrl: "",
    start_price: "",
    reserve_price: "",
    start_time: "",
    end_time: "",
  });

  useEffect(() => {
    if (auction) {
      setFormData({
        title: auction.title || "",
        description: auction.description || "",
        partId: auction.partId || "",
        imageUrl: auction.imageUrl || "",
        start_price: auction.start_price || "",
        reserve_price: auction.reserve_price || "",
        start_time: auction.start_time
          ? new Date(auction.start_time).toISOString().slice(0, 16)
          : "",
        end_time: auction.end_time
          ? new Date(auction.end_time).toISOString().slice(0, 16)
          : "",
      });
    }
  }, [auction]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      className="card shadow-lg p-6 max-w-4xl mx-auto animate-slide-up"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold text-font-main mb-6">
        {auction ? "Edit Auction" : "Create New Auction"}
      </h2>

      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-font-main mb-2"
        >
          Title *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="Enter auction title"
          className="input-field"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-font-main mb-2"
        >
          Description *
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows="4"
          placeholder="Describe the item"
          className="input-field resize-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label
            htmlFor="partId"
            className="block text-sm font-medium text-font-main mb-2"
          >
            Part ID *
          </label>
          <input
            type="text"
            id="partId"
            name="partId"
            value={formData.partId}
            onChange={handleChange}
            required
            placeholder="Part identifier"
            className="input-field"
          />
        </div>

        <div>
          <label
            htmlFor="imageUrl"
            className="block text-sm font-medium text-font-main mb-2"
          >
            Image URL
          </label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className="input-field"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label
            htmlFor="start_price"
            className="block text-sm font-medium text-font-main mb-2"
          >
            Starting Price ($) *
          </label>
          <input
            type="number"
            id="start_price"
            name="start_price"
            value={formData.start_price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="input-field"
          />
        </div>

        <div>
          <label
            htmlFor="reserve_price"
            className="block text-sm font-medium text-font-main mb-2"
          >
            Reserve Price ($)
          </label>
          <input
            type="number"
            id="reserve_price"
            name="reserve_price"
            value={formData.reserve_price}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="input-field"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label
            htmlFor="start_time"
            className="block text-sm font-medium text-font-main mb-2"
          >
            Start Time *
          </label>
          <input
            type="datetime-local"
            id="start_time"
            name="start_time"
            value={formData.start_time}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>

        <div>
          <label
            htmlFor="end_time"
            className="block text-sm font-medium text-font-main mb-2"
          >
            End Time *
          </label>
          <input
            type="datetime-local"
            id="end_time"
            name="end_time"
            value={formData.end_time}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>
      </div>

      <div className="flex gap-4 justify-end">
        <button type="button" className="btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn-primary">
          {auction ? "Update Auction" : "Create Auction"}
        </button>
      </div>
    </form>
  );
};

export default AuctionForm;
