
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
import SearchPage from "./pages/SearchPage";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./component/Routes/Private";
import ForgetPassword from "./pages/auth/ForgetPassword";
import AdminRoute from "./component/Routes/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateCategory from "./pages/admin/CreateCategory";
import CreateProduct from "./pages/admin/CreateProduct";
import Users from "./pages/admin/Users";
import Profile from "./pages/user/Profile"; 
import Order from "./pages/user/Order";
import Product from "./pages/admin/Product";
import UpdateProduct from "./pages/admin/UpdateProduct";
import ProductDetails from "./pages/ProductDetails";



   
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="product/:slug" element={<ProductDetails />} />
        <Route path="/Dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/orders" element={<Order />} />
        </Route>
        <Route path="/Dashboard" element={<AdminRoute/>}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/update-product/:slug" element={<UpdateProduct />} />
          <Route path="admin/products" element={<Product />} />
          <Route path="admin/users" element={<Users />} />
        </Route>
        <Route path="/About" element={<About />} />
        <Route path="/Contect" element={<Contect />} />
        <Route path="/Policy" element={<Policy />} />
        <Route path="/search" element={<SearchPage />} />
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
