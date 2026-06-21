import express from 'express';
import colors from 'colors'; 
import dotenv from 'dotenv'

//Configure env
dotenv.config();

//REST Object
const app = express();


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




