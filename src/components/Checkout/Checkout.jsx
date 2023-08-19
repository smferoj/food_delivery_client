import React, { useEffect, useState } from "react";
import { FaCheck, FaMapMarkerAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { placeOrderReq } from "../../APIRequest/OrderAPIRequest";
import { getLocation } from "../../helper/SessionHelper";
import { useAuthContext } from "../../hooks/useAuthContext";
import "./Checkout.css";

const Checkout = () => {
  const { token, user } = useAuthContext();
  const { cartItems, totalPrice } = useSelector((state) => state.cart);

  const navigate = useNavigate();

  const [orderType, setOrderType] = useState("Home Delivery");
  const [address, setAddress] = useState("");
  const [addressType, setAddressType] = useState("Home");
  const [street, setStreet] = useState("");
  const [house, setHouse] = useState("");
  const [floor, setFloor] = useState("");
  const [note, setNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash On Delivery");

  const [trmasAgreed, setTrmasAgreed] = useState(false);

  const [discountAmount, setDiscountAmount] = useState(0);

  useEffect(() => {
    let discount = 0;
    cartItems.forEach((item) => {
      console.log(item);
      discount += parseFloat(
        ((item.UnitPrice * item.Discount) / 100) * item.quantity
      );
    });
    setDiscountAmount(discount.toFixed(2));
  }, [cartItems]);

  useEffect(() => {
    if (getLocation()) {
      const { suburb, city } = getLocation() || {};
      setAddress(suburb + " " + city);
    }
  }, []);

  const handlePlaceOrder = async () => {
    const orderData = {
      customerId: user._id,
      orderItems: cartItems.map((item) => ({
        itemId: item._id,
        quantity: item.quantity,
      })),

      orderType,
      paymentMethod,
      deliveryAddress: {
        address,
        address_type: addressType,
        floor,
        house,
        lat: getLocation() ? getLocation().lat : "",
        lng: getLocation() ? getLocation().lng : "",
        road: street,
      },
      orderNote: note,
    };
    const result = await placeOrderReq(orderData, token);
    if (result) {
      navigate("/");
    }
  };

  return (
    <div className="container-lg pb-5">
      <div className="row">
        <div className="col-md-7">
          <div className="delivery-details">
            <h3>DELIVERY DETAILS</h3>
            <div className="delivery-option">
              <h4>Delivery Option</h4>
              <div className="delivery-option-form d-flex">
                <div className="form-check">
                  <input
                    name="order-type"
                    type="radio"
                    value={"Home Delivery"}
                    checked={orderType === "Home Delivery"}
                    onChange={(e) => setOrderType(e.target.value)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault1"
                  >
                    Home Delivery
                  </label>
                </div>
                <div className="form-check">
                  <input
                    onChange={(e) => setOrderType(e.target.value)}
                    type="radio"
                    name="order-type"
                    value={"Take Away"}
                    checked={orderType === "Take Away"}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault2"
                  >
                    Take Away
                  </label>
                </div>
              </div>
            </div>

            <div className="delivery-address">
              <h4>Delivery Addresses</h4>
              <div className="add-address-from">
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Set Location   "
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    disabled={!(getLocation() === null)}
                  />
                  <button className="btn z  input-group-text" id="basic-addon2">
                    Add Address
                    <FaMapMarkerAlt />
                  </button>
                </div>
              </div>
              <div className="text-center">
                <Link to="/info">View Saved Address</Link>.
              </div>
              <div className="address-selection-form">
                <div className="form-check justify-content-between align-items-center">
                  <div>
                    <h5>Selected Address</h5>
                    <p>{address}</p>
                  </div>
                  <input
                    className="float-end"
                    type="radio"
                    value={address}
                    checked={address}
                  />
                </div>
              </div>
            </div>

            <div className="additional-info">
              <h4>Additional Information</h4>
              <div className="additional-info-form row">
                <div className="col-12 mb-4">
                  <input
                    type="text"
                    placeholder="Street Number"
                    className="form-control"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="House Number"
                    value={house}
                    onChange={(e) => setHouse(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    placeholder="Floor"
                    value={floor}
                    onChange={(e) => setFloor(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="col-12 my-4">
                  <textarea
                    className="form-control"
                    placeholder="Note"
                    style={{ height: "100px" }}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          <div className="payment-option">
            <h3>Payment Options</h3>
            <div className="row">
              <div className="col-md-4">
                <div className="sp-option">
                  <button
                    type="button"
                    className="btn position-relative"
                    onClick={() => setPaymentMethod("Cash On Delivery")}
                  >
                    <img src="/images/caseon.png" alt="" />
                    <span>Cash On Delivery</span>
                    <span
                      className={`${
                        paymentMethod === "Cash On Delivery"
                          ? "position-absolute top-0 start-100 translate-middle badge rounded-pill"
                          : "d-none"
                      }`}
                    >
                      <FaCheck />
                    </span>
                  </button>
                </div>
              </div>
              <div className="col-md-4">
                <div className="sp-option">
                  <button
                    type="button"
                    className="btn position-relative"
                    onClick={() => setPaymentMethod("Digital Payment")}
                  >
                    <img src="/images/caseon.png" alt="" />
                    <span>Digital Payment</span>
                    <span
                      className={`${
                        paymentMethod === "Digital Payment"
                          ? "position-absolute top-0 start-100 translate-middle badge rounded-pill"
                          : "d-none"
                      }`}
                    >
                      <FaCheck />
                    </span>
                  </button>
                </div>
              </div>
              <div className="col-md-4">
                <div className="sp-option">
                  <button
                    type="button"
                    className="btn position-relative"
                    onClick={() => setPaymentMethod("Wallet Payment")}
                  >
                    <img src="/images/caseon.png" alt="" />
                    <span>Wallet Payment</span>
                    <span
                      className={`${
                        paymentMethod === "Wallet Payment"
                          ? "position-absolute top-0 start-100 translate-middle badge rounded-pill"
                          : "d-none"
                      }`}
                    >
                      <FaCheck />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-5">
          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="checkout-item">
              {cartItems.map((item) => (
                <div
                  className="cart-item d-flex gap-md-3 align-items-center mb-2"
                  key={cartItems._id}
                >
                  <div className="cart-item-image">
                    <img className="img-fluid" src={item.ItemImage} alt="" />
                  </div>
                  <div className="cart-item-details">
                    <h3>{item.ItemName}</h3>
                    <span>Qty: {item.quantity}</span>
                    <div className="quantity-management d-flex align-items-center gap-2 mt-2">
                      <p>${item.subtotal}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="amount">
              <div className="amount-item d-flex justify-content-between">
                <p>Subtotal</p>
                <h4>${totalPrice}</h4>
              </div>
              <div className="amount-item d-flex justify-content-between">
                <p>Discount</p>
                <h4>${discountAmount}</h4>
              </div>
              <div className="amount-item d-flex justify-content-between">
                <p>VAT/TAX (15% Excluded)</p>
                <h4>$0</h4>
              </div>
              <div className="amount-item d-flex justify-content-between">
                <p>Delivery Fee</p>
                <h4>Free</h4>
              </div>
              <div className="total">
                <div className="amount-item d-flex justify-content-between">
                  <p>Total</p>
                  <h4>${totalPrice}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="place-order-area text-center">
              <div className="form-check d-flex justify-content-center align-items-center  text-center">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  onChange={() => setTrmasAgreed(!trmasAgreed)}
                  checked={trmasAgreed}
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  I agree that placing the order places me under{" "}
                  <Link to="/terms-and-condition">Terms and Conditions</Link> &{" "}
                  <Link to="/privacy-policy">Privacy Policy</Link>
                </label>
              </div>
              <button
                className="btn"
                disabled={!trmasAgreed}
                onClick={handlePlaceOrder}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
