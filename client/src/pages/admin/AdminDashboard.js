import React from 'react'
import Layout from '../../component/layout/Layout'
import AdminMenu from '../../component/layout/AdminMenu'
import {useAuth} from "../../context/auth"
const AdminDashboard = () => {
  const {auth} = useAuth();
  return (
    <Layout title= {'Admin Dashboard - Town Shop'}discription= {"Town Shop is your trusted online shopping destination for fashion, electronics, home essentials, beauty products, and more. Enjoy secure payments, fast delivery, and great deals."} keywords={"Town Shop, online shopping, e-commerce, fashion, electronics, clothing, home appliances, beauty products, accessories, online store, best deals, shopping website"} author={"Rohit Chauhan"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3>Admin Name: {auth?.user?.name}</h3>
              <h3>Admin Email: {auth?.user?.email}</h3>
              <h3>Admin Contact: {auth?.user?.phone}</h3>
            </div>
          </div> 
        </div>
      </div>
     </Layout>
  )
}
export default AdminDashboard