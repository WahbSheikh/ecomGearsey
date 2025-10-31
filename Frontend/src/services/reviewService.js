// const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// export const reviewService = {
//   // Get all reviews for a specific product
//   async getProductReviews(listingId, limit = 10) {
//     try {
//       const response = await fetch(
//         `${API_BASE_URL}/api/review/${listingId}?limit=${limit}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error("Error fetching product reviews:", error);
//       throw error;
//     }
//   },

//   // Get reviews by a specific user
//   async getUserReviews(userId, limit = 10) {
//     try {
//       const response = await fetch(
//         `${API_BASE_URL}/api/review/user/${userId}?limit=${limit}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error("Error fetching user reviews:", error);
//       throw error;
//     }
//   },

//   // Create a new review
//   async createReview(reviewData) {
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/review`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           // Add authentication token here if needed
//           // 'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(reviewData),
//       });
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error("Error creating review:", error);
//       throw error;
//     }
//   },

//   // Delete a review
//   async deleteReview(reviewId) {
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/review/${reviewId}`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           // Add authentication token here if needed
//           // 'Authorization': `Bearer ${token}`
//         },
//       });
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error("Error deleting review:", error);
//       throw error;
//     }
//   },
// };

// Mock data storage using localStorage
const REVIEWS_STORAGE_KEY = 'mock_reviews';

// Get all reviews from localStorage
const getStoredReviews = () => {
  const stored = localStorage.getItem(REVIEWS_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

// Save reviews to localStorage
const saveReviews = (reviews) => {
  localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
};

// Initialize with some dummy reviews if empty
const initializeDummyReviews = () => {
  const existing = getStoredReviews();
  if (existing.length === 0) {
    const dummyReviews = [
      {
        _id: 'review-1',
        listingId: '1',
        userId: 'user-abc123',
        partId: 'PART-1',
        rating: 5,
        comment: 'Excellent carburetor! Works perfectly and arrived quickly. Highly recommend this seller.',
        createdAt: '2025-10-28T10:30:00Z',
        updatedAt: '2025-10-28T10:30:00Z',
      },
      {
        _id: 'review-2',
        listingId: '1',
        userId: 'user-def456',
        partId: 'PART-1',
        rating: 4,
        comment: 'Good quality part, exactly as described. Only minor issue was shipping took a bit longer than expected.',
        createdAt: '2025-10-27T14:20:00Z',
        updatedAt: '2025-10-27T14:20:00Z',
      },
      {
        _id: 'review-3',
        listingId: '2',
        userId: 'user-ghi789',
        partId: 'PART-2',
        rating: 5,
        comment: 'Beautiful vintage steering wheel! Perfect condition and looks amazing in my classic car.',
        createdAt: '2025-10-26T09:15:00Z',
        updatedAt: '2025-10-26T09:15:00Z',
      },
      {
        _id: 'review-4',
        listingId: '3',
        userId: 'user-jkl012',
        partId: 'PART-3',
        rating: 5,
        comment: 'Chrome tips look fantastic! Easy to install and great quality.',
        createdAt: '2025-10-25T16:45:00Z',
        updatedAt: '2025-10-25T16:45:00Z',
      },
    ];
    saveReviews(dummyReviews);
  }
};

// Initialize dummy data on load
initializeDummyReviews();

export const reviewService = {
  // Get all reviews for a specific product
  async getProductReviews(listingId, limit = 10) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const allReviews = getStoredReviews();
    const productReviews = allReviews.filter(
      review => review.listingId === String(listingId)
    );
    
    return {
      message: 'Product reviews fetched successfully',
      reviews: productReviews.slice(0, limit),
    };
  },

  // Get reviews by a specific user
  async getUserReviews(userId, limit = 10) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const allReviews = getStoredReviews();
    const userReviews = allReviews.filter(
      review => review.userId === userId
    );
    
    return {
      message: 'User reviews fetched successfully',
      reviews: userReviews.slice(0, limit),
    };
  },

  // Create a new review
  async createReview(reviewData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const allReviews = getStoredReviews();
    
    const newReview = {
      _id: `review-${Date.now()}`,
      ...reviewData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    allReviews.push(newReview);
    saveReviews(allReviews);
    
    return {
      message: 'Review created successfully',
      review: newReview,
    };
  },

  // Delete a review
  async deleteReview(reviewId) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const allReviews = getStoredReviews();
    const reviewToDelete = allReviews.find(r => r._id === reviewId);
    
    if (!reviewToDelete) {
      throw new Error('Review not found');
    }
    
    const updatedReviews = allReviews.filter(r => r._id !== reviewId);
    saveReviews(updatedReviews);
    
    return {
      message: 'Review deleted successfully',
      review: reviewToDelete,
    };
  },
};
