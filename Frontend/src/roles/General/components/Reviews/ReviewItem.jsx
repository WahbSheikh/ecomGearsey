// import React from "react";
// import { Trash2 } from "lucide-react";
// import StarRating from "./StarRating";

// function ReviewItem({ review, currentUserId, onDelete }) {
//   const isOwner = currentUserId === review.userId;

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   const handleDelete = async () => {
//     if (window.confirm("Are you sure you want to delete this review?")) {
//       await onDelete(review._id);
//     }
//   };

//   return (
//     <div className="bg-surface border border-border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
//       <div className="flex items-start justify-between mb-2">
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-bg font-bold">
//             {review.userId?.charAt(0)?.toUpperCase() || "U"}
//           </div>
//           <div>
//             <p className="font-semibold text-font-main">
//               User {review.userId?.substring(0, 8)}
//             </p>
//             <p className="text-xs text-font-secondary">
//               {formatDate(review.createdAt)}
//             </p>
//           </div>
//         </div>
//         <div className="flex items-center gap-2">
//           <StarRating rating={review.rating} interactive={false} size={16} />
//           {isOwner && (
//             <button
//               onClick={handleDelete}
//               className="text-error-500 hover:text-error-600 p-1 rounded transition-colors"
//               title="Delete review"
//             >
//               <Trash2 size={16} />
//             </button>
//           )}
//         </div>
//       </div>

//       {review.comment && (
//         <p className="text-font-main mt-2 text-sm leading-relaxed">
//           {review.comment}
//         </p>
//       )}

//       {review.partId && (
//         <p className="text-xs text-font-secondary mt-2">
//           Part ID: {review.partId}
//         </p>
//       )}
//     </div>
//   );
// }

// export default ReviewItem;


import React from "react";
import { Trash2, User } from "lucide-react";
import StarRating from "./StarRating";

function ReviewItem({ review, currentUserId, onDelete }) {
  const isOwner = currentUserId === review.userId;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Generate a display name from userId for mock data
  const getDisplayName = (userId) => {
    const names = [
      "Alex Thompson",
      "Sarah Johnson",
      "Mike Chen",
      "Emma Davis",
      "John Smith",
    ];
    const hash = userId
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return names[hash % names.length];
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      await onDelete(review._id);
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-bg font-bold">
            <User size={20} />
          </div>
          <div>
            <p className="font-semibold text-font-main">
              {isOwner ? "You" : getDisplayName(review.userId)}
            </p>
            <p className="text-xs text-font-secondary">
              {formatDate(review.createdAt)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <StarRating rating={review.rating} interactive={false} size={16} />
          {isOwner && (
            <button
              onClick={handleDelete}
              className="text-error-500 hover:text-error-600 p-1 rounded transition-colors"
              title="Delete review"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </div>

      {review.comment && (
        <p className="text-font-main mt-2 text-sm leading-relaxed">
          {review.comment}
        </p>
      )}

      {review.partId && (
        <p className="text-xs text-font-secondary mt-2">
          Part ID: {review.partId}
        </p>
      )}
    </div>
  );
}

export default ReviewItem;