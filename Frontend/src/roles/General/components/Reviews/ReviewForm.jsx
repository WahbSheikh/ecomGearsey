import React, { useState } from "react";
import { MessageSquare, Send } from "lucide-react";
import StarRating from "./StarRating";

function ReviewForm({ listingId, partId, userId, onSubmit, onCancel }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      setError("Please select a rating");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const reviewData = {
        listingId,
        userId,
        partId: partId || `PART-${listingId}`,
        rating,
        comment: comment.trim(),
      };

      await onSubmit(reviewData);

      // Reset form
      setRating(0);
      setComment("");
    } catch (err) {
      setError(err.message || "Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="text-primary-500" size={24} />
        <h3 className="text-xl font-bold text-font-main">Write a Review</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-font-secondary mb-2">
            Your Rating *
          </label>
          <StarRating
            rating={rating}
            onRatingChange={setRating}
            interactive={true}
            size={32}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-font-secondary mb-2">
            Your Review (Optional)
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience with this product..."
            rows={4}
            className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-3 text-font-main placeholder:text-font-secondary resize-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/70 transition-all"
            maxLength={500}
          />
          <p className="text-xs text-font-secondary mt-1">
            {comment.length}/500 characters
          </p>
        </div>

        {error && <p className="text-error-500 text-sm">{error}</p>}

        <div className="flex gap-3 justify-end">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 border border-border rounded-lg font-semibold text-font-secondary hover:bg-surface-elevated transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={isSubmitting || rating === 0}
            className="px-6 py-2 bg-primary-500 hover:bg-primary-600 disabled:bg-font-secondary disabled:cursor-not-allowed text-bg rounded-lg font-semibold transition-colors flex items-center gap-2"
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
            <Send size={16} />
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReviewForm;
