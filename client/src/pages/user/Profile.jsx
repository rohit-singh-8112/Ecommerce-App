import React, {useState, useEffect} from 'react'
import Layout from '../../component/layout/Layout'
import UserMenu from '../../component/layout/UserMenu'

import axios from 'axios';
import toast from 'react-hot-toast';
// import { BiHide, BiShowAlt } from "react-icons/bi";
import { useAuth } from '../../context/auth';


const Profile = () => {
  const {auth, setAuth} = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  // const [show, setShow] = useState(true);


  useEffect(() => {
    if (auth?.user) {
      setName(auth.user.name);
      setEmail(auth.user.email);
      setPhone(auth.user.phone);
      setAddress(auth.user.address);
    }
  }, [auth]);

  const handlerSubmit = async(e) =>{
    e.preventDefault();
    try{
      const {data} = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/update-user`,{ name, email, phone, address})
      if(data.success){
        toast.success(data.message);
        setAuth({...auth, user:data?.updateUser})
        let ls = JSON.parse(localStorage.getItem("auth"))
        ls.user = data?.updateUser;
        localStorage.setItem('auth', JSON.stringify(ls))
        toast.success("profile updated sccessfully")
       
      }else{
        toast.error(data.message);
      }
    }catch(error){
      console.log(error);
      toast.error("Something went Wrong");
    }
  }

  return (
    <Layout title= {'Dashboard - Profile'} discription= {"Town Shop is your trusted online shopping destination for fashion, electronics, home essentials, beauty products, and more. Enjoy secure payments, fast delivery, and great deals."} keywords={"Town Shop, online shopping, e-commerce, fashion, electronics, clothing, home appliances, beauty products, accessories, online store, best deals, shopping website"} author={"Rohit Chauhan"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
            <div className="col-md-3">
              <UserMenu />
            </div>
            <div className="col-md-9">
              <div className="form-container">
                <form onSubmit={handlerSubmit}>
                  <h4 className="title">USER PROFILE</h4>
                  <div className="mb-3">
                    <input placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} type="text" className="form-control" id="exampleInputName1" aria-describedby="emailHelp" required />
                  </div>
                  <div className="mb-3">
                    <input placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} type="text" className="form-control" id="exampleInputName1" aria-describedby="emailHelp" required />
                  </div>

                  <div className="mb-3">
                    <input placeholder="Phone" value={phone} onChange={(e)=>setPhone(e.target.value)} type="text" className="form-control" id="exampleInputName1" aria-describedby="emailHelp" required />
                  </div>
                  <div className="mb-3">
                    <input placeholder="Address" value={address} onChange={(e)=>setAddress(e.target.value)} type="text" className="form-control" id="exampleInputName1" aria-describedby="emailHelp" required />
                  </div>

                  <div className="justify-content-center ">
                    <button type="submit" className="btn btn-primary ">Update Profile</button>
                  </div>
                </form>
              </div>
            </div>
        </div>
      </div> 
    </Layout>
  )
}

export default Profile