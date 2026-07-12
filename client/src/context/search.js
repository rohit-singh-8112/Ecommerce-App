
import { useState, useContext, createContext} from "react";


const SearchContext = createContext();

const SearchProvider = ({children}) =>{
    const [value, setValue] = useState({
        keyword: "",
        result: [],
    });
     
    return(
        <SearchContext.Provider value={{ value, setValue}} >
            {children}
        </SearchContext.Provider>
    );
};


//Costom Hook
const useSearch = () => useContext(SearchContext); 

export {SearchProvider, useSearch};
