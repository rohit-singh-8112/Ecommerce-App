import Layout from "../component/layout/Layout"
import { BiSupport, BiPhoneCall, BiMailSend  } from "react-icons/bi";

const Contect = () => {
  return (
     <Layout>
      <div className="row contectus mt-5">
        <div className="col-md-6">
          <img src="/image/image1.jpg" alt="ContectImage" style={{width:"100%"}}/>
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">CONTECT US</h1>
          <p className="mt-2 text-justify"> any query and info about product feel free to call any time we 24X7 avalibal</p>
          <p className="mt-3"><BiMailSend  />  : chauhanrc7878@gmail.com</p>
          <p className="mt-3"><BiPhoneCall /> : +91 8112467938</p>
          <p className="mt-3"><BiSupport /> : 1800-0000-00 (Toll-Free)</p>
        </div>

      </div>
    </Layout>
  )
}

export default Contect