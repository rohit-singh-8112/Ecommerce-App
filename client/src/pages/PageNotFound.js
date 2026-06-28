import { Link } from "react-router-dom"
import Layout from "../component/layout/Layout"


const PageNotFound = () => {
  return (
    <Layout>
      <div className="pnf">
        <h1 className="pnf-404">404</h1>
        <h3 className="pnf-oops">Oops ! Page Not Found</h3>
        <Link to="/" className="pnf-goBack">Go Back</Link>
      </div>
    </Layout>
  )
}

export default PageNotFound