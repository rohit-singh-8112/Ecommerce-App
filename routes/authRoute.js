import express from "express";
import {registerController, loginController, testController } from "../controller/authController.js"
import { requireSignIn } from "../middlewares/authMiddleware.js";
const router = express.Router();

//routing
//REGISTER || METHOD POST

router.post('/register',registerController);

//LOGIN || POST
router.post('/login', loginController);

//test
router.get('/test', requireSignIn, testController);

export default router;
