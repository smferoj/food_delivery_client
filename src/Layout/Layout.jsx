import React from "react";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cart from "../components/FloatingCart/Cart";
import Footer from "../components/Footer";
import Menu from "../components/Menu";

const Layout = () => {
  return (
    <div className="main-layout">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Menu />
      <Cart />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
