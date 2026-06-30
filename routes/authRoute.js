import express from "express";
import {registerController, loginController, testController, forgetPasswordController } from "../controller/authController.js"
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
const router = express.Router();

//routing
//REGISTER || METHOD POST

router.post('/register',registerController);

//LOGIN || POST
router.post('/login', loginController);

//test
router.get('/test', requireSignIn, isAdmin, testController);

//Forget Password
router.post('/forget-password', forgetPasswordController);

//Protected route auth
router.get('/user-auth', requireSignIn, (req, res)=>{
    res.status(200).send({ok: true});
})

export default router;
