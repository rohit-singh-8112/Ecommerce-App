import ProductModel from "../models/productModel.js";
import fs from "fs";
import slugify from "slugify";

 export const createProductController = async(req,res) =>{
    try{
        const {name,description,price,category,quantity,shipping} = req.fields;
        const {photo} = req.files;
        //validation
        switch(true){
            case !name:
                return res.status(500).send({error:"Name is Required"});
            case !description:
                return res.status(500).send({error:"Description is Required"});
            case !price:
                return res.status(500).send({error:"Price is Required"});
            case !category:
                return res.status(500).send({error:"Category is Required"});
            case !quantity:
                return res.status(500).send({error:"Quantity is Required"});
            case !photo || photo.size > 2097152:
                return res.status(500).send({error:"Photo is Required and must be less than 1MB"});
        }

        const products = new ProductModel({...req.fields, slug:slugify(name)});
        if(photo){
  
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType= photo.type;
        }
        await products.save();
        res.status(201).send({
            success:true,
            message:"Product Created Successfully",
            products,
        })

    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message: "Error in Create Product",
            error,
        })
    }
 };


 export const getProductController = async(req,res) =>{
    try{
      const products = await ProductModel.find({}).populate("category").select("-photo").limit(12).sort({createdAt:-1});
        res.status(200).send({
            success:true,
            totalCount:products.length,
            message:"All Products",  
            products,
        })

    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Getting Product",
            error,
        })
    }
 };

 export const getSingleProductController = async(req,res) =>{
    try{
        const product = await ProductModel.findOne({slug:req.params.slug}).select("-photo").populate("category");
        res.status(200).send({
            success:true,
            message:"Single Product Fetched",
            product,
        })
       
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Getting Single Product",
            error,
        })
    }
 }

 export const productPhotoController = async(req,res) =>{
    try{
        const product = await ProductModel.findById(req.params.pid).select("photo");
        if(product.photo.data){
            res.set("Content-type",product.photo.contentType);
            return res.status(200).send(product.photo.data);
        }
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Getting Product Photo",
            error,
        })
    }
 }

 export const deleteProductController = async(req,res) =>{
    try{
        const product = await ProductModel.findByIdAndDelete(req.params.pid);
        res.status(200).send({
            success:true,
            message:"Product Deleted Successfully",
            product,
        })

    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Deleting Product",
            error,
        })
    }
 }

 export const updateProductController = async(req,res) =>{

    try{
        const {name,description,price,category,quantity,shipping} = req.fields;
        const {photo} = req.files;  
        //validation
        switch(true){
            case !name: {
                return res.status(400).send({ message: "Name is Required" });
            }
            case !description: {
                return res.status(400).send({ message: "Description is Required" });
            }
            case !price: {
                return res.status(400).send({ message: "Price is Required" });
            }
            case !category: {
                return res.status(400).send({ message: "Category is Required" });
            }
            case !quantity: {
                return res.status(400).send({ message: "Quantity is Required" });
            }
            case photo && photo.size > 2097152: {
                return res.status(400).send({ message: "Photo is Required and should be less than 1MB" });
            }
        }

        const products = await ProductModel.findByIdAndUpdate(
            req.params.pid,
            {
                ...req.fields,
                slug: slugify(name),
            },
            { new: true }
        );

        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
            
        }
        await products.save();
        res.status(200).send({
            success:true,
            message:"Product Updated Successfully",
            products,
        })

    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Updating Product",
            error,
        })
    }
 }