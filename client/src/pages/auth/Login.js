import toast from "react-hot-toast";
import Layout from "../../component/layout/Layout"
import'../../styles/authStyles.css';
import { useState} from "react";
import { BiHide, BiShowAlt } from "react-icons/bi";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import {useAuth} from "../../context/auth"



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(true);
  const navigate = useNavigate();
  const {auth, setAuth} = useAuth();
  const location = useLocation();


  const handlerSubmit = async(e) =>{
    e.preventDefault();
    try{
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`,{email, password});
      // console.log(res.data.message);
      
      if (res.data.success){
        toast.success("Success fully login");
        setAuth(
          {...auth, user:res.data.user, token:res.data.token}
        );
        localStorage.setItem('auth', JSON.stringify(res.data));
        navigate(location.state || "/");


        // if(res.data.user.role === 0){
        //   navigate(location.state || "/");
        // }else{
        //    navigate(location.state || "/SallerHome");
        // }

        
      }else{
        toast.error(res.data.message);
      }
    }catch(error){
      console.log(error);
      toast.error('Something went wrong');
    }
  }
  return (
    <Layout title= {'Login here - Town Shop'}discription= {"Town Shop is your trusted online shopping destination for fashion, electronics, home essentials, beauty products, and more. Enjoy secure payments, fast delivery, and great deals."} keywords={"Town Shop, online shopping, e-commerce, fashion, electronics, clothing, home appliances, beauty products, accessories, online store, best deals, shopping website"} author={"Rohit Chauhan"}>
      <div className="form-container">
        <form onSubmit={handlerSubmit}>
          <h4 className="title">LOGIN FORM</h4>
          <div className="mb-3">
            <input placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} type="text" className="form-control" id="exampleInputName1" aria-describedby="emailHelp" required />
          </div>
          <div className="mb-3 password">
            <input placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} type={show ? "password": "text"} className="form-control" id="exampleInputPassword1" required />
            <span onClick={(e)=>setShow(!show) }>{show ? <BiHide/> : <BiShowAlt/>}</span>
          </div>
          <div className="justify-content-center ">
            <button type="submit" className="btn btn-primary ">Login</button>
          </div>
          <div className="justify-content-center mt-3 ">
            <button type="button" onClick={()=> navigate("/Forget-Password")} className="btn-primary" >Forget Password</button>
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default Login