import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { Button, Card, CardContent, Typography } from "@mui/material";
import Rating from '@mui/material/Rating';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ProductDetails = () => {
  const { pid } = useParams();
  const products = useSelector((state) => state.products.products);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const productFromStore = products.find(
      (product) => product.id === parseInt(pid, 10)
    );

    if (productFromStore) {
      setProduct(productFromStore);
      localStorage.setItem("productDetails", JSON.stringify(productFromStore));
    } else {
      const savedProduct = JSON.parse(localStorage.getItem("productDetails"));
      if (savedProduct && savedProduct.id === parseInt(pid, 10)) {
        setProduct(savedProduct);
      }
    }
  }, [pid, products]);

  if (!product) {

    return  (
      <div className="text-danger" style={{ fontSize: '36px', fontWeight: 'bold', textAlign: 'center' }}>
      Product not found
    </div>
    )

  }

  return (
    <>

  <div className="Product_d-flex">
  <div className="productDetailsRemove">
   <Button className="remove-button">
        <NavLink to='/product'>
          <ArrowBackIcon />
        </NavLink>
      </Button>
   </div>

 <div className="productDetailsImg">
 <img src={product.image} alt="img" />
   </div>

   <div className="productDetailsInfo">


   <h1 variant="h5" component="div">
          {product.name}
        </h1>

        <p variant="body2" color="text.secondary">
          {product.description}
        </p>

        <p variant="body2" style={{ color: "black", marginLeft: '15px' }}>
          Price: ${product.price}
        </p>

        <p variant="body2" color="text.secondary" style={{ color: "black", marginLeft: '15px' }}>
          Stock: {product.stock}
        </p>

        <Rating
          name="product-rating"
          value={product.ratings}
          precision={0.5}
          readOnly
        />
      </div>




   </div>



    </>
  );

};

export default ProductDetails;
