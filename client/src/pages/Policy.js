import Layout from "../component/layout/Layout"

const Policy = () => {
  return (
      <Layout title= {'Privacy & Policy - Town Shop'} discription= {"Town Shop is your trusted online shopping destination for fashion, electronics, home essentials, beauty products, and more. Enjoy secure payments, fast delivery, and great deals."}
  keywords={"Town Shop, online shopping, e-commerce, fashion, electronics, clothing, home appliances, beauty products, accessories, online store, best deals, shopping website"}
  author={"Rohit Chauhan"}>
        <div className="row contectus mt-1">
          <h1 className="bg-dark p-2 text-white text-center">PRIVACY & POLICY</h1>
          <p className="ps-5 pe-5 mb-5">If you plan to launch Town Shop publicly, you should replace the placeholder contact information and have your Privacy Policy reviewed to ensure it complies with applicable laws (such as India's Digital Personal Data Protection Act and any other regulations relevant to where you operate).</p>
          <div className="col-md-6 mb-1">
            <img src="/image/policy.jpg" alt="ContectImage" style={{width:"100%"}}/>
          </div>
          <div className="col-md-4">

            <p className="mt-2 text-justify">🔒 We protect your personal information with secure technology.</p>
            <p className="mt-3">👤 We collect only the information required to process your orders.</p>
            <p className="mt-3">📧 Your email address is used for order updates and customer support.</p>
            <p className="mt-3">📢 Any changes to our Privacy Policy will be posted on this page.</p>
            <p className="mt-3">📞 If you have any questions, please contact our support team.</p>
            <p className="mt-3">🗑️ You may request the deletion of your account and personal data.</p>

          </div>
        </div>
    </Layout>
  )
}

export default Policy