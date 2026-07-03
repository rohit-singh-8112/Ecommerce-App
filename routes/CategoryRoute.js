import express from "express";
import { createCategoryController } from "../controller/categoryController.js";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
const router = express.Router();


//route for create category
router.post("/create-category", requireSignIn, createCategoryController);


export default router;