import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import Layout from '../component/layout/Layout'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const ProductDetails = () => {
    const params = useParams();
    const[product, setProduct] = useState([]);
    const[relatedProduct, setRelatedProduct] = useState([]);
    const navigate = useNavigate()
    const getProduct = async() =>{
        try{
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`);
            setProduct(data?.product)
            getRelatedProduct(data?.product._id, data?.product.category._id)
        }catch(error){
            console.log(error);
        }
    }
    const getRelatedProduct = async(pid,cid) =>{
        try{
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`);
            setRelatedProduct(data?.product)
        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        if(params?.slug) getProduct();
        //eslint-disable-next-line
    },[params?.slug])

  return (
    <Layout title="Search Results | Town Shop" discription="Search results for products on Town Shop">
        <div className="row container mt-4">
            <div className="col-md-6">
                <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`} className="card-img-top" height="500px" alt={product.name} />
            </div>
            <div className="col-md-6">
                <h1 className="text-center">Product Details</h1>
                <h5>Name:- {product.name}</h5>
                <h6>Description:- {product.description}</h6>
                {/* <h6>Category:- {product.category.name}</h6> */}
                <h6>Price:- ₹{product.price}</h6>
                {/* <h6>Shipping: {product.shipping}</h6> */}
                <button className="btn btn-primary">Add To Cart</button>
            </div>
        </div>
        <hr />
        <h4 className='text-center'>Similar</h4>
        <hr />
        <div className="d-flex flex-wrap ">
            {relatedProduct.map((p)=>
                  <div className="card m-2" key={p._id} style={{width: '18rem'}}>
                      <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} loading="lazy" className="card-img-top" height="250px" alt={p.name} />
                      <div className="card-body">
                          <h5 className="card-title">{p.name.substring(0,20)}...</h5>
                          <p className="card-text">{p.description.substring(0,50)}...</p>
                          <p>₹{p.price}</p>
                          <div className="d-flex justify-content-around">
                            <button className="btn btn-secondary" onClick={()=> navigate(`/product/${p.slug}`)}>More Details</button>
                            <button className="btn btn-primary">Add To Cart</button>
                          </div>
                      </div>
                  </div>
            )}
          </div>
    </Layout> 
  )
}

export default ProductDetails