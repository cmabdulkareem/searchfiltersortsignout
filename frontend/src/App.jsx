import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import AddProducts from "./components/AddProducts";
import Products from "./components/Products";
import Home from "./components/userComponents/Home";
import Shop from "./components/userComponents/Shop";
import Cart from "./components/userComponents/Cart";

function App() {
  return (
    <Routes>
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            {" "}
            <Dashboard />{" "}
          </PrivateRoute>
        }
      >
        <Route path="products" element={<Products />} />
        <Route path="addproducts" element={<AddProducts />} />
      </Route>
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin/register" element={<Register />} />

      <Route path="/" element={<Home />}>
        <Route path="shop" element={<Shop />} />
        <Route path="cart" element={<Cart />} />
      </Route>
    </Routes>
  );
}

export default App;
