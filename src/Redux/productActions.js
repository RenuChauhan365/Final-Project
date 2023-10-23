import axios from 'axios';

import {fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure
} from './productSlice'

export const fetchProducts = () =>

async (dispatch) => {
  dispatch(fetchProductsStart());
  try {
    const response = await axios.get(`${process.env.REACT_APP_API}/api/products`);
    dispatch(fetchProductsSuccess(response.data.products));
  } catch (error) {
    dispatch(fetchProductsFailure(error.message));
  }
};

