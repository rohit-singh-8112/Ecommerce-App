import React from 'react'
import Layout from '../../component/layout/Layout'
import UserMenu from '../../component/layout/UserMenu'
const Order = () => {
  return (
    <Layout title= {'Dashboard - Orders'} discription= {"Town Shop is your trusted online shopping destination for fashion, electronics, home essentials, beauty products, and more. Enjoy secure payments, fast delivery, and great deals."} keywords={"Town Shop, online shopping, e-commerce, fashion, electronics, clothing, home appliances, beauty products, accessories, online store, best deals, shopping website"} author={"Rohit Chauhan"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
            <div className="col-md-3">
              <UserMenu />
            </div>
            <div className="col-md-9">
              <h1>All Orders</h1>
            </div>
        </div>
      </div>
    </Layout>
  )
}

export default Order