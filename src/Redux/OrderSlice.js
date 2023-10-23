import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders:  JSON.parse(localStorage.getItem("order")) || []
  },
  reducers: {

		getOrders: (state, action) => {
      const { orderData } = action.payload;
      state.orders.push(orderData);
      updateLocalStorage(state.orders);
    },

		PlaceOrders:(state,action) =>{
			const { orderData } = action.payload;
      state.orders.push(orderData);
      updateLocalStorage(state.orders);

		}
  },
});

const updateLocalStorage = (orders) => {
  localStorage.setItem("order", JSON.stringify(orders));
};


export const {getOrders, PlaceOrders } = orderSlice.actions;
export const selectOrderItems = state => state.order.orders;
export default orderSlice.reducer;

