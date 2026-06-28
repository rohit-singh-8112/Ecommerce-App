import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <div className="footer">
        <h4 className="text-center">All Right Reserved &copy; Rohit Chauhan</h4>
        <p className="text-center mt-3">
          <Link to="/About">About</Link>|<Link to="/Contect">Contect</Link>|<Link to="/Policy">Policy</Link>
        </p>
    </div>
  )
}

export default Footer