import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate  ,NavLink} from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { useAuth } from "../../Context/Auth";


const Header = () => {

  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  console.log("totalQuantity is ", totalQuantity);
  const navigate = useNavigate();

  const [auth, setAuth] = useAuth();
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);

  const handleLogout = () => {
    setShowLogoutAlert(true);
  };

  useEffect(() => {
    if (totalQuantity) {
      localStorage.setItem("totalQuantity", totalQuantity);
    } else {
      localStorage.setItem("totalQuantity", 0);
    }
  }, [totalQuantity]);

  const confirmLogout = () => {
    setAuth({
      user: null,
      token: "",
    });

    localStorage.removeItem("auth");
    localStorage.removeItem("userData");
    localStorage.removeItem("totalPrice");
    localStorage.removeItem("cart");
    localStorage.removeItem("productDetails");
    localStorage.removeItem("totalQuantity");

    navigate("/auth/login");
    setShowLogoutAlert(false);
  };

  const handleClose = () => {
    setShowLogoutAlert(false);
  };

  return (
    <>
      <div className="header">
        <AppBar position="static" sx={{ backgroundColor: "black" }}>
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography variant="h6" component="div">
              <img
                src="https://zeevector.com/wp-content/uploads/Amazon-Logo-White.png"
                alt="photo"
                style={{ width: "100px", height: "auto" }}
              ></img>
            </Typography>

            <div style={{ display: "flex" }}>
              <NavLink
                to="/"
                color="inherit"
                className="nav-link"
                style={{
                  textDecoration: "none",
                  color: "white",
                  marginLeft: 20,
                }}
              >
                Home
              </NavLink>

              <NavLink
                className="nav-link"
                to="/product"
                color="inherit"
                style={{
                  textDecoration: "none",
                  color: "white",
                  marginLeft: 20,
                }}
              >
                Product
              </NavLink>

              {!auth.token ? (
                <>
                  <NavLink
                    className="nav-link"
                    to="/auth/register"
                    color="inherit"
                    style={{
                      textDecoration: "none",
                      color: "white",
                      marginLeft: 20,
                      marginRight: 2,
                    }}
                  >
                    SignUp /
                  </NavLink>
                  <NavLink
                    to="/auth/login"
                    className="nav-link"
                    color="inherit"
                    style={{
                      textDecoration: "none",
                      color: "white",
                      marginLeft: 1,
                    }}
                  >
                    Login
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    className="nav-link"
                    to="/order"
                    color="inherit"
                    style={{
                      textDecoration: "none",
                      color: "white",
                      marginLeft: 20,
                    }}
                  >
                    Order
                  </NavLink>
                  <NavLink
                    onClick={handleLogout}
                    className="nav-link"
                    color="inherit"
                    style={{
                      textDecoration: "none",
                      color: "white",
                      marginLeft: 20,
                    }}
                  >
                    Logout
                  </NavLink>

                  <NavLink
                    to="/cart"
                    color="inherit"
                    className="nav-link"
                    style={{
                      textDecoration: "none",
                      color: "white",
                      marginLeft: 20,
                    }}
                  >
                    <IconButton color="inherit">
                      <ShoppingCartIcon />
                    </IconButton>
                    <span className="cart-quantity" style={{ marginLeft: 5 }}>
                      {totalQuantity}
                    </span>
                  </NavLink>
                </>
              )}
            </div>

            <Dialog open={showLogoutAlert} onClose={handleClose}>
              <DialogTitle>Logout Confirmation</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to logout?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  No
                </Button>
                <Button onClick={confirmLogout} color="primary">
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
};

export default Header;
