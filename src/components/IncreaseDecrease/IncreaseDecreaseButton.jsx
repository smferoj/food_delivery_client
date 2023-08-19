import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

const IncreaseDecreaseButton = ({
  handleQuantityDecrease,
  handleOnChange,
  handleQuantityIncrease,
  quantity,
}) => {
  return (
    <div className="increase-decrease d-flex">
      <button className="btn decrease" onClick={handleQuantityDecrease}>
        <FaMinus />
      </button>
      <input type="number" value={quantity} onChange={handleOnChange} />
      <button className="btn increase" onClick={handleQuantityIncrease}>
        <FaPlus />
      </button>
    </div>
  );
};

export default IncreaseDecreaseButton;
