import React from 'react'
import Layout from '../component/layout/Layout'
import { useCart } from '../context/Cart'
import { useAuth } from '../context/auth'
// import { useNavigate } from 'react-router-dom'

const CartPage = () => {
    const {cart, setCart} = useCart();
    const {auth} = useAuth();
    // const navigate = useNavigate();

    const totalPrice = () =>{
        try{
            let total = 0;
            cart?.map((item)=> total = total + item.price)
            return total.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR"
            })
        }catch(error){
            console.log(error)
        }
    }

    const removeCartItem = (pid) =>{
        try{
            let myCart = [...cart]
            let index = myCart.findIndex(item => item._id === pid)
            myCart.splice(index, 1)
            setCart(myCart);
        }catch(error){
            console.log(error)
        }
    }

  return (
    <Layout>
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="text-center bg-light p-2 mb-1">
                        {`Hello ${auth?.token && auth?.user?.name}`}
                    </h1>
                    <h4 className="text-center">{cart?.length>0 ? `you have ${cart?.length} item in your cart ${auth?.token ? "":"please login to chakeout"} `:"Your cart is Empty" }</h4>
                </div>
            </div>
            <div className="row justify-content-around">
                <div className="col-md-6">
                    {cart?.map((p)=>
                        <div className="row mb-3 p-2 card flex-row" key={p._id}>
                            <div className="col-md-4">
                                <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} loading="lazy" className="card-img-top  mt-1 mb-1 border border-secondary-subtle" width="100px" height="150px" alt={p.name} />  
                            </div>
                            <div className="col-md-8">
                                <h5>{p.name.substring(0,25)}..</h5>
                                <p>{p.description.substring(0,45)}..</p>
                                <h5>Price: ₹{p.price}</h5>
                                <button className="btn btn-danger" onClick={()=> removeCartItem(p._id) }>Remove Item</button>
                            </div>
                        </div>
                    )}
                </div>
                
                <div className="col-md-4 text-center">
                    <h2>Cart Summary</h2>
                    <p>Total | Checkout | Payment</p>
                    <hr />
                    <h4>Total: {totalPrice()}</h4>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default CartPage