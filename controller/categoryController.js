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

export const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const category = await CategoryModel.findByIdAndUpdate(id, {name, slug: slugify(name)}, {new:true})
        res.status(200).send({
            success: true,
            message: "Category Updated Successfully",
            category,
        });

    }catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in update category",
            error,
        });
    }
}

export const categoryController = async (req, res) => {
    try {
        const category = await CategoryModel.find({});
        res.status(200).send({
            success: true,
            message: "All Categories List",
            category,
        }); 

    }catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in getting category",
            error,
        })
    }
}


export const singleCategoryController = async (req, res) => {
    try {
        const {slug} = req.params;
        const category = await CategoryModel.findOne({slug});  
        res.status(200).send({
            success: true,
            message: "Get Single Category Successfully",
            category,
        });     
    }catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in getting category",   
            error,
        })
    }
}


export const deleteCategoryController = async (req, res) => {
    try{
        const {id}= req.params
        const category = await CategoryModel.findByIdAndDelete(id) 
        res.status(200).send({
            success: true,
            message:"Category Deleted Successfully",
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            seccess: false,
            Message:"Error while deleting category",
            error,
        })
    }
}