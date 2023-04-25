import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const { isAuth } = useSelector((state) => state.auth);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container">
    <NavLink to="/" className="navbar-brand">
      Home
    </NavLink>

    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ms-auto">
        {isAuth ? (
          <>
            <li className="nav-item">
              <NavLink to="/dashboard" className="nav-link">
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <button className="btn btn-outline-primary ms-3">
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/register" className="nav-link">
                Register
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  </div>
</nav>

  );
};

export default Navbar;
