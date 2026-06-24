import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

export const registerController = async(req, res) => {
    try{
        const {name, email, password, phone, address, role} = req.body
        //Validation
        if(!name){
            return res.send({error: 'Name is Required'})
        }
        if(!email){
            return res.send({error: 'Email is Required'})
        }
        if(!password){
            return res.send({error: 'Password is Required'})
        }
        if(!phone){
            return res.send({error: 'Phone is Required'})
        }
        if(!address){
            return res.send({error: 'Address is Required'})
        }
        //Check User
        const exisitingUser = await userModel.findOne({email})

        //Exisiting User
        if(exisitingUser){
            return res.status(200).send({
                success: true,
                message: 'Already Register Please Login',
            })
        }

        //Register User
        const hashedPassword = await hashPassword(password) 

        //Save
        const user = await new userModel({name, email, phone, address, role, password:hashedPassword}).save ()
        res.status(201).send({
            success:true,
            message:'User register successfully',
            user,
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message:'error in Registraction',
            error,
        })
    }
};



 //POST LOGIN

 export const loginController = async(req, res) =>{
    try{
        const {email, password} = req.body 
        //validation
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:'Invalid Email or Password'
            })        
        }
        // check user
        const user = await userModel.findOne({email})
        if (!user){
            return res.status(404).send({
                success:false,
                message:"Email is not register"
            })
        }
        const match = await comparePassword(password, user.password)
        if(!match){
            return res.status(200).send({
                success:false,
                message:'Invalid password'
            })
        }
        //token generate    
        const token = await JWT.sign({_id:user._id}, process.env.JWT_SECRET,
            {expiresIn:"7d"}
        );
        res.status(200).send({
            success:true,
            massage:"login successfully",
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address
            },
            token
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:true,
            message:"error in login",
            error,
        })
    }
 }

//testController

export const testController = (req, res) => {
    res.send('protect');
};

