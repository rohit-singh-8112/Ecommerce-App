import express from "express";
import { createCategoryController, updateCategoryController, categoryController, singleCategoryController, deleteCategoryController } from "../controller/categoryController.js";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
const router = express.Router();


//route for create category
router.post(
    "/create-category", 
    requireSignIn,
    isAdmin, 
    createCategoryController
);

//update category
router.put(
    "/update-category/:id", 
    requireSignIn, 
    isAdmin, 
    updateCategoryController
);


//get all category
router.get("/get-category", categoryController);
router.get("/single-category/:slug", singleCategoryController);

//delete category
router.delete(
    "/delete-category/:id",
    requireSignIn,
    isAdmin,
    deleteCategoryController
);



export default router;