import { Link } from "react-router-dom"
import Layout from "../component/layout/Layout"


const PageNotFound = () => {
  return (
    <Layout title= {'Page Not Found - Town Shop'} discription= {"Town Shop is your trusted online shopping destination for fashion, electronics, home essentials, beauty products, and more. Enjoy secure payments, fast delivery, and great deals."}
  keywords={"Town Shop, online shopping, e-commerce, fashion, electronics, clothing, home appliances, beauty products, accessories, online store, best deals, shopping website"}
  author={"Rohit Chauhan"}>
      <div className="pnf">
        <h1 className="pnf-404">404</h1>
        <h3 className="pnf-oops">Oops ! Page Not Found</h3>
        <Link to="/" className="pnf-goBack">Go Back</Link>
      </div>
    </Layout>
  )
}

export default PageNotFound