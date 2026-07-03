import CategoryModel from "../models/categoryModel.js";
import slugify from "slugify";

export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(401).send({ message: "Name is required" });
        }
        const existingCategory = await CategoryModel.findOne({ name });
        if (existingCategory) {
            return res.status(200).send({
                success: true,
                message: "Category Already Exists",
            });
        }
        const category = await new CategoryModel({ name, slug: slugify(name) }).save();
        if(category){
            return res.status(201).send({
                success: true,
                message: "New Category Created",
                category,
            });
        }

    }catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in create category",
            error,
        });
    }
};