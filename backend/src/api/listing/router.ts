import express from "express";
import {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} from "@/controllers/listing/listing-controller.js";
import { upload } from "@/lib/cloudinary.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", upload.single('image'), createProduct);
router.put("/", updateProduct);
router.delete("/", deleteProduct);

export default router;
