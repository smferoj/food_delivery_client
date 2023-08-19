import React, { useEffect, useState } from "react";
import { FaStar, FaStarHalf } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { addToCart } from "../../redux/state-slice/cartSlice";
import { errorToast } from "../../utils/TostMessage";
import axiosInstance from "../../utils/axiosInstance";
import IncreaseDecreaseButton from "../IncreaseDecrease/IncreaseDecreaseButton";
import "./MenuItemPageHero.css";
const MenuItemPageHero = () => {
  const { cartItems } = useSelector((state) => state.cart); //from requx store
  const { menuItemId } = useParams();
  const [menuItem, setMenuItem] = useState({});
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1); // [1, function
  const handleQuantityIncrease = () => {
    setQuantity(quantity + 1);
  };
  const handleQuantityDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const handleOnChange = (e) => {
    if (quantity > 1) {
      setQuantity(e.target.value);
    }
  };

  useEffect(() => {
    axiosInstance
      .get(`/GetMenuItemById/${menuItemId}`)
      .then((res) => {
        setMenuItem(res.data["data"]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [menuItemId]);
  const discountPrice = (
    menuItem.UnitPrice -
    (menuItem.UnitPrice * menuItem.Discount) / 100
  ).toFixed(2);

  const addToCartHandler = () => {
    const isItemExist = cartItems?.find((i) => i._id === menuItem._id);
    if (isItemExist) {
      errorToast("Item already exist in cart");
    } else {
      dispatch(
        addToCart({
          ...menuItem,
          subtotal:
            menuItem.Discount > 0
              ? (discountPrice * quantity).toFixed(2)
              : (menuItem.UnitPrice * quantity).toFixed(2),
          quantity: quantity,
        })
      );
    }
  };

  return (
    <div className="item-page-hero">
      <div className="container-lg">
        <div className="row">
          <div className="col-md-6 left-col">
            <div className="item-hero-img">
              <img src={menuItem?.ItemImage} alt="" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="menu-item-content d-flex flex-column row-gap-2">
              <h3>{menuItem.ItemName}</h3>
              <h3 className="price">
                <span
                  className={`${
                    menuItem?.Discount !== 0
                      ? "actual-price me-2 text-decoration-line-through"
                      : "price"
                  }`}
                >
                  {menuItem?.UnitPrice} Tk
                </span>
                {menuItem?.Discount !== 0 && discountPrice + " Tk"}
              </h3>

              <p>{menuItem?.Description}</p>
              <div className="customer-review d-flex">
                <div className="rating">
                  <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStarHalf />
                </div>
                <p className="customer-num">(1 Customer review)</p>
              </div>
              <div className="add-to-cart d-flex column-gap-3">
                <IncreaseDecreaseButton
                  handleQuantityIncrease={handleQuantityIncrease}
                  quantity={quantity}
                  handleQuantityDecrease={handleQuantityDecrease}
                  handleOnChange={handleOnChange}
                />
                <button className="btn" onClick={addToCartHandler}>
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemPageHero;
