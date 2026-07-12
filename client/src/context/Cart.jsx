
import { useState, useContext, createContext} from "react";


const CartContext = createContext();

const CartProvider = ({children}) =>{
    const [cart, setCart] = useState([]);
     
    return(
        <CartContext.Provider value={{cart, setCart}} >
            {children}
        </CartContext.Provider>
    );
};


//Costom Hook
const useCart = () => useContext(CartContext); 

export {CartProvider, useCart};
