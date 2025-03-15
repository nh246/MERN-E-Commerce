import { createSlice } from "@reduxjs/toolkit";
// import Swal from './../../../../node_modules/sweetalert2/src/sweetalert2';
import Swal from "sweetalert2";

const initialState = {
  products: [],
  selectedItems: 0,
  totalPrice: 0,
};

const calculateCartTotals = (products) => {
  const selectedItems = products.reduce(
    (total, product) => total + product.quantity,
    0
  );
  const totalPrice = products.reduce(
    (total, product) => total + product.quantity * product.price,
    0
  );
  return { selectedItems, totalPrice };
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const isExist = state.products.find(
        (product) => product._id === action.payload._id
      );
      if (!isExist) {
        state.products.push({ ...action.payload, quantity: 1 });
        alert("Product added to cart");
      } else {
        Swal.fire({
          title: "Error!",
          text: "Product already addede to cart",
          icon: "error",
          confirmButtonText: "It's Ok",
        });
      }
      const totals = calculateCartTotals(state.products);
      state.selectedItems = totals.selectedItems;
      state.totalPrice = totals.totalPrice;
    },
    updateQuantity: (state, action) => {
      const product = state.products.find(
        (item) => item._id === action.payload.id
      );
      if (product) {
        if (action.payload.type === "increment") {
          product.quantity += 1;
        } else if (
          action.payload.type === "decrement" &&
          product.quantity > 1
        ) {
          product.quantity -= 1;
        }
      }
      const totals = calculateCartTotals(state.products);
      state.selectedItems = totals.selectedItems;
      state.totalPrice = totals.totalPrice;
    },
    removeFromCart: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload.id
      );
      const totals = calculateCartTotals(state.products);
      state.selectedItems = totals.selectedItems;
      state.totalPrice = totals.totalPrice;
    },
    claerCart: (state) => {
        Object.assign(state, initialState)
    }
  },
});

export const { addToCart, updateQuantity , removeFromCart , claerCart } = cartSlice.actions;

export default cartSlice.reducer;
