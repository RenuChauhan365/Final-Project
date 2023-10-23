import { createSlice } from "@reduxjs/toolkit";

const updateLocalStorage = (state) => {
  localStorage.setItem("cart", JSON.stringify(state.items));
  localStorage.setItem("totalQuantity", state.totalQuantity.toString());
  localStorage.setItem("totalPrice", state.totalPrice.toString());
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: JSON.parse(localStorage.getItem("cart")) || [],
    totalQuantity: parseInt(localStorage.getItem("totalQuantity"), 10) || 0,
    totalPrice: parseFloat(localStorage.getItem("totalPrice")) || 0
  },
  reducers: {
    addToCart: (state, action) => {
      const { ProductId,quantity, productPrice , productImage ,productName } = action.payload;
      const totalPrice = quantity*productPrice

      const existingItem = state.items.find(item => item.ProductId === ProductId);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ ProductId, quantity, productPrice, productImage ,productName ,totalPrice });
      }

      state.totalQuantity += quantity;
      state.totalPrice += quantity * productPrice;

     updateLocalStorage(state);

    },
      removeFromCart: (state, action) => {
        const {ProductId} = action.payload;

        const existingItemIndex = state.items.findIndex((item) => item.ProductId === ProductId);
        if (existingItemIndex !== -1) {
          state.totalQuantity -= state.items[existingItemIndex].quantity;
          state.totalPrice -= state.items[existingItemIndex].totalPrice;
          state.items.splice(existingItemIndex, 1);
        }
           updateLocalStorage(state);
      },


      updateTotalQuantity: (state) => {
        state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
      },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      localStorage.removeItem("cart");
      updateLocalStorage(state);
    },

    updateCartItemQuantity: (state, action) => {
        state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
        state.totalPrice = state.items.reduce((total, item) => total + item.productPrice, 0);
        updateLocalStorage(state);
    }
,
    incrementQuantity: (state, action) => {
      const { ProductId } = action.payload;
      const cartItem = state.items.find((item) => item.ProductId === ProductId);

      if (cartItem) {
        cartItem.quantity += 1;
        cartItem.totalPrice += cartItem.productPrice;
        state.totalPrice += cartItem.productPrice;
      }
    },

    decrementQuantity: (state, action) => {
      const { ProductId } = action.payload;
      const cartItem = state.items.find((item) => item.ProductId === ProductId);
      if (cartItem && cartItem.quantity >= 1) {
        cartItem.quantity -= 1;
        cartItem.totalPrice -= cartItem.productPrice;
        state.totalPrice -= cartItem.productPrice;
    }},
    },
  })


export const { addToCart, removeFromCart, clearCart  ,updateTotalQuantity ,updateCartItemQuantity , incrementQuantity, decrementQuantity } = cartSlice.actions;
export const selectCartItems = state => state.cart.items;
export const selectTotalQuantity = (state) => state.cart.totalQuantity;
export const selectTotalPrice = (state) => state.cart.totalPrice;

export default cartSlice.reducer;

