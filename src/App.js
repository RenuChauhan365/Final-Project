import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import {Routes, Route } from "react-router-dom";
import {ToastContainer } from "react-toastify";
import ProductDetails from "./components/Product/ProductDetails";
import Product from "./components/Product/Products";
import Header from "./components/Layout/Header";
import Cart from "./components/Cart/Cart";
import Footer from "./components/Layout/Footer";
import Order from './components/Order/Order';
import OrderList from './components/Order/OrderList';
import { useAuth } from "./Context/Auth";
import HomePage from "./Pages/HomePage";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import Pagenotfound from "./Pages/Pagenotfound";


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/auth/register" element={<Register />}></Route>
        <Route path="/auth/login" element={<Login />}></Route>
        <Route path="/product" element={<Product />}></Route>
        <Route path="/product/details/:pid" element={<ProductDetails />} />
        <Route path="/order-list" element={<OrderList/>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order"  element={<Order/>} />
        <Route path="*" element={<Pagenotfound />}></Route>
      </Routes>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
