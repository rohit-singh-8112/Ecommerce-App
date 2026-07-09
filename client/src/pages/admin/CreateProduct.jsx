import React,{useEffect, useState} from 'react'
import Layout from '../../component/layout/Layout'
import AdminMenu from '../../component/layout/AdminMenu'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {Select} from "antd";
const {Option} = Select
const CreateProduct = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [ name, setName ] = useState("");
    const [ description, setDescription ] = useState("");
    const [category, setCategory] = useState("");
    const [ price, setPrice ] = useState("");
    const [ quentity, setQuentity ] = useState("");
    const [ shipping, setShipping ] = useState("");
    const [photo, setPhoto] = useState(null);
    const [error, setError] = useState();

    //get all category
       const getAllCategory = async() =>{
        try{
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
            if(data?.success){
                setCategories(data?.category);
                
            }
        }catch(error){
            console.log(error);
            toast.error("Something went wrong in getting category");
        }
    }
    useEffect(()=>{
        getAllCategory();
       
    },[])
    useEffect(()=>{
        if(!photo) return;
        const MAX_SIZE = 2097151;
        if(photo.size > MAX_SIZE){
            setError('File is too large. Maximum size is 2MB.');
        }else{
            setError('');
        }
    },[photo])


    const handleCreateProduct = async(e) =>{
        e.preventDefault()
        try{
            const product = new FormData()
            product.append("name", name)
            product.append("description", description)
            product.append("price", price)
            product.append("category", category)
            product.append("quantity", quentity)
            product.append("photo", photo)
            product.append("shipping", shipping)
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/create-product`,(product))
            if(res.data.success){
                toast.success(res.data.message)
                navigate("/Dashboard/admin/products");
            }else{
                toast.error(res.data.message);
            }

        }catch(error){
            console.table(error);
            toast.error("Something wrong in create product");
        }
    }
  return (
    <Layout
      title={"Dashboard - Create Product"}
      discription={
        "Town Shop is your trusted online shopping destination for fashion, electronics, home essentials, beauty products, and more. Enjoy secure payments, fast delivery, and great deals."
      }
      keywords={
        "Town Shop, online shopping, e-commerce, fashion, electronics, clothing, home appliances, beauty products, accessories, online store, best deals, shopping website"
      }
      author={"Rohit Chauhan"}
    >
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create Product</h1>
            <div className="m-1 w-75">
                <Select
                    variant={false}
                    placeholder="Select a Category"
                    size="large"
                    suffixIcon={null} 
                    showSearch
                    className="form-select mb-3"
                    onChange={(value) => {
                    setCategory(value);
                    }}
                >
                    {categories.map((c) => (
                    <Option key={c._id} value={c._id}>
                        {c.name}
                    </Option>
                    ))}
                </Select>
                <div className="mb-3">
                    <label className='btn btn-outline-secondary col-md-12'>
                        {photo ?  photo.name : "Upload Photo"}  
                        <input type="file" name="Photo" accept="image/*" onChange={(e)=>setPhoto(e.target.files[0])} hidden/>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                    </label>
                </div>
                <div className="mb-3">
                    {photo && (
                        <div className="text-center">
                            <img src={URL.createObjectURL(photo)} alt="Product_photo" height={"200px"} className='img img-resposive'/>
                        </div>
                    )}
                </div>
                <div className="mb-3">
                    <input type="text" value={name} placeholder="Enter Product Name" className="form-control mb-3" onChange={(e)=>setName(e.target.value)}/>
                    <textarea type="text" value={description} placeholder="Write a Description" className="form-control mb-3" onChange={(e)=>setDescription(e.target.value)}/>
                    <input type="number" value={price} placeholder="Enter Price" className="form-control mb-3" onChange={(e)=>setPrice(e.target.value)}/>
                    <input type="number" value={quentity} placeholder="Enter Quentity" className="form-control mb-3" onChange={(e)=>setQuentity(e.target.value)}/>
                    <Select
                        variant={false}
                        placeholder="Select Shipping"
                        size="large"
                        suffixIcon={null} 
                        showSearch
                        className="form-select mb-3"
                        onChange={(value) => {
                        setShipping(value);
                        }}
                    >
                        <Option value ="0">No</Option>
                        <Option value ="1">Yes</Option>
                    </Select>
                </div>
                <div className="mb-3">
                    <button className="btn btn-primary" onClick={handleCreateProduct}>CREATE PRODUCT</button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CreateProduct