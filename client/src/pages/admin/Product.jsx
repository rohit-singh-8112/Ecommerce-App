import React, {useState, useEffect} from 'react'
import Layout from "../../component/layout/Layout"
import AdminMenu from '../../component/layout/AdminMenu'
import toast from 'react-hot-toast';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const Product = () => {
    const [products, setProducts] = useState([]);

    const getAllProducts = async() =>{
        try{
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product`);
            if(data.success){
                setProducts(data.products)

            }

        }catch(error){
            toast.error("something wrong in getting products");
            console.log(error);
        }
    }

    useEffect(()=>{
        getAllProducts();
    },[]);

  return (
    <Layout title={"Dashboard - Products"} discription={ "Town Shop is your trusted online shopping destination for fashion, electronics, home essentials, beauty products, and more. Enjoy secure payments, fast delivery, and great deals." } keywords={ "Town Shop, online shopping, e-commerce, fashion, electronics, clothing, home appliances, beauty products, accessories, online store, best deals, shopping website" } author={"Rohit Chauhan"} >
         <div className="container-fluid m-3 p-3 dashboard">
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <h1 className="text-center">AllProducts</h1>
                    <div className="d-flex flex-wrap m-2 justify-content-evenly">
                        {products.map((p)=>
                            <NavLink to={`/dashboard/admin/update-product/${p.slug}`} className="Product-Link">
                                <div className="card mb-2" style={{width: '18rem'}} kay={p._id}>
                                    <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top" height="250px" alt={p.name} />
                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">{p.description}</p>
                                        
                                    </div>
                                </div>
                            </NavLink>
                        )}
                    </div>
                </div>
            </div>
         </div>
        

    </Layout>
  )
}

export default Product