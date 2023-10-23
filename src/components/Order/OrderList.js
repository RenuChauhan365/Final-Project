import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderAPI } from '../../Redux/OrderActions';

const OrderList = ({ userId }) => {
  const dispatch = useDispatch();
  const orders = useSelector(getOrderAPI);


  useEffect(() => {
    dispatch(getOrderAPI(userId));
  }, [dispatch, userId]);


  return (
    <div>
      <h1>Order List</h1>
    
      {orders.map((order) => (
        <div key={order.id}>
          <p>Order ID: {order.id}</p>
          <p>Status: {order.status}</p>
          <p>Total Price: ${order.total_price}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default OrderList;
