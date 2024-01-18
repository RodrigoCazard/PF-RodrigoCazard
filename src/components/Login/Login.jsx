// src/components/Login.jsx
import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Breadcrumbs,
  Box,
  InputLabel,
  FormControlLabel,
} from "@mui/material";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import styled from "@emotion/styled";
import Checkbox from "@mui/material/Checkbox";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { Toaster, toast } from "sonner";
import { AuthErrorCodes } from "firebase/auth";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);

      toast.success("Inicio exitoso");

      navigate("/profile");
    } catch (error) {
      console.log(error.code);
      let errorMessage = "Error de inicio de sesión";
      if (error.code === "auth/invalid-credential") {
        errorMessage =
          "Usuario no encontrado. Por favor, verifica tus credenciales.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage =
          "Formato de correo electrónico inválido. Por favor, ingresa un correo válido.";
      }
      toast.error(errorMessage);
    }
  };

  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;

  const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
    opacity: 0.6;

    &:hover {
      text-decoration: underline;
      opacity: 1;
      color: ${primaryColor};
    }
  `;

  const [isFocused, setIsFocused] = useState({
    email: false,
    password: false,
  });

  const handleFocus = (field) => {
    setIsFocused((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field) => {
    setIsFocused((prev) => ({ ...prev, [field]: false }));
  };

  const inputStyle = {
    padding: "17px",
    fontSize: "20px",
    borderRadius: 40,
    outline: "none",
    width: "100%",
    marginBottom: "50px",
    transition: "all 0.5s ease",
  };

  const inputEmailStyle = {
    border: isFocused.email ? "2px solid #9c27b0" : "2px solid rgba(0,0,0,0.1)",
  };
  const inputPasswordStyle = {
    border: isFocused.password
      ? "2px solid #9c27b0"
      : "2px solid rgba(0,0,0,0.1)",
  };
  return (
    <Box>
      <Breadcrumbs
        sx={{ margin: "20px 0 40px 0" }}
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        <StyledLink to="/">Home page</StyledLink>
        <Typography color="text.primary">Login</Typography>
      </Breadcrumbs>
      <Box>
        <Typography variant="body1" color={"primary"} component={"p"} mb={1}>
          - Login
        </Typography>
        <Typography variant="h3" component="h2">
          Login to Your Account
        </Typography>
      </Box>
      <Box
        marginTop={10}
        marginBottom={17}
        marginX={"auto"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
        width={{ xs: "100%", sm: "80%", md: "60%", lg: "40%", xl: "40%" }}
      >
        <Box width={"100%"} mx="auto">
          <Typography variant="body2" sx={{ letterSpacing: "1px" }} mb={3}>
            Email Address
          </Typography>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="text"
            placeholder="Your Email"
            style={{ ...inputStyle, ...inputEmailStyle }}
            onFocus={() => handleFocus("email")}
            onBlur={() => handleBlur("email")}
          />
        </Box>

        <Box width={"100%"} mx="auto">
          <Typography variant="body2" sx={{ letterSpacing: "1px" }} mb={3}>
            Password
          </Typography>
          <input
            label="Contraseña"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Your Password"
            style={{ ...inputStyle, ...inputPasswordStyle }}
            onFocus={() => handleFocus("password")}
            onBlur={() => handleBlur("password")}
          />
        </Box>
        <FormControlLabel
          sx={{ marginTop: "-30px", marginRight: "auto" }}
          control={
            <Checkbox
              color="primary"
              icon={<RadioButtonUncheckedIcon fontSize="large" />}
              checkedIcon={<RadioButtonCheckedIcon fontSize="large" />}
            />
          }
          label={
            <Typography sx={{ letterSpacing: "1px" }} variant="h5">
              Remember me
            </Typography>
          }
        />
        <Button
          disableElevation
          size="large"
          variant="contained"
          onClick={handleLogin}
          fullWidth
          sx={{
            marginTop: "40px",
            fontWeight: "bold",
            padding: "12px",
            fontSize: "20px",
            borderRadius: 40,
          }}
        >
          Sign in
        </Button>

        <Box
          mt={4}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          width={"100%"}
        >
          <Button
            color="warning"
            sx={{
              borderRadius: 20,

              padding: "12px 22px",
              fontSize: 18,
              fontWeight: "bold",
              letterSpacing: 1,
            }}
            variant="outlined"
          >
            <Link
              to={"/register"}
              style={{ textDecoration: "none", color: "black" }}
            >
              <Typography variant="body2"> Create account</Typography>
            </Link>
          </Button>
          <StyledLink
            style={{
              paddingRight: "20px",
              fontSize: "1.5rem",
            }}
          >
            <Typography variant="h5">Forgot Password?</Typography>
          </StyledLink>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
