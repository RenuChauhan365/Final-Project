import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchProductsStart(state , action) {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess(state, action) {
      state.loading = false;
      state.error = null; 
      state.products = action.payload;
    },
    fetchProductsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

  },
});

export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
} = productSlice.actions;

export default productSlice.reducer;
