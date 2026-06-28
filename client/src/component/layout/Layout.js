import Footer from "./Footer"
import Header from "./Header"
import {Helmet} from "react-helmet";


const Layout = ({children, description, title, keywords, author}) => {
  return (
    <>  
      <Helmet>
          <meta charSet="utf-8" />
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta name="author" content={author} />
          <title>{title}</title>
     

      </Helmet>
        <Header />
        <main style={{minHeight:"80vh"}}> 
            {children}
        </main>
        <Footer /> 
    </>
  )
};
Layout.defaultProps = {
  title: "Town Shop | Online Shopping for Fashion, Electronics & More",
  discription: "Town Shop is your trusted online shopping destination for fashion, electronics, home essentials, beauty products, and more. Enjoy secure payments, fast delivery, and great deals.",
  keywords: "Town Shop, online shopping, e-commerce, fashion, electronics, clothing, home appliances, beauty products, accessories, online store, best deals, shopping website",
  author: "Rohit Chauhan",
};

export default Layout