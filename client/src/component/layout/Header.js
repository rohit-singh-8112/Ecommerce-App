import { NavLink } from "react-router-dom";
import { RiShoppingBag3Fill } from "react-icons/ri";
import { useAuth } from "../../context/auth";
// import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Header = () => {
  const {auth, setAuth} = useAuth();
  // const navigate = useNavigate();
    const handalLogout = () => {
        localStorage.removeItem('auth');
        setAuth({
          ...auth, 
          user:null,
          token:""
        })
        toast.success("Logout successfully");
       
    }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <NavLink to="/" className="navbar-brand">
            <RiShoppingBag3Fill /> Town Shop
            </NavLink>

            <ul className=" navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/Category" className="nav-link">
                  category
                </NavLink>
              </li>
              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/Register" className="nav-link">
                      Registor
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/Login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              ):(<>
                  <li className="nav-item dropdown">
                    <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">{auth?.user.name}</NavLink>
                    <ul className="dropdown-menu">
                      <li  className="nav-item"><NavLink to={`/Dashboard${auth?.user.role ===1 ? "/admin":"/user"}`} className="nav-link logout">Dashboard</NavLink></li>
                      <li  className="nav-item"><NavLink to="/Login" onClick={handalLogout} className="nav-link logout">Logout</NavLink></li>
                    </ul>
                  </li>
                </>
              )}
              <li className="nav-item">
                <NavLink
                  to="/Cart"
                  className="nav-link disabled"
                  aria-disabled="true"
                >
                  Cart(0)
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;