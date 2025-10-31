import React, { useState, useEffect } from "react";
import { Star, MessageSquare } from "lucide-react";
import ReviewItem from "./ReviewItem";
import ReviewForm from "./ReviewForm";
import { reviewService } from "../../../../services/reviewService";

function ReviewList({ listingId, partId, currentUserId }) {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    fetchReviews();
  }, [listingId]);

  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      const response = await reviewService.getProductReviews(listingId);

      if (response.reviews) {
        setReviews(response.reviews);
        calculateAverageRating(response.reviews);
      }
    } catch (err) {
      setError("Failed to load reviews");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateAverageRating = (reviewsData) => {
    if (reviewsData.length === 0) {
      setAverageRating(0);
      return;
    }
    const sum = reviewsData.reduce((acc, review) => acc + review.rating, 0);
    setAverageRating((sum / reviewsData.length).toFixed(1));
  };

  const handleSubmitReview = async (reviewData) => {
    try {
      const response = await reviewService.createReview(reviewData);

      if (response.review) {
        setReviews([response.review, ...reviews]);
        calculateAverageRating([response.review, ...reviews]);
        setShowForm(false);
      }
    } catch (err) {
      throw new Error("Failed to submit review");
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await reviewService.deleteReview(reviewId);
      const updatedReviews = reviews.filter((r) => r._id !== reviewId);
      setReviews(updatedReviews);
      calculateAverageRating(updatedReviews);
    } catch (err) {
      console.error("Failed to delete review:", err);
      alert("Failed to delete review");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Reviews Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-font-main flex items-center gap-2">
            <MessageSquare className="text-primary-500" />
            Customer Reviews
          </h2>
          <div className="flex items-center gap-3 mt-2">
            {reviews.length > 0 ? (
              <>
                <div className="flex items-center gap-1">
                  <Star
                    className="fill-warning-500 text-warning-500"
                    size={20}
                  />
                  <span className="text-xl font-bold text-font-main">
                    {averageRating}
                  </span>
                </div>
                <span className="text-font-secondary">
                  ({reviews.length}{" "}
                  {reviews.length === 1 ? "review" : "reviews"})
                </span>
              </>
            ) : (
              <span className="text-font-secondary">No reviews yet</span>
            )}
          </div>
        </div>

        {currentUserId && !showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-2 bg-primary-500 hover:bg-primary-600 text-bg rounded-lg font-semibold transition-colors"
          >
            Write a Review
          </button>
        )}
      </div>

      {error && (
        <div className="bg-error-500/10 border border-error-500 text-error-500 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Review Form */}
      {showForm && currentUserId && (
        <ReviewForm
          listingId={listingId}
          partId={partId}
          userId={currentUserId}
          onSubmit={handleSubmitReview}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <ReviewItem
              key={review._id}
              review={review}
              currentUserId={currentUserId}
              onDelete={handleDeleteReview}
            />
          ))
        ) : (
          <div className="text-center py-10">
            <MessageSquare
              className="mx-auto text-font-secondary mb-3"
              size={48}
            />
            <p className="text-font-secondary">
              No reviews yet. Be the first to review this product!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReviewList;
