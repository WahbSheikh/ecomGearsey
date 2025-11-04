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
    <form className="auction-form" onSubmit={handleSubmit}>
      <h2 className="auction-form__title">
        {auction ? "Edit Auction" : "Create New Auction"}
      </h2>

      <div className="form-group">
        <label htmlFor="title">Title *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="Enter auction title"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description *</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows="4"
          placeholder="Describe the item"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="partId">Part ID *</label>
          <input
            type="text"
            id="partId"
            name="partId"
            value={formData.partId}
            onChange={handleChange}
            required
            placeholder="Part identifier"
          />
        </div>

        <div className="form-group">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="start_price">Starting Price ($) *</label>
          <input
            type="number"
            id="start_price"
            name="start_price"
            value={formData.start_price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
          />
        </div>

        <div className="form-group">
          <label htmlFor="reserve_price">Reserve Price ($)</label>
          <input
            type="number"
            id="reserve_price"
            name="reserve_price"
            value={formData.reserve_price}
            onChange={handleChange}
            min="0"
            step="0.01"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="start_time">Start Time *</label>
          <input
            type="datetime-local"
            id="start_time"
            name="start_time"
            value={formData.start_time}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="end_time">End Time *</label>
          <input
            type="datetime-local"
            id="end_time"
            name="end_time"
            value={formData.end_time}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn--secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn--primary">
          {auction ? "Update Auction" : "Create Auction"}
        </button>
      </div>
    </form>
  );
};

export default AuctionForm;
