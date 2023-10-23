import React, { useState  , useEffect} from "react";
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
import axios from "axios";
import { useAuth } from "../../Context/Auth";

const defaultTheme = createTheme();

export default function SignIn() {
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [password, setPassword] = useState(localStorage.getItem("password") || "");
  const [showPassword, setShowPassword] = useState(false); // Add this line for show/hide password



  const [auth, setAuth] = useAuth();
  const [fieldErrors, setFieldErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const navigate = useNavigate();


  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = {};

    if (!validateEmail(email)) {
      errors.email = "Invalid email address";
    }

    if (!validatePassword(password)) {
      errors.password = "Password must be at least 6 characters long";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    const userData = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/auth/login`,
        userData
      );

      if (response.data.success) {
        localStorage.removeItem("email");
        localStorage.removeItem("password");

        setAuth({
          token: response.data.token
        });
        console.log(response.data);

        localStorage.setItem("auth", JSON.stringify(response.data.token));
        console.log(auth);
        toast.success(response.data.message);
        navigate("/");
      } else {
        if (response.data.error) {
          toast.error(response.data.message);
        }

        if (response.data.errors) {
          const errorObj = {};
          response.data.errors.forEach((error) => {
            errorObj[error.field] = error.message;
          });
          setFieldErrors(errorObj);
        } else {
          setFieldErrors({});
          toast.error("Login failed");
        }
      }
    } catch (error) {
      toast.error("Invalid credentials");
    }
  };



  useEffect(() => {
    setIsFormValid(email.trim() !== "" && password.trim() !== "");
  }, [ email, password]);



  useEffect(() => {
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
  }, [ email, password]);


  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
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

          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => {
                if (!email) {
                  setFieldErrors((prevErrors) => ({
                    ...prevErrors,
                    email: "Email is required.",
                  }));
                } else {
                  setFieldErrors((prevErrors) => ({
                    ...prevErrors,
                    email: undefined,
                  }));
                }
              }}
              error={fieldErrors.email !== undefined}
              helperText={fieldErrors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ?  "password": "text"}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => {
                if (!password) {
                  setFieldErrors((prevErrors) => ({
                    ...prevErrors,
                    password: "password is required.",
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

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "yellow", color: "black" }}
              disabled={!isFormValid}
            >
              Continue
            </Button>
            <Grid container>

              <Grid item>
                <NavLink to="/auth/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
