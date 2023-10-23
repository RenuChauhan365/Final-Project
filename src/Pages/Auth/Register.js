import React, { useState ,useEffect} from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import axios from "axios";
const defaultTheme = createTheme();

export default function Register() {
  const [firstName, setFirstName] = useState(localStorage.getItem("firstName") || "");
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [password, setPassword] = useState(localStorage.getItem("password") || "");
  const [lastName, setLastName] = useState(localStorage.getItem("lastName") || "");
  const [fieldErrors, setFieldErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Add this line for show/hide password
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);


  const navigate = useNavigate();
  const handleCloseSnackbar = () => {
    setIsSnackbarOpen(false);
  };


  const validateEmail = async (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Invalid email address";
    }
  };


  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return passwordRegex.test(password)

  };

  const handleSubmit = async (e) => {
    e.preventDefault();









    const errors = {};

    if (!validateEmail(email)) {
      errors.email = "Invalid email address";
    }

    if (!validatePassword(password)) {
      errors.password = "Password must contain  uppercase,lowercase,number,special character.";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }



    try {
      const userData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/auth/register`,
        userData
      );

      console.log(response.data.exi);

      if (response.data.success) {
        toast.success(" Registration Successful, please verify your email.");
        localStorage.removeItem("firstName");
        localStorage.removeItem("email");
        localStorage.removeItem("password");
        localStorage.removeItem("lastName");
        navigate("/auth/login");
      } else {

          setFieldErrors({});
          toast.error("Registration failed");

      }
    } catch (error) {
      console.error(error);
      console.log(error.response.data.message)
      const msg  =error.response.data.message

      if(msg){
        setIsSnackbarOpen(true);
      }
else{
  setIsSnackbarOpen(false);

}
      //toast.error(msg);

    }
  };


  useEffect(() => {
    localStorage.setItem("firstName", firstName);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    localStorage.setItem("lastName", lastName);
  }, [firstName, email, password, lastName]);



  useEffect(() => {
    setIsFormValid(  firstName.trim() !== "" && lastName.trim() !== "" &&  email.trim() !== "" && password.trim() !== "");
  }, [ firstName, lastName, email, password]);


  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert onClose={handleCloseSnackbar} severity="error" elevation={6} variant="filled">
        Email already exists. Please use a different email address
         </MuiAlert>
      </Snackbar>

        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop:3
          }}
        >
          <NavLink
            to="/"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src="https://i0.wp.com/www.columbia-pike.org/wp-content/uploads/2021/12/amazon-logo-vector-png-vector-png-free-amazon-logos-705-1.jpeg?ssl=1"
              alt="photo"
              style={{ width: "100px", height: "auto" }}
            />
            <span style={{ marginLeft: "0%", color: "black" }}>.In</span>
          </NavLink>

          <Typography component="h1" variant="h5" style={{ textAlign: "left" }}>
            Create Account
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  onBlur={() => {
                    if (!firstName) {
                      setFieldErrors((prevErrors) => ({
                        ...prevErrors,
                        firstName: "First Name is required.",
                      }));
                    } else {
                      setFieldErrors((prevErrors) => ({
                        ...prevErrors,
                        firstName: undefined,
                      }));
                    }
                  }}
                  error={fieldErrors.firstName !== undefined}
                  helperText={fieldErrors.firstName}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  onBlur={() => {
                    if (!lastName) {
                      setFieldErrors((prevErrors) => ({
                        ...prevErrors,
                        lastName: "Last Name is required.",
                      }));
                    } else {
                      setFieldErrors((prevErrors) => ({
                        ...prevErrors,
                        lastName: undefined,
                      }));
                    }
                  }}
                  error={fieldErrors.lastName !== undefined}
                  helperText={fieldErrors.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}

                  onBlur={async () => {
                    const errorMessage = await validateEmail(email);
                    setFieldErrors((prevErrors) => ({
                      ...prevErrors,
                      email: errorMessage,
                    }));
                  }}
                  error={fieldErrors.email !== undefined}
                  helperText={fieldErrors.email}
                    />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ?  "password": "text"}
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}

                  onBlur={() => {
                    if (!password) {
                      setFieldErrors((prevErrors) => ({
                        ...prevErrors,
                        password: "Password is required.",
                      }));
                    } else {
                      setFieldErrors((prevErrors) => ({
                        ...prevErrors,
                        password: undefined,
                      }));
                    }
                  }}

                  error={fieldErrors.password !== undefined}
                  helperText={fieldErrors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "yellow", color: "black" }}
              disabled={!isFormValid}
            >
              Continue
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <NavLink to="/auth/login" variant="body2">
                  Already have an account? Sign in
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}