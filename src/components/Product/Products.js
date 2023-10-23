import React, { useEffect ,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Button ,Pagination,CircularProgress,
  InputBase } from "@mui/material";
  import SearchIcon from "@mui/icons-material/Search";
  import DoneIcon from "@mui/icons-material/Done";
  import ViewDetailsIcon from "@mui/icons-material/Visibility";
  import AddToCartIcon from "@mui/icons-material/AddShoppingCart";
  import Rating from '@mui/material/Rating';
  import IconButton from "@mui/material/IconButton";
  import {toast} from 'react-toastify'
  import Snackbar from "@mui/material/Snackbar";
  import MuiAlert from "@mui/material/Alert";
  import { fetchProducts } from "../../Redux/productActions";
  import { addItemToCart } from '../../Redux/cartAction';
  import { updateTotalQuantity ,removeFromCart } from "../../Redux/cartSlice";
  import { setSearchQuery } from '../../Redux/searchSlice';
  import ProductDetails from "./ProductDetails";
  import { isAuthenticated } from "../../Context/Auth";



const Products = () => {

  const dispatch = useDispatch();
  const cartItems = useSelector( state => state.cart.items);

  const [quantity, setQuantity] = useState(1);
  const [page, setPage] = useState(1);
  const products = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.products.loading);
  const [itemsPerPage] = useState(8);
  const [searchQuery, setSearchQueryLocal] = useState('');
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);


  const filteredProducts = products.filter((product) =>
  product.name.toLowerCase().includes(searchQuery.toLowerCase())
);
const handleCloseSnackbar = () => {
  setIsSnackbarOpen(false);
};


  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQueryLocal(query);
    dispatch(setSearchQuery(query));
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);


  const handleAddToCart = (productId, quantity, productPrice, productImage, productName) => {

    if (!isAuthenticated()) {
      setIsSnackbarOpen(true);
      return;
    }

    const productInCart = cartItems.find((item) => item.ProductId === productId);

    if (productInCart) {
      dispatch(removeFromCart({ ProductId: productId, productPrice, quantity }));

    } else {
      const product = {
        ProductId: productId,
        quantity: 1,
        productPrice: productPrice,
        productImage: productImage,
        productName: productName
      };
      dispatch(addItemToCart(product));
    }
    dispatch(updateTotalQuantity());
  };


  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );



  const handlePageChange = (event, value) => {
    setPage(value);
  };

  if (loading) {
    return  (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress color="success" />
      </div>
    );
  }

  return (
<>
 <div className="container mt-5">
<div>

<Snackbar
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert onClose={handleCloseSnackbar} severity="error" elevation={6} variant="filled">
        Please login to add items to the cart.        </MuiAlert>
      </Snackbar>

<div  className="searchInput"
          style={{
            display: "flex",
            alignItems: "center",
            borderRadius: 4,
            backgroundColor: "white",
            padding: "5px 40px",
          }}
        >
          <InputBase
            placeholder="Search Amazon.in"
            inputProps={{ "aria-label": "search" }}
            style={{ paddingLeft: 10 }}
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <IconButton
            type="submit"
            aria-label="search"
            style={{ marginRight: 5 }}
          >
            <SearchIcon />
          </IconButton>

        </div>
          <hr /> <br />
</div>
        <Pagination
          count={Math.ceil(products.length / itemsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
          variant="outlined"
          shape="rounded"
          size="large"
          style={{ marginBottom: "20px" }}
        />

        <div className="row">
          {currentProducts.map((product) => (
            <div
              className="col-lg-3 col-md-4 col-sm-6 mb-4 "
              key={product.id}
    >
              <div className="card">

              <div className="card-img-top card-img-cover"
                 style={{ backgroundImage: `url(${product.image})` }} > </div>

                <div className="card-body">
           <strong className="card-title ms-3">{product.name}</strong>
              <p className="card-text ms-3">{product.description}</p>
                  <p style={{ color: "black",  marginLeft:'15px'}}> Price : $ {product.price}</p>
                <p style={{ color: "black" , marginLeft:'15px' }}> In Stock : {product.stock}</p>


                 <Rating
                  name="product-rating"
                  value={product.ratings}
                  precision={0.5}
                  style={{marginLeft:'15px'}}
                  readOnly >
                 </Rating>



                <div className="d-flex">
                  <Button
                    component={NavLink}
                    to={`/product/details/${product.id}`}
                    variant="contained"
                    color="primary"
                    startIcon={<ViewDetailsIcon />}
                    sx={{
                      backgroundColor: "#ffffff",
                      color: "black",
                      margin: "15px 10px 15px 10px",

                      "&:hover": { backgroundColor: "#edbee8" },
                    }}
                  >

                  </Button>


                  <Button
                  onClick={() => handleAddToCart(product.id , quantity, product.price , product.image , product.name)}
                    variant="contained"
                    color="primary"
                    startIcon={
                      cartItems.some((item) => item.ProductId === product.id) ? (
                        <DoneIcon style={{ color: "green" }} />
                      ) : (
                        <AddToCartIcon />
                      )
                    }

                    sx={{
                      backgroundColor: "#ffffff",
                      color: "black",
                      margin: "15px 15px 15px 15px",
                      padding:" 0px 45px",
                      "&:hover": { backgroundColor: "#1976d2" },
                       }} >
                         {cartItems.some((item) => item.ProductId === product.id) ? "Added" : " "}


                  </Button>


                </div>
              </div>


              </div>
            </div>
          ))}

    <ProductDetails product={products}></ProductDetails>
        </div>

      </div>
    </>
  );
};

export default Products;
