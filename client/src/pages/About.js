import Layout from "../component/layout/Layout"

const About = () => {
  return (
    <Layout>
      <div className="row contectus mt-1">
     
        <h1 className="bg-dark p-2 text-white text-center">ABOUT TOWN SHOP</h1>
        <p className="ps-5 pe-5 mb-5"> Welcome to Town Shop, your trusted online shopping destination for quality products at affordable prices. We are committed to making online shopping easy, secure, and enjoyable for everyone.<br/>At Town Shop, we offer a wide selection of products, including fashion, electronics, home essentials, beauty products, accessories, and more. Our goal is to provide customers with the best value, excellent service, and a seamless shopping experience.<br/>Our website is designed using modern technologies to ensure fast performance, easy navigation, and a responsive experience across all devices.</p>
        <div className="col-md-6">
          <img src="/image/about.jpg" alt="AboutImage" style={{width:"100%"}} className="mb-5"/>
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">OUR MISSION</h1>
          <p className="mt-2 text-justify">Our mission is to provide high-quality products at competitive prices while delivering exceptional customer service and a smooth online shopping experience.</p>
          <h1 className="bg-secondary-subtle  text-white text-center">OUR VISION</h1>
          <p className="mt-2 text-justify">To become one of the most trusted and customer-focused e-commerce platforms by offering reliable products, innovative solutions, and outstanding customer satisfaction.</p><br/>
          <p className="mt-3">🛍️ Wide range of quality products</p>
          <p className="mt-3">💰 Affordable and competitive prices</p>
          <p className="mt-3">🔒 Safe and secure online shopping</p>
          <p className="mt-3">🚚 Fast and reliable delivery</p>
          <p className="mt-3">🔄 Easy returns and hassle-free refunds</p>

        </div>

      </div>
    </Layout>
  )
}

export default About