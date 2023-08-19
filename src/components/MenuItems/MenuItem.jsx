import { FaShoppingBag } from "react-icons/fa";
const MenuItem = ({ item, category, handleNavigate }) => {
  const discountPrice = (
    item.UnitPrice -
    (item.UnitPrice * item.Discount)/100
  ).toFixed(2);

  return (
    <div
      className="card card-item"
      style={{ width: "100%" }}
      onClick={() => handleNavigate(`/home/${item._id}`)}
    >
      <div className="card-top">
        <p className={`discount-box ${item.Discount === 0 && "d-none"}`}>
          {item.Discount}% OFF
        </p>
        <div className="card-item-img">
          <div>
            <img className="" src={item.ItemImage} alt="" />
          </div>
        </div>
      </div>
      <div className="card-body">
        <h5 className="card-title">{item.ItemName}</h5>
        <p className="cosine">{category}</p>

        <div className="card-bottom d-flex justify-content-between align-items-center">
          <p className="price">
            <span
              className={`${
                item.Discount !== 0
                  ? "actual-price me-2 text-decoration-line-through"
                  : "price"
              }`}
            >
              {item.UnitPrice} Tk
            </span>
            {item.Discount !== 0 && discountPrice + " Tk"}
          </p>
          <FaShoppingBag />
        </div>
      </div>
    </div>
  );
};
export default MenuItem;
