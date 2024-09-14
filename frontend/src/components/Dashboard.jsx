import { useEffect, useState } from "react";
import axios from "axios";
import { Outlet, NavLink, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = () => {
      axios
        .get("http://localhost:5000/", { withCredentials: true })
        .then((response) => {
          setEmail(response.data.email);
          setLoading(false);
        })
        .catch((error) => {
          const errorMessage = error.response.data.error;
          setError(errorMessage);
        });
    };

    fetchUser();
  }, []);

  function handleSignOut() {
    axios
      .get("http://localhost:5000/logout", { withCredentials: true })
      .then((res) => {
        console.log(res);
        navigate("/admin/login");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <header className="p-3 mb-3 border-bottom">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <NavLink
              to="/admin/"
              className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none"
            >
              <h3>Logo {"   "}</h3>
            </NavLink>

            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li>
                <NavLink to="products" className="nav-link px-2">
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink to="addproducts" className="nav-link px-2">
                  Add Products
                </NavLink>
              </li>
              <li>
                <a href="#" className="nav-link px-2">
                  Orders
                </a>
              </li>
              <li>
                <a href="#" className="nav-link px-2">
                  Reports
                </a>
              </li>
            </ul>
            <div className="dropdown text-end">
              <a
                href="#"
                className="d-block link-body-emphasis text-decoration-none dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="https://github.com/mdo.png"
                  alt="mdo"
                  width="32"
                  height="32"
                  className="rounded-circle"
                />
              </a>
              <ul className="dropdown-menu text-small">
                <li>
                  <a className="dropdown-item" href="#">
                    New project...
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Settings
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Profile
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button className="dropdown-item" onClick={handleSignOut}>
                    Sign out
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      <div>
        <h5>Welcome to the Dashboard</h5>
        <p>User Email: {email}</p>
      </div>
      <Outlet />
    </>
  );
};

export default Dashboard;
