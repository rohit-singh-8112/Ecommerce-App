
import { useState, useContext, createContext, useEffect} from "react";


const CartContext = createContext();

const CartProvider = ({children}) =>{
    const [cart, setCart] = useState(()=> JSON.parse(localStorage.getItem("cart")) || []);


    useEffect(()=>{
        localStorage.setItem("cart", JSON.stringify(cart))
    },[cart])
     
    return(
        <CartContext.Provider value={{cart, setCart}} >
            {children}
        </CartContext.Provider>
    );
};


//Costom Hook
const useCart = () => useContext(CartContext); 

export {CartProvider, useCart};
