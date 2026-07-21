import ProductModel from "../models/productModel.js";
import CategoryModel from "../models/CategoryModel.js";
import fs from "fs";
import slugify from "slugify";
import braintree from "braintree";
import orderModel from "../models/orderModel.js";
import dotenv from 'dotenv';

dotenv.config();

//Payment Gateway 
var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
  });





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
      const products = await ProductModel.find({}).populate("category").select("-photo").sort({createdAt:-1});
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
 };


 //filter Product

 export const filterProductController = async(req,res) =>{
    try{
        const {checked, radio} = req.body;
        let arg = {}
        if(checked.length>0) arg.category = checked;
        if(radio.length>0) arg.price = {$gte: radio[0], $lte:radio[1]};
        const products = await ProductModel.find(arg);
        res.status(200).send({
            success:true,
            products
        });
    }catch(error){
        console.log(error);
        res.status(400).send({
            success:false,
            message:"error in filter",
            error
        })
    }
 };

export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;

    const result = await ProductModel.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    }).select("-photo");

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in search products API",
      error,
    });
  }
};

export const relatedProductController = async(req,res) =>{
    try{
        const {pid, cid} = req.params
        const product = await ProductModel.find({
            category:cid,
            _id:{$ne:pid}
        }).select("-photo").limit(5).populate("category")
        res.status(200).send({
            success:true,
            product
        })
    }catch(error){
        res.status(400).send({
            success:false,
            message:"error geting related product",
            error
        })
    }
}

export const categoryProductController = async(req,res) =>{
    try{
        const {slug} = req.params
        const category = await CategoryModel.findOne({slug})
        const product = await ProductModel.find({category})
        res.status(200).send({
            success:true,
            product,
            category
        })
    }catch(error){
        res.status(400).send({
            success:false,
            message:"error in category product",
            error
        })
    }
}



//payment gateway api
//token
export const braintreeTokenController = async(req,res) =>{
    try{
        gateway.clientToken.generate({}, function(err, response){
            if(err){
                res.status(500).sent(err)
            }else{
                res.send(response)
            }
        })

    }catch(error){
        console.log(error)
    }
}


//payment
export const braintreePaymentController = async(req,res) =>{
    try{
        const {cart, nonce} = req.body
        let total = 0;
        cart.forEach((item) => {
            total += item.price;
          });
        let newTransaction = gateway.transaction.sale({
            amount: total.toFixed(2),
            paymentMethodNonce: nonce,
            options:{
                submitForSettlement:true
            }
        }, async function(error,result){
            if(result){
                await new orderModel({
                    products: cart,
                    payment: result,
                    buyer:req.user._id
                }).save()
                res.json({ok:true})
            }else{
                res.status(500).send(error)
            }
        })
    }catch(error){
        console.log(error)
        res.status(500).send('Payment processing failed')
    }
};