import React from "react";
import {
  Card,
  Button,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity } from "../../Redux/cartSlice";



const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleIncrementQuantity = (ProductId) => {
    dispatch(incrementQuantity({ ProductId }));
  };

  const handleDecrementQuantity = (ProductId) => {
    dispatch(decrementQuantity({ ProductId }));
  };

  return (
    <>


      <div className="d-flex">

            <div
              className="CartItemImg"
              style={{ backgroundImage: `url(${item.productImage})` }}>
            </div>

<div className="middleContent">


            <Typography variant="h5" >
              {item.productName}
            </Typography>

            <Typography variant="body2" color="text.secondary"  className="ms-5">
              Price: $ {item.productPrice}
            </Typography>

          <CardActions className="ms-5">
            <Button
              size="small"
              color="secondary"
              variant="outlined"
              onClick={() => handleIncrementQuantity(item.ProductId)}
            >
              +
            </Button>
            &nbsp; {item.quantity}
            <Button
              size="small"
              color="secondary"
              variant="outlined"
              onClick={() => handleDecrementQuantity(item.ProductId)}
            >
              -
            </Button>
          </CardActions>
          </div>
      </div>

    </>
  );
};

export default CartItem;
