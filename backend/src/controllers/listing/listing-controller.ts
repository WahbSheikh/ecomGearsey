import { Category } from "@/models/category.js";
import { Listing, type IListing } from "@/models/listing.js";
import { type Request, type Response } from "express";
import { ObjectId } from "mongodb";
import { deleteImage } from "@/lib/cloudinary.js";

// Returns all products, with optional category, sellerId filter and limit
export async function getProducts(req: Request, res: Response) {
  try {
    const { limit, category, sellerId, query } = req.query;
    const filter: Record<string, unknown> = {};

    if (sellerId) {
      filter.sellerId = sellerId;
    }

    if (query) {
      filter.$text = { $search: query as string };
    }

    if (category) {
      const categoryDoc = await Category.findOne({ name: category }).select("_id");
      if (!categoryDoc) {
        return res.status(404).json({ message: "Category not found" });
      }
      filter.categoryId = categoryDoc._id;
    }

    const products = await Listing.find(filter)
      .limit(Number(limit) || 25)
      .populate("categoryId", ["name", "description"])
      .exec();

    // Transform products to match frontend expectations
    const transformedProducts = products.map(product => ({
      ...product.toObject(),
      title: product.name, // Map name to title for frontend compatibility
      imageUrl: product.imageId // Map imageId to imageUrl temporarily
    }));

    res.status(200).json({
      message: "Products fetched successfully",
      products: transformedProducts,
    });
  } catch (error) {
    console.error("Error fetching products:", error as Error);
    res.status(400).json({
      message: "Failed to fetch products",
      error: (error as Error).message,
    });
  }
}

// Creates a new product and returns the created product
export async function createProduct(req: Request, res: Response) {
  try {
    const { title, description, price, category, sellerId, condition, is_auction } =
      req.body;
    
    // Debug log to see what we're receiving
    console.log("Request body:", req.body);
    console.log("is_auction value:", is_auction, "type:", typeof is_auction);
    
    // Check if image was uploaded
    const file = req.file as Express.Multer.File;
    if (!file) {
      return res.status(400).json({
        message: "Image upload is required",
      });
    }

    if (
      !title ||
      !description ||
      !price ||
      !category ||
      !sellerId
    ) {
      return res.status(400).json({
        message:
          "Missing required fields: title, description, price, category, sellerId",
      });
    }

    // Fetch the category document from the Categories collection
    const categoryDoc = await Category.findOne({ name: category });
    if (!categoryDoc) {
      return res.status(403).json({ message: "Invalid category" });
    }

    // Properly parse the boolean - FormData sends strings, so 'false' string is truthy
    const isAuctionValue = is_auction === 'true' || is_auction === true;
    
    // Create the listing with proper field mapping
    const listingData = {
      name: title, // Map title to name for schema compatibility
      description,
      price: Number(price),
      categoryId: categoryDoc._id,
      imageId: file.path, // Use Cloudinary URL
      sellerId,
      condition: condition || "Used",
      is_auction: isAuctionValue,
      status: "Active"
    };

    console.log("Listing data being saved:", listingData);

    const product = await Listing.create(listingData);

    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.error("Error creating product:", error as Error);
    res.status(400).json({
      message: "Failed to create product",
      error: (error as Error).message,
    });
  }
}

// Updates a product by its ID and returns the newly updated product. Only the fields provided in the request body will be updated.
export async function updateProduct(req: Request, res: Response) {
  try {
    const { productId, title, description, price, category, imageUrl, condition, is_auction } =
      req.body;

    if (!productId) {
      return res
        .status(404)
        .json({ message: "Missing productId in request body" });
    }

    const updateData: any = {};
    
    if (title) updateData.name = title; // Map title to name
    if (description) updateData.description = description;
    if (price) updateData.price = Number(price);
    if (imageUrl) updateData.imageId = imageUrl; // Map imageUrl to imageId
    if (condition) updateData.condition = condition;
    if (is_auction !== undefined) {
      updateData.is_auction = is_auction === 'true' || is_auction === true;
    }
    
    if (category) {
      const categoryDoc = await Category.findOne({ name: category });
      if (!categoryDoc) {
        return res.status(403).json({ message: "Invalid category" });
      }
      updateData.categoryId = categoryDoc._id;
    }

    const updatedProduct = await Listing.findByIdAndUpdate(
      productId,
      updateData,
      { new: true }
    ).populate("categoryId", ["name", "description"]);

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Transform response to match frontend expectations
    const transformedProduct = {
      ...updatedProduct.toObject(),
      title: updatedProduct.name,
      imageUrl: updatedProduct.imageId
    };

    res
      .status(200)
      .json({ message: "Product updated successfully", updatedProduct: transformedProduct });
  } catch (error) {
    console.error("Error updating product:", error as Error);
    res.status(400).json({
      message: "Failed to update product",
      error: (error as Error).message,
    });
  }
}

// Removes a product by its ID. It is permanently deleted from the database.
export async function deleteProduct(req: Request, res: Response) {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res
        .status(404)
        .json({ message: "Missing productId in request body" });
    }

    const deletedProduct = await Listing.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error as Error);
    res.status(400).json({
      message: "Failed to delete product",
      error: (error as Error).message,
    });
  }
}
