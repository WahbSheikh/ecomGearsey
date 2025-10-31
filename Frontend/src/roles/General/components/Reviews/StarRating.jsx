import React from "react";
import { Star } from "lucide-react";

function StarRating({
  rating,
  onRatingChange,
  interactive = false,
  size = 20,
}) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="flex items-center gap-1">
      {stars.map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => interactive && onRatingChange && onRatingChange(star)}
          disabled={!interactive}
          className={`${
            interactive ? "cursor-pointer hover:scale-110" : "cursor-default"
          } transition-transform`}
        >
          <Star
            size={size}
            className={`${
              star <= rating
                ? "fill-warning-500 text-warning-500"
                : "fill-none text-border"
            } transition-colors`}
          />
        </button>
      ))}
    </div>
  );
}

export default StarRating;
