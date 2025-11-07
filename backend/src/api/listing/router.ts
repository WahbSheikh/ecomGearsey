import express from "express";
import {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  getProductById,
} from "@/controllers/listing/listing-controller.js";
import { upload } from "@/lib/cloudinary.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", upload.single('image'), createProduct);
router.put("/", updateProduct);
router.delete("/", deleteProduct);

export default router;
