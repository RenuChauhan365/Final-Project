import axios from 'axios';
import { getOrders  , PlaceOrders} from '../Redux/OrderSlice';



export const getOrderAPI = ( userId) => async (dispatch) => {
	try {
		const token = localStorage.getItem("auth");
		console.log("Token : ", token);


    const response = await axios.get(`${process.env.REACT_APP_API}/api/orders/history/${userId}`,
		{ headers: {
			authorization: `Bearer ${token}`
		}}

		);
    console.log("Response from server:", response.data);
    const orders = response.data;
    dispatch(getOrders({ orderData: orders }));


  } catch (error) {
		console.log(error)
  }
};



export  const PlaceOrderAPI = (payload) => async (dispatch) =>{

	try{
		const token = localStorage.getItem("auth");
		console.log("Token : ", token);

		const response = await axios.post(`${process.env.REACT_APP_API}/api/orders/place`, payload,
		{ headers: {
			authorization: `Bearer ${token}`
		}}
		);

		console.log('Order placed successfully:', response.data);
    dispatch(PlaceOrders({ orderData: response.data.OrderDetails }));
    return { success: true, data: response.data };
	}

	catch(error){
		console.log(error)
	}

}
