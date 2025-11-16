import { Review } from "@/models/review.js";
import {} from "express";
export async function getAllReviews(req, res) {
    try {
        const { limit } = req.query;
        const reviews = await Review.find().limit(limit ? Number(limit) : 10);
        res.status(200).json({
            message: "Reviews fetched successfully",
            reviews,
        });
    }
    catch (err) {
        res.status(400).json({
            message: "Error fetching reviews",
            error: err.message,
        });
    }
}
export async function getProductReviews(req, res) {
    try {
        const { productId } = req.params;
        const { limit } = req.query;
        if (!productId) {
            return res.status(404).json({
                message: "Product ID is required",
            });
        }
        const reviews = await Review.find({ productId }).limit(limit ? Number(limit) : 10);
        res.status(200).json({
            message: "Product reviews fetched successfully",
            reviews,
        });
    }
    catch (err) {
        res.status(400).json({
            message: "Error fetching product reviews",
            error: err.message,
        });
    }
}
export async function getUserReviews(req, res) {
    try {
        const { userId } = req.params;
        const { limit } = req.query;
        if (!userId) {
            return res.status(404).json({
                message: "User ID is required",
            });
        }
        const reviews = await Review.find({ userId }).limit(limit ? Number(limit) : 10);
        res.status(200).json({
            message: "User reviews fetched successfully",
            reviews,
        });
    }
    catch (err) {
        res.status(400).json({
            message: "Error fetching user reviews",
            error: err.message,
        });
    }
}
export async function createReview(req, res) {
    try {
        const { userId, rating, comment } = req.body;
        if (!userId || !rating) {
            return res.status(404).json({
                message: "Product ID, User ID and Rating are required",
            });
        }
        const newReview = new Review({
            userId,
            rating,
            comment,
        });
        await newReview.save();
        res.status(201).json({
            message: "Review created successfully",
            review: newReview,
        });
    }
    catch (err) {
        res.status(400).json({
            message: "Error creating review",
            error: err.message,
        });
    }
}
export async function deleteReview(req, res) {
    try {
        const { reviewId } = req.params;
        if (!reviewId) {
            return res.status(404).json({
                message: "Review ID is required",
            });
        }
        const deletedReview = await Review.findByIdAndDelete(reviewId);
        if (!deletedReview) {
            return res.status(404).json({
                message: "Review not found",
            });
        }
        res.status(200).json({
            message: "Review deleted successfully",
            review: deletedReview,
        });
    }
    catch (err) {
        res.status(400).json({
            message: "Error deleting review",
            error: err.message,
        });
    }
}
//# sourceMappingURL=review-controller.js.map