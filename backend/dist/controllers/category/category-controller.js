import { Category } from "@/models/category.js";
import {} from "express";
export async function getCategories(req, res) {
    try {
        const { limit } = req.query;
        const categories = await Category.find({}).limit(Number(limit));
        res.status(200).json({
            message: "Categories fetched successfully",
            categories,
        });
    }
    catch (error) {
        console.error("Error fetching categories:", error);
        res.status(400).json({
            message: "Failed to fetch categories",
            error: error.message,
        });
    }
}
export async function createCategory(req, res) {
    try {
        const { name, description } = req.body;
        if (!name || !description) {
            return res
                .status(404)
                .json({ message: "Missing required fields: name, description" });
        }
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({ message: "Category already exists" });
        }
        const category = await Category.create({ name, description });
        res
            .status(201)
            .json({ message: "Category created successfully", category });
    }
    catch (error) {
        console.error("Error creating category:", error);
        res.status(400).json({
            message: "Failed to create category",
            error: error.message,
        });
    }
}
export async function updateCategory(req, res) {
    try {
        const { id, name, description } = req.body;
        if (!id || !name || !description) {
            return res
                .status(404)
                .json({ message: "Missing required fields: id, name, description" });
        }
        const category = await Category.findByIdAndUpdate(id, { name, description }, { new: true });
        if (!category) {
            throw new Error("Category not found");
        }
        res
            .status(200)
            .json({ message: "Category updated successfully", category });
    }
    catch (error) {
        console.error("Error updating category:", error);
        res.status(400).json({
            message: "Failed to update category",
            error: error.message,
        });
    }
}
export async function deleteCategory(req, res) {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(404).json({ message: "Missing required field: id" });
        }
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            throw new Error("Category not found");
        }
        res
            .status(200)
            .json({ message: "Category deleted successfully", category });
    }
    catch (error) {
        console.error("Error deleting category:", error);
        res.status(400).json({
            message: "Failed to delete category",
            error: error.message,
        });
    }
}
//# sourceMappingURL=category-controller.js.map