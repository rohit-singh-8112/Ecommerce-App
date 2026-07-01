
import { Routes, Route } from "react-router-dom";
import About from "./pages/About";
import HomePage from "./pages/HomePage";
import Contect from "./pages/Contect";
import Policy from "./pages/Policy";
import PageNotFound from "./pages/PageNotFound";
import './App.css';
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Cart from "./pages/Cart";
import SallerHomePage from "./pages/SallerHomePage";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./component/Routes/Private";
import ForgetPassword from "./pages/auth/ForgetPassword";

 
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Dashboard" element={<PrivateRoute />}>
          <Route path="" element={<Dashboard />} />
        </Route>
        <Route path="/About" element={<About />} />
        <Route path="/Contect" element={<Contect />} />
        <Route path="/Policy" element={<Policy />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Forget-Password" element={<ForgetPassword />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/SallerHome" element={<SallerHomePage />}/>
      </Routes>
      
    </>
  );
}

export default App;
