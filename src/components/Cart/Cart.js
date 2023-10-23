import React , {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, List, ListItem } from "@mui/material";
import { removeItemFromCart, clearCartItems } from "../../Redux/cartAction";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { PlaceOrderAPI } from "../../Redux/OrderActions";
import { PlaceOrders } from "../../Redux/OrderSlice";
import CartItem from "./CartItem";


const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice.toFixed(2));
  const totalQuantity = cartItems.reduce( (total, item) => total + item.quantity, 0);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleCloseSnackbar = () => {
    setIsSnackbarOpen(false);
  };

  const handleRemoveFromCart = (ProductId, productPrice, quantity) => {
    dispatch(removeItemFromCart({ ProductId, productPrice, quantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCartItems());
  };

  const handleCheckout = () => {

    const shipping = {
      street: "123 Street,big house near ,san society",
      city: "Rajkot",
      zipCode: "360003",
    };

    const payload = {
      shipping: shipping,
      paymentMethod: "credit-card",
      cartItems: cartItems,
    };

    dispatch(PlaceOrderAPI(payload)).then((response) => {
      if (response && response.success) {
        dispatch(PlaceOrders({ orderData: response.data.OrderDetails }));
        navigate("/order");
      }
    });

    if (totalPrice > 0) {
      setIsModalOpen(true);
      setOrderPlaced(true);
    } else {
      setIsSnackbarOpen(true);
      setIsModalOpen(false);
    }

  };

  return (
    <div>
        <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert onClose={handleCloseSnackbar} severity="error" elevation={6} variant="filled">
          There are insufficient  items in the cart.
        </MuiAlert>
      </Snackbar>
      <div className="cartlistdiv d-flex">
        <div>
          <p className="fs-5 text-success">Total Quantity: {totalQuantity}</p>
          <p className="fs-5 text-primary">Total Price: {totalPrice}</p>
        </div>
        <div>
          <Button
            variant="contained"
            color="success"
            onClick={() => handleCheckout()}
            style={{ float: "right", marginLeft: "200px" }}
          >
            Checkout
          </Button>

          <Button
            onClick={handleClearCart}
            variant="contained"
            color="info"
            style={{ float: "right", marginLeft: "200px" }}
          >
            Clear Cart
          </Button>
        </div>
      </div>

      <List>
        {cartItems.map((item) => (
          <ListItem key={item.ProductId} className="d-flex">
            <CartItem item={item} key={item.ProductId}></CartItem>

            <Button
              onClick={() => handleRemoveFromCart(item.ProductId)}
              variant="contained"
              color="secondary"
              style={{ marginLeft: "50px" }}
            >
              Remove
            </Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Cart;
