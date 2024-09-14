import React, { useEffect, useState, createContext } from "react";
import { Outlet, Link, NavLink } from "react-router-dom";
import axios from "axios";

export const MyContext = createContext();

function Home() {
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/cart")
      .then((res) => {
        setCartCount(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const updateValue = (newValue) => {
    setCartCount(newValue);
  };

  return (
    <>
      <header className="p-3 mb-3 border-bottom">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <NavLink
              to="/"
              className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none"
            >
              <h3>Users {"   "}</h3>
            </NavLink>

            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li>
                <NavLink to="shop" className="nav-link px-2">
                  Shop
                </NavLink>
              </li>
              <li>
                <NavLink to="cart" className="nav-link px-2">
                  Cart{" "}
                  <span className="badge text-bg-warning">{cartCount}</span>
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
                  <button className="dropdown-item">Sign out</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      <div>
        <h5>Welcome to the Dashboard</h5>
      </div>
      <MyContext.Provider value={{ cartCount, updateValue }}>
        <Outlet />
      </MyContext.Provider>
    </>
  );
}

export default Home;
