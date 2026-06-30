import { comparePassword, hashPassword} from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

export const registerController = async(req, res) => {
    try{
        const {name, email, password, phone, address, role} = req.body
        //Validation
        if(!name){
            return res.send({ message: 'Name is Required'})
        }
        if(!email){
            return res.send({ message: 'Email is Required'})
        }
        if(!password){
            return res.send({ message: 'Password is Required'})
        }
        if(!phone){
            return res.send({ message: 'Phone is Required'})
        }
        if(!address){
            return res.send({ message: 'Address is Required'})
        }
        //Check User
        const exisitingUser = await userModel.findOne({email})

        //Exisiting User
        if(exisitingUser){
            return res.status(200).send({
                success: false,
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
                address:user.address,
                role: user.role
            },
            token
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in login",
            error,
        })
    }
 }

//Forget Password
export const forgetPasswordController = async(req,res) =>{
    try{
        const {email, answer, nawPassword} = req.body
        if(!email){
            res.status(400).send({message:'email is required'})
        }
        if(!answer){
            res.status(400).send({message:'answer is required'})
        }
        if(!nawPassword){
            res.status(400).send({message:'Naw password is required'})
        }

        //check 
        const user = await userModel.findOne({email, answer})
        if(!email || !answer){
            res.status(400).send({
                success: false,
                message: "wrong Email or answer"
            })
        }
        const hashed = await hashPassword(nawPassword) 
        await userModel.findByIdAndUpdate(user._id,{ password:nawPassword })
        res.status(200).send({
            success:true,
            message:"Password reset successfully",
        })
    }catch(error){
        console.log(error); 
        res.status(500).send({
            success: false,
            message:"Something went worng",
            error
        })
    }
};

//testController

export const testController = (req, res) => {
    res.send('protect');
};

