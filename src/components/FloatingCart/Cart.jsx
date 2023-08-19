import React, { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearCart } from "../../redux/state-slice/cartSlice";
import "./Cart.css";
import CartItem from "./CartItem";

const Cart = () => {
  const { cartItems, totalPrice, numOfItems } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();
  console.log("cartItems", cartItems);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const clearAllHandler = () => {
    dispatch(clearCart());
  };
  return (
    <div className="cart-button-container">
      <button
        className="btn position-relative cart-button"
        onClick={handleShow}
      >
        <FaShoppingCart />
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill">
          {numOfItems}
        </span>
      </button>

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {numOfItems === 1 ? `${numOfItems} itme` : `${numOfItems} items`}{" "}
            item in your cart
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="cart-item-container">
            {cartItems.map((item) => (
              <CartItem item={item} key={item._id} />
            ))}
          </div>
          <div className="tatal-price">
            <h3>Total: ${totalPrice}</h3>
          </div>
          <div className="button-group text-center">
            <button className="btn me-2" onClick={clearAllHandler}>
              Clear All
            </button>
            <Link to="/checkout" className="btn" onClick={handleClose}>
              Checkout
            </Link>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default Cart;
