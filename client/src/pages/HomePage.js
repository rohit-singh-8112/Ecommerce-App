import { useState, useEffect } from "react";
import Layout from "../component/layout/Layout"
// import { useAuth } from "../context/auth"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Prices } from "../component/Prices";
import {Checkbox,Radio} from 'antd';

const HomePage = () => {
  // const {auth, setAuth} = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const productsPerPage = 8;

  const lastIndex = currentPage * productsPerPage;
  const firstIndex = lastIndex - productsPerPage;
  const currentProducts = products.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(products.length / productsPerPage);
  const pageButton = [];
  for(let i=0; i<totalPages; i++){
      pageButton.push(
          <button key={i+1} onClick={()=>setCurrentPage(i+1)} className={currentPage === i + 1 ? "active" : ""} >{i+1}</button>

      ) 
     
  };



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
   if(checked.length===0 && radio.length===0) getAllProducts();
  
  },[checked.length, radio.length]);
  useEffect(()=>{
    if(checked.length>0 || radio.length>0) filterProduct();
    //eslint-disable-next-line
   },[checked, radio]);

//get Filtered products
const filterProduct = async()=>{
  try{
    const {data} = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/filter-product`,{checked:checked, radio:radio});
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
            <div className="d-flex flex-column ms-3 mt-3">
              <button className="btn btn-secondary" onClick={()=> window.location.reload()}>RESET FILTER</button>
            </div>
        </div>
        <div className="col-md-10">
          {/* {JSON.stringify(radio, null, 4)} */}
          <h1 className="text-center">All Product</h1>
          <div className="d-flex flex-wrap justify-content-around">
            {currentProducts.map((p)=>
              
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
          <div className="pagination">
                <button onClick={()=>setCurrentPage(currentPage-1)} disabled={currentPage === 1} >Prev</button>
                {pageButton}
                
                <button onClick={()=>setCurrentPage(currentPage+1)} disabled={currentPage === totalPages } >Next</button>
          </div>
        </div>

      </div>

    </Layout>
  )
}

export default HomePage