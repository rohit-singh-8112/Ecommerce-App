import React,{useState, useEffect} from 'react'
import Layout from '../component/layout/Layout'
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/Cart';
import toast from 'react-hot-toast';
const CategoryProduct = () => {
    const [product, setProduct] = useState([]);
    const [category, setCategory] = useState([]);
    const {cart, setCart} = useCart();
    const params = useParams();
    const navigate = useNavigate();

    const getProductByCategory = async() =>{
        try{
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/category-product/${params.slug}`)
            setProduct(data?.product)
            setCategory(data?.category)

        }catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
       if(params?.slug) getProductByCategory();
       //eslint-disable-next-line
    },[params?.slug])

  return (
    <Layout>
        <div className="container mt-3">
            <h1 className="text-center">{category.name}</h1>
            <p className="text-center">Result Found:<strong>{product.length}</strong></p>
            <hr/>
            <div className="d-flex flex-wrap justify-content-around">
                {product.map((p)=>
              
                  <div className="card m-2" key={p._id} style={{width: '18rem'}}>
                      <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} loading="lazy" className="card-img-top" height="250px" alt={p.name} />
                      <div className="card-body">
                          <h5 className="card-title">{p.name.substring(0,20)}...</h5>
                          <p className="card-text">{p.description.substring(0,50)}...</p>
                          <p>₹{p.price}</p>
                          <div className="d-flex justify-content-around">
                            <button className="btn btn-secondary" onClick={()=> navigate(`/product/${p.slug}`)}>More Details</button>
                            <button className="btn btn-primary"onClick={()=>{setCart([...cart, p]); toast.success("Item added to cart")}} >Add To Cart</button>
                          </div>
                      </div>
                  </div>
              
                )}
            </div>

        </div>
    </Layout>
  )
}

export default CategoryProduct 