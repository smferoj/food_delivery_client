import { createSlice } from "@reduxjs/toolkit";

const { cartItems, totalPrice, numOfItems } = localStorage.getItem(
  "cartDetails"
)
  ? JSON.parse(localStorage.getItem("cartDetails"))
  : { cartItems: [], totalPrice: 0, numOfItems: 0 };

const initialState = {
  cartItems: cartItems,
  totalPrice: totalPrice,
  numOfItems: numOfItems,
};

function calculateTotalPrice(cartItems) {
  let totalPrice = 0;
  cartItems?.forEach((item) => {
    totalPrice += parseFloat(item.subtotal);
  });
  console.log(typeof totalPrice);
  return totalPrice.toFixed(2);
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      console.log(state);
      const item = action.payload;
      const isItemExist = state.cartItems?.find((i) => i._id === item._id);
      if (!isItemExist) {
        state.cartItems = [...state.cartItems, item];
        state.numOfItems += 1;
        state.totalPrice = calculateTotalPrice(state.cartItems);
      }
      localStorage.setItem(
        "cartDetails",
        JSON.stringify({
          numOfItems: state.cartItems.length,
          cartItems: state.cartItems,
          totalPrice: calculateTotalPrice(state.cartItems),
        })
      );
    },
    clearCart: (state, action) => {
      state.cartItems = [];
      state.numOfItems = 0;
      state.totalPrice = 0;
      localStorage.setItem(
        "cartDetails",
        JSON.stringify({
          numOfItems: 0,
          cartItems: [],
          totalPrice: 0,
        })
      );
    },
    increaseQuantity: (state, action) => {
      console.log(action.payload);
      const { _id } = action.payload;

      state.cartItems = state.cartItems?.map((i) => {
        if (i._id === _id) {
          const discountPrice = i.UnitPrice - (i.UnitPrice * i.Discount) / 100;

          i.quantity += 1;
          i.subtotal =
            i.Discount > 0
              ? (discountPrice * i.quantity).toFixed(2)
              : (i.UnitPrice * i.quantity).toFixed(2);
          return i;
        }
        return i;
      });

      state.totalPrice = calculateTotalPrice(state.cartItems);

      localStorage.setItem(
        "cartDetails",
        JSON.stringify({
          numOfItems: state.cartItems.length,
          cartItems: state.cartItems,
          totalPrice: calculateTotalPrice(state.cartItems),
        })
      );
    },
    decreaseQuantity: (state, action) => {
      const { _id, currentQuantity } = action.payload;
      if (currentQuantity === 0) {
        state.cartItems = state.cartItems?.filter((i) => i._id !== _id);
        state.numOfItems -= 1;
      } else {
        state.cartItems = state.cartItems?.map((i) => {
          if (i._id === _id) {
            const discountPrice =
              i.UnitPrice - (i.UnitPrice * i.Discount) / 100;

            i.quantity -= 1;
            i.subtotal =
              i.Discount > 0
                ? (discountPrice * i.quantity).toFixed(2)
                : (i.UnitPrice * i.quantity).toFixed(2);
            return i;
          }
          return i;
        });
      }

      state.totalPrice = calculateTotalPrice(state.cartItems);

      localStorage.setItem(
        "cartDetails",
        JSON.stringify({
          numOfItems: state.cartItems.length,
          cartItems: state.cartItems,
          totalPrice: calculateTotalPrice(state.cartItems),
        })
      );
    },
    changeQuantity: (state, action) => {
      const { _id, currentQuantity } = action.payload;
      if (currentQuantity === 0) {
        state.cartItems = state.cartItems?.filter((i) => i._id !== _id);
      } else {
        state.cartItems = state.cartItems?.map((i) => {
          if (i._id === _id) {
            const discountPrice =
              i.UnitPrice - (i.UnitPrice * i.Discount) / 100;

            i.quantity = currentQuantity;
            i.subtotal =
              i.Discount > 0
                ? discountPrice * i.quantity
                : i.UnitPrice * i.quantity;
            return i;
          }
          return i;
        });
      }

      state.totalPrice = calculateTotalPrice(state.cartItems);

      localStorage.setItem(
        "cartDetails",
        JSON.stringify({
          numOfItems: state.cartItems.length,
          cartItems: state.cartItems,
          totalPrice: calculateTotalPrice(state.cartItems),
        })
      );
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  changeQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
