import React from 'react'
import Layout from '../../component/layout/Layout'
import UserMenu from '../../component/layout/UserMenu'
import { useAuth } from '../../context/auth';
const Dashboard = () => {
  const {auth} = useAuth();
  return (
    <Layout title= {'Dashboard - Town Shop'} discription= {"Town Shop is your trusted online shopping destination for fashion, electronics, home essentials, beauty products, and more. Enjoy secure payments, fast delivery, and great deals."} keywords={"Town Shop, online shopping, e-commerce, fashion, electronics, clothing, home appliances, beauty products, accessories, online store, best deals, shopping website"} author={"Rohit Chauhan"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
            <div className="col-md-3">
              <UserMenu />
            </div>
            <div className="col-md-9">
              <div className="card w-75 p-3">
                <h4>Welcome, {auth?.user?.name}!</h4>
                <h4>Email: {auth?.user?.email}</h4>
                <h4>Phone: {auth?.user?.phone}</h4>
                <h4>Address: {auth?.user?.address}</h4>
              </div>
            </div>
        </div>
      </div> 
    </Layout>
  )
}

export default Dashboard