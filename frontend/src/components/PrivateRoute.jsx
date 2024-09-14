import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = () => {
      axios
        .get("http://localhost:5000/checkAuth", {
          withCredentials: true,
        })
        .then((response) => {
          setIsAuthenticated(response.data.authenticated);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Or some loading spinner
  }

  return isAuthenticated ? children : <Navigate to="/admin/login" />;
};

export default PrivateRoute;
