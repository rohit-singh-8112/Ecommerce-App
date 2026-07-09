import { useState, useEffect } from "react";
import Layout from "../component/layout/Layout"
import { useAuth } from "../context/auth"
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Prices } from "../component/Prices";
import {Checkbox,Radio} from 'antd';

const HomePage = () => {
  const {auth, setAuth} = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);



//get all Categories
  const getAllCategory = async() =>{
    try{
        const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
            setCategories(data?.category);  
    }catch(error){
        console.log(error);
    }
}
useEffect(()=>{

  getAllCategory();
},[]);

//get All Products
  const getAllProducts = async() =>{
    try{
      const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product`);
        setProducts(data?.products);
    }catch(error){
      console.log(error)
    }
  }
//filter by cat
  const handleFilter = (value, id) =>{
     let all = [...checked];
     if(value){
      all.push(id);
     }else{
      all = all.filter(c => c!==id)
     }
     setChecked(all);
  }

  useEffect(()=>{
   if(!checked.length || !radio.length) getAllProducts();
  
  },[checked.length, radio.length]);
  useEffect(()=>{
    if(checked.length || radio.length) filterProduct();

   },[checked, radio]);

//get Filtered products
const filterProduct = async()=>{
  try{
    const {data} = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/filter-product`,{checked, radio})
    setProducts(data?.products);
  }catch(error){
    console.log(error)
  }
}

  return (
    <Layout title= {'Town Shop | Online Shopping for Fashion, Electronics & More'} discription= {"Town Shop is your trusted online shopping destination for fashion, electronics, home essentials, beauty products, and more. Enjoy secure payments, fast delivery, and great deals."} keywords={"Town Shop, online shopping, e-commerce, fashion, electronics, clothing, home appliances, beauty products, accessories, online store, best deals, shopping website"} author={"Rohit Chauhan"}>
      <div className="row mt-3">
        <div className="col-md-2"> 
            <h4 className="text-center" >filter By Category</h4>
            <div className="d-flex flex-column ms-3">
              {categories?.map((c)=>(
                <Checkbox key={c._id} onChange={(e)=>handleFilter(e.target.checked, c._id)}>{c.name}</Checkbox>
              ))}
            </div>
            <h4 className="text-center mt-4" >filter By Price</h4>
            <div className="d-flex flex-column ms-3">
              
                <Radio.Group onChange={e=>setRadio(e.target.value)}>
                  {Prices?.map(p=>(
                    <div key={p._id}>
                      <Radio value={p.array}>{p.name}</Radio>
                    </div>
                  ))}
                </Radio.Group>
         
            </div>
        </div>
        <div className="col-md-10">
          {/* {JSON.stringify(radio, null, 4)} */}
          <h1 className="text-center">All Product</h1>
          <div className="d-flex flex-wrap justify-content-around">
          {products.map((p)=>
            <NavLink to={`/dashboard/admin/update-product/${p.slug}`}  key={p._id} className="Product-Link">
                <div className="card m-2" style={{width: '18rem'}}>
                    <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} loading="lazy" className="card-img-top" height="250px" alt={p.name} />
                    <div className="card-body">
                        <h5 className="card-title">{p.name.substring(0,20)}...</h5>
                        <p className="card-text">{p.description.substring(0,50)}...</p>
                        <p>₹{p.price}</p>
                        <div className="d-flex justify-content-around">
                          <button className="btn btn-secondary ">More Details</button>
                          <button className="btn btn-primary">Add To Cart</button>
                        </div>
                    </div>
                </div>
            </NavLink>
          )}
          </div>
        </div>

      </div>

    </Layout>
  )
}

export default HomePage