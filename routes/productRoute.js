import express from "express";
import { createProductController, 
    getProductController, 
    getSingleProductController, 
    productPhotoController, 
    deleteProductController, 
    updateProductController,
    filterProductController,
    searchProductController,
    relatedProductController } from "../controller/productController.js";
    
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";
const router = express.Router();

router.post("/create-product", requireSignIn, isAdmin, formidable(), createProductController);
router.get("/get-product", getProductController);
router.get("/get-product/:slug", getSingleProductController);
router.get("/product-photo/:pid", productPhotoController);
router.delete("/delete-product/:pid", requireSignIn, isAdmin, deleteProductController);
router.put("/update-product/:pid", requireSignIn, isAdmin, formidable(), updateProductController);
router.post("/filter-product", filterProductController)
router.get("/search/:keyword", searchProductController)
router.get("/related-product/:pid/:cid", relatedProductController)
export default router;
