import Layout from "../../component/layout/Layout"
import'../../styles/authStyles.css';
import { useState } from "react";
import { BiHide, BiShowAlt } from "react-icons/bi";



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [check, setCheck] = useState(false);
  const [show, setShow] = useState(true);


  const handlerSubmit = async(e) =>{
    e.preventDefault();

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
          <div className="mb-3 form-check">
            <input type="checkbox" checked={check} onChange={(e) => setCheck(e.target.checked)} className="form-check-input box" id="exampleCheck1" />
            <label className="form-check-label" htmlFor="exampleCheck1">Select only Seller</label>
          </div>
          <div className="justify-content-center ">
            <button type="submit" className="btn btn-primary ">Login</button>
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default Login