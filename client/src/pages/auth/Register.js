import Layout from "../../component/layout/Layout"
import { useState } from "react"
import { BiHide, BiShowAlt } from "react-icons/bi";
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import '../../styles/authStyles.css'


const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const [check, setCheck] = useState(false);
  const [show, setShow] = useState(true);
  const navigate = useNavigate();

  const handlerSubmit = async(e) =>{
    e.preventDefault();
    try{
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`,{ name, email, password, phone, address, answer, role:check })
      if(res.data.success){
        toast.success(res.data.message);
        navigate("/Login")
      }else{
        toast.error(res.data.message);
      }
    }catch(error){
      console.log(error);
      toast.error("Something went Wrong");
    }
  }
 
  return (
    <Layout title= {'Register here - Town Shop'} discription= {"Town Shop is your trusted online shopping destination for fashion, electronics, home essentials, beauty products, and more. Enjoy secure payments, fast delivery, and great deals."} keywords={"Town Shop, online shopping, e-commerce, fashion, electronics, clothing, home appliances, beauty products, accessories, online store, best deals, shopping website"} author={"Rohit Chauhan"}>
  
      <div className="form-container">
        <form onSubmit={handlerSubmit}>
          <h4 className="title">REGISTOR FORM</h4>
          <div className="mb-3">
            <input placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} type="text" className="form-control" id="exampleInputName1" aria-describedby="emailHelp" required />
          </div>
          <div className="mb-3">
            <input placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} type="text" className="form-control" id="exampleInputName1" aria-describedby="emailHelp" required />
          </div>
          <div className="mb-3 password">
            <input placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} type={show ? "password": "text"} className="form-control" id="exampleInputPassword1" required />
            <span onClick={(e)=>setShow(!show) }>{show ? <BiHide/> : <BiShowAlt/>}</span>
          </div>

          <div className="mb-3">
            <input placeholder="Phone" value={phone} onChange={(e)=>setPhone(e.target.value)} type="text" className="form-control" id="exampleInputName1" aria-describedby="emailHelp" required />
          </div>
          <div className="mb-3">
            <input placeholder="Address" value={address} onChange={(e)=>setAddress(e.target.value)} type="text" className="form-control" id="exampleInputName1" aria-describedby="emailHelp" required />
          </div>
          <div className="mb-3">
            <input placeholder="Your Best Friend Name ?" value={answer} onChange={(e)=>setAnswer(e.target.value)} type="text" className="form-control" id="exampleInputName1" aria-describedby="emailHelp" required />
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" checked={check} onChange={(e) => setCheck(e.target.checked)} className="form-check-input box" id="exampleCheck1" />
            <label className="form-check-label" htmlFor="exampleCheck1">Select only Seller</label>
          </div>
          <div className="justify-content-center ">
            <button type="submit" className="btn btn-primary ">Register</button>
          </div>
          
        </form>
      </div>
 
    </Layout>
  )
}

export default Register