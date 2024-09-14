import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:5000/register", { email, password, name })
      .then((res) => {
        toast.success(res.data.message);
        setName("");
        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      });
  }

  return (
    <div
      className="modal modal-sheet position-static d-block p-4 py-md-5"
      tabIndex="-1"
      role="dialog"
      id="modalSignin"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content rounded-4 shadow">
          <div className="modal-header p-5 pb-4 border-bottom-0">
            <h1 className="fw-bold mb-0 fs-2">Sign up</h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body p-5 pt-0">
            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control rounded-3"
                  placeholder="Your name here"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="floatingInput">Full Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control rounded-3"
                  id="floatingInput"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control rounded-3"
                  id="floatingPassword"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>
              <button
                className="w-100 mb-2 btn btn-lg rounded-3 btn-primary"
                type="submit"
              >
                Sign up
              </button>
              <hr className="my-4" />
              <small className="text-body-secondary">
                Already have an account?, <Link to="/admin/login">Login</Link>{" "}
                here.
              </small>
            </form>
            <ToastContainer position="top-center" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
