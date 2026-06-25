import Footer from "./Footer"
import Header from "./Header"


const Layout = (props) => {
  return (
    <>
        <Header />
        <main style={{minHeight:"80vh"}}> 
            {props.children}
        </main>
        <Footer /> 
    </>
  )
}

export default Layout