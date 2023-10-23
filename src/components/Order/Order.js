import React ,{useState} from "react";
import { useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useDispatch } from "react-redux";
import {
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogContent,
  Typography,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {clearCartItems} from "../../Redux/cartAction";
const PaymentSuccessGif = require("./paymentSuccess.gif");

const useStyles = styled((theme) => ({

  orderListing: {
    backgroundColor: "#4caf50",
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
    "&:hover": {
      backgroundColor: "#45a049",
    },
  },
  listItem: {
  },
}));


const OrderListing = () => {
const dispatch = useDispatch();
  const classes = useStyles();

  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalPrice = useSelector((state) => state.cart.totalPrice.toFixed(2));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);



  const handleCloseSnackbar = () => {
    setIsSnackbarOpen(false);
  };

  const handlePlaceOrder = () => {
    if (totalPrice > 0) {
      setIsModalOpen(true);
      setOrderPlaced(true);
    } else {
      setIsSnackbarOpen(true);
      setIsModalOpen(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (orderPlaced) {
    setTimeout(() => {
      dispatch(clearCartItems());
    }, 2000);
  }

  console.log("cartItems in order listing " , cartItems)
  return (

    <div className={classes.orderListing}>
  <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert onClose={handleCloseSnackbar} severity="error" elevation={6} variant="filled">
          There are no items in the cart or the total price is insufficient.
        </MuiAlert>
      </Snackbar>


      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogContent>
          <img src={PaymentSuccessGif} alt="Payment Success" />
          <Typography variant="h6" align="center" gutterBottom>
            Payment Success!
          </Typography>
          <Typography variant="body1" align="center">
            Thank you for your order. Payment was successful.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: 20 }}
            onClick={handleCloseModal}
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>


      <h2  className="text-center"
      style={{
        border: "2px solid #000",
        boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
        backgroundColor: "#f0f0f0",
        padding: "10px" // Optional: Adding some padding for better spacing
      }}>Order History</h2>
      <div className="d-flex flex-column">
      <p>Total Quantity: {totalQuantity}</p>
      <p>Total Price: ${totalPrice}</p>

      <Button className="btn   text-dark fs-6"
        onClick={handlePlaceOrder}
        style={{
          backgroundColor: '#fcd7e7',
        fontWeight:'bold',
        width:'300px',
          border: '2px solid black',
          boxShadow: '2px 2px 4px white',
          borderRadius: '4px',
        }}>

      {orderPlaced ? "Order Placed" : "Place Order"}
       </Button>
       <hr />
       <br />

       </div>

      <List>
        {cartItems.map((item) => (
          <ListItem key={item.product_id} className={classes.listItem}>

     <img src={item.productImage} alt="productImage" height='90px' />


            <ListItemText
              primary={item.productName}
              secondary={`Quantity: ${item.quantity} - Price: $${item.productPrice}`}
            />
          </ListItem>
        ))}
      </List>

    </div>

  );
};

export default OrderListing;
