import { errorToast, successToast } from "../utils/TostMessage";
import axiosInstance from "../utils/axiosInstance";

export const placeOrderReq = async (data, token) => {
  try {
    const response = await axiosInstance.post("/placeOrder", data, {
      headers: {
        token: token,
      },
    });
    if (response.status === 200 && response.data["data"].status === "success") {
      successToast("Order placed successfully!");
      return true;
    } else {
      errorToast("Something went wrong! Try again.");
      return false;
    }
  } catch (error) {
    errorToast("Something went wrong! Try again.");
    return false;
  }
};
