import express from 'express';
import colors from 'colors'; 
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js"
import categoryRoute from "./routes/CategoryRoute.js"
import cors from 'cors';




//Configure env
dotenv.config();

// Database config
connectDB();

//REST Object
const app = express();

//Middlewares
app.use(cors())
app.use(express.json()) 
app.use(morgan('dev'))

//Route
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoute);


//REST APIs
app.get("/",(req,res)=>{
    res.send({
        message:"wellcome to node js"
    });
});


//PORT
const PORT = process.env.PORT || 8080;

//Run listen
 app.listen(PORT,()=>{
    console.log(`server run on ${process.env.DEV_MODE} mode on PORT No :  ${PORT}` .bgWhite.green);
 });




