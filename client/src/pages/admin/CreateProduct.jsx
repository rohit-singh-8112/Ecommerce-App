import React,{useEffect, useState} from 'react'
import Layout from '../../component/layout/Layout'
import AdminMenu from '../../component/layout/AdminMenu'
import toast from 'react-hot-toast'
import axios from 'axios'
import {Select} from "antd";
const {Option} = Select
const CreateProduct = () => {
    const [categories, setCategories] = useState([]);
    const [ name, setName ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ price, setPrice ] = useState("");
    const [ quentity, setQuentity ] = useState("");
    const [ shipping, setShipping ] = useState("");


    //get all category
       const getAllCategory = async() =>{
        try{
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
            if(data?.success){
                setCategories(data?.category);
                console.log(data?.category)
            }
        }catch(error){
            console.log(error);
            toast.error("Something went wrong in getting category");
        }
    }
    useEffect(()=>{
        getAllCategory();
       
    },[])
  return (
    <Layout title= {'Dashboard - Create Product'}discription= {"Town Shop is your trusted online shopping destination for fashion, electronics, home essentials, beauty products, and more. Enjoy secure payments, fast delivery, and great deals."} keywords={"Town Shop, online shopping, e-commerce, fashion, electronics, clothing, home appliances, beauty products, accessories, online store, best deals, shopping website"} author={"Rohit Chauhan"}>
        <div className="container-fluid m-3 p-3 dashboard">
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <h1>Create Product</h1> 
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default CreateProduct