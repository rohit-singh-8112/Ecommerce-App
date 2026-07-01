import {useState} from 'react'
import Layout from '../../component/layout/Layout';
import '../../styles/authStyles.css';
import { BiHide, BiShowAlt } from "react-icons/bi";
import { useNavigate } from 'react-router-dom'; 
import toast from 'react-hot-toast';
import axios from 'axios';

const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    const [answer, setAnswer] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [show, setShow] = useState(true);
    const navigate = useNavigate();

    const handlerSubmit = async(e) =>{
        e.preventDefault();
        try{
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forget-password`, { email, answer, newPassword });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/Login");
            } else {
                toast.error(res.data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    }
  
  return (
    <Layout title= {'Login here - Town Shop'}discription= {"Town Shop is your trusted online shopping destination for fashion, electronics, home essentials, beauty products, and more. Enjoy secure payments, fast delivery, and great deals."} keywords={"Town Shop, online shopping, e-commerce, fashion, electronics, clothing, home appliances, beauty products, accessories, online store, best deals, shopping website"} author={"Rohit Chauhan"}>
      <div className="form-container">
        <form onSubmit={handlerSubmit}>
          <h4 className="title">RESET PASSWORD</h4>
          <div className="mb-3">
            <input placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} type="text" className="form-control" id="exampleInputName1" aria-describedby="emailHelp" required />
          </div>
          <div className="mb-3">
            <input placeholder="Your Best Friend Name ?" value={answer} onChange={(e)=>setAnswer(e.target.value)} type="text" className="form-control" id="exampleInputName1" aria-describedby="emailHelp" required />
          </div>
          <div className="mb-3 password">
            <input placeholder="New Password" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} type={show ? "password": "text"} className="form-control" id="exampleInputPassword1" required />
            <span onClick={(e)=>setShow(!show) }>{show ? <BiHide/> : <BiShowAlt/>}</span>
          </div>
          <div className="justify-content-center ">
            <button type="submit" className="btn btn-primary ">Reset Password</button>
          </div>
          <div className="justify-content-center mt-3 ">
            <button type="button" onClick={()=> navigate("/Login")} className="btn-primary" >Login</button>
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default ForgetPassword