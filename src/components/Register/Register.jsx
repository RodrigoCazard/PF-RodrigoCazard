import React, { useState, useMemo } from "react";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { MuiTelInput } from "mui-tel-input";
import Select from "react-select";

import { toast } from "sonner";

import countryList from "react-select-country-list";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import {
  Typography,
  Button,
  Breadcrumbs,
  Checkbox,
  FormControlLabel,
  Box,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../services/config";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [termsAndConditionsChecked, setTermsAndConditionsChecked] =
    useState(false);

  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  const [loading, setLoading] = useState(false);

  const changeHandler = (country) => {
    setCountry(country);
  };
  const styleIcon = {
    backgroundColor: "white",
    opacity: 0.8,
    position: "absolute",
    right: "20px",
    top: "22%",
    transform: "translateY(-25%)",
    cursor: "pointer",
  };
  const handleSetShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleSetShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const addUserToFirestore = async (userData) => {
    try {
      const userCollectionRef = collection(db, "users");
      await addDoc(userCollectionRef, userData);
      console.log("Usuario agregado a Firestore");
    } catch (error) {
      console.error("Error al agregar usuario a Firestore:", error);
    }
  };

  const handleRegister = async () => {
    setLoading(true);
    if (
      !displayName ||
      !email ||
      !phone ||
      !address ||
      !country ||
      !password ||
      !confirmPassword
    ) {
      toast.error("Por favor, completa todos los campos.");
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      setLoading(false);
      return;
    }
    if (!termsAndConditionsChecked) {
      toast.error("Debes aceptar los términos y condiciones.");
      setLoading(false);
      return;
    }

    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredential.user, {
        displayName: displayName,
      });

      const userData = {
        uid: userCredential.user.uid,
        email: email,
        displayName: displayName,
        phone: phone,
        address: address,
        country: country,
      };

      await addUserToFirestore(userData);

      toast.success("Inicio exitoso");
    } catch (error) {
      console.log(error.message);
      let errorMessage = "Error de inicio de sesión";
      if (error.code === "auth/invalid-email") {
        errorMessage =
          "Formato de correo electrónico inválido. Por favor, ingresa un correo válido.";
      }
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "Repetido perro";
      }

      toast.error(errorMessage);
    } finally {
      setLoading(false);
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

  const inputStyle = {
    padding: "17px 20px",
    fontSize: "20px",
    borderRadius: 40,
    outline: "none",
    width: "100%",
    marginBottom: "50px",
    transition: "all 0.5s ease",
  };

  const [isFocused, setIsFocused] = useState({
    email: false,
    password: false,
    displayName: false,
    phone: false,
    address: false,
    country: false,
  });

  const inputEmailStyle = {
    border: isFocused.email ? "2px solid #9c27b0" : "2px solid rgba(0,0,0,0.1)",
  };
  const inputPasswordStyle = {
    border: isFocused.password
      ? "2px solid #9c27b0"
      : "2px solid rgba(0,0,0,0.1)",
  };
  const inputCountryStyle = {
    border: isFocused.country
      ? "2px solid #9c27b0"
      : "2px solid rgba(0,0,0,0.1)",
  };
  const inputConfirmPasswordStyle = {
    border: isFocused.confirmPassword
      ? "2px solid #9c27b0"
      : "2px solid rgba(0,0,0,0.1)",
  };
  const inputDisplayNameStyle = {
    border: isFocused.displayName
      ? "2px solid #9c27b0"
      : "2px solid rgba(0,0,0,0.1)",
  };
  const inputPhoneStyle = {
    border: isFocused.phone ? "2px solid #9c27b0" : "2px solid rgba(0,0,0,0.1)",
  };
  const inputAddressStyle = {
    border: isFocused.address
      ? "2px solid #9c27b0"
      : "2px solid rgba(0,0,0,0.1)",
  };

  const handleFocus = (field) => {
    setIsFocused((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field) => {
    setIsFocused((prev) => ({ ...prev, [field]: false }));
  };

  const countries = countryList().getData();

  return (
    <>
      {loading && (
        <Backdrop
          open={loading}
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <CircularProgress color="primary" />
        </Backdrop>
      )}
      <Breadcrumbs
        sx={{ margin: "20px 0 40px 0" }}
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        <StyledLink to="/">Home page</StyledLink>
        <StyledLink to="/login">Login</StyledLink>
        <Typography color="text.primary">Register</Typography>
      </Breadcrumbs>
      <Box>
        <Typography variant="body1" color={"primary"} component={"p"} mb={1}>
          - Sign Up
        </Typography>
        <Typography variant="h3" component="h2">
          Create Account
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
        width={{ xs: "100%", sm: "80%", md: "60%", lg: "55%", xl: "50%" }}
      >
        <Box width={"100%"} mx="auto">
          <Typography variant="body2" sx={{ letterSpacing: "1px" }} mb={3}>
            Full name
          </Typography>
          <input
            type="text"
            value={displayName}
            onChange={(e) => {
              const inputValue = e.target.value.replace(/[^A-Za-z]/g, "");
              setDisplayName(inputValue);
            }}
            placeholder="Full name"
            style={{ ...inputStyle, ...inputDisplayNameStyle }}
            onFocus={() => handleFocus("displayName")}
            onBlur={() => handleBlur("displayName")}
          />
        </Box>
        <Box width={"100%"} mx="auto">
          <Typography variant="body2" sx={{ letterSpacing: "1px" }} mb={3}>
            Email Address
          </Typography>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Your Email"
            style={{ ...inputStyle, ...inputEmailStyle }}
            onFocus={() => handleFocus("email")}
            onBlur={() => handleBlur("email")}
          />
        </Box>

        <Box width={"100%"} mx="auto">
          <Typography variant="body2" sx={{ letterSpacing: "1px" }} mb={3}>
            Phone number
          </Typography>
          <MuiTelInput
            placeholder="Enter phone number"
            value={phone}
            onChange={(value) => setPhone(value)}
            style={{ ...inputStyle, ...inputPhoneStyle }}
            onFocus={() => handleFocus("phone")}
            onBlur={() => handleBlur("phone")}
          />
        </Box>

        <Box width={"100%"} mx="auto">
          <Typography variant="body2" sx={{ letterSpacing: "1px" }} mb={3}>
            Address
          </Typography>
          <input
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            type="text"
            placeholder="Address"
            style={{ ...inputStyle, ...inputAddressStyle }}
            onFocus={() => handleFocus("address")}
            onBlur={() => handleBlur("address")}
          />
        </Box>

        <Box width={"100%"} mx="auto">
          <Typography variant="body2" sx={{ letterSpacing: "1px" }} mb={3}>
            Country
          </Typography>
          <Select
            value={country}
            onFocus={() => handleFocus("country")}
            onBlur={() => handleBlur("country")}
            onChange={changeHandler}
            options={countries}
            placeholder="Select Country"
            isClearable={true}
            styles={{
              option: (base) => ({
                ...base,
                fontSize: "20px",
              }),

              control: (provided) => ({
                ...provided,
                ...inputStyle,
                cursor: "pointer",

                "&:hover": {
                  border: "2px solid rgba(0,0,0,0.1)",
                },
                transition: "all 0.5s ease",
                border: "2px solid rgba(0,0,0,0.1)",
                padding: "10px",
                ...inputCountryStyle,
              }),
            }}
          />
        </Box>

        <Box width={"100%"} mx="auto">
          <Typography variant="body2" sx={{ letterSpacing: "1px" }} mb={3}>
            Password
          </Typography>
          <div style={{ position: "relative" }}>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type={showPassword ? "password" : "text"}
              placeholder="Your password"
              style={{
                ...inputStyle,
                ...inputPasswordStyle,
                paddingRight: "45px",
              }}
              onFocus={() => handleFocus("password")}
              onBlur={() => handleBlur("password")}
            />

            {showPassword ? (
              <VisibilityIcon sx={styleIcon} onClick={handleSetShowPassword} />
            ) : (
              <VisibilityOffIcon
                sx={styleIcon}
                onClick={handleSetShowPassword}
              />
            )}
          </div>
        </Box>
        <Box width={"100%"} mx="auto" mb={-3}>
          <Typography variant="body2" sx={{ letterSpacing: "1px" }} mb={3}>
            Confirm Password
          </Typography>
          <div style={{ position: "relative" }}>
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              type={showConfirmPassword ? "password" : "text"}
              placeholder="Confirm your password"
              style={{
                ...inputStyle,
                ...inputConfirmPasswordStyle,
                paddingRight: "45px",
              }}
              onFocus={() => handleFocus("confirmPassword")}
              onBlur={() => handleBlur("confirmPassword")}
            />
            {showConfirmPassword ? (
              <VisibilityIcon
                sx={styleIcon}
                onClick={handleSetShowConfirmPassword}
              />
            ) : (
              <VisibilityOffIcon
                sx={styleIcon}
                onClick={handleSetShowConfirmPassword}
              />
            )}
          </div>
        </Box>
        <FormControlLabel
          sx={{ marginRight: "auto" }}
          control={
            <Checkbox
              color="primary"
              onChange={() =>
                setTermsAndConditionsChecked(!termsAndConditionsChecked)
              }
              icon={<RadioButtonUncheckedIcon fontSize="large" />}
              checkedIcon={<RadioButtonCheckedIcon fontSize="large" />}
            />
          }
          label={
            <Typography variant="h5">
              I have read and agree to{" "}
              <Link style={{ color: "black" }}>terms & conditions</Link>
            </Typography>
          }
        />
        <Box
          display={"flex"}
          flexWrap={"wrap"}
          justifyContent={{ xs: "center", sm: "space-between" }}
          gap={2}
          mt={3}
          width={"100%"}
        >
          <Button
            width
            disableElevation
            disableRipple
            variant="contained"
            onClick={handleRegister}
            sx={{
              padding: "10px 50px",
              fontWeight: "bold",
              fontSize: "1.1rem",
              borderRadius: 20,
              [theme.breakpoints.down("md")]: {
                width: "200px",
              },
              [theme.breakpoints.up("md")]: {
                width: "230px",
              },
              [theme.breakpoints.up("lg")]: {
                width: "300px",
              },

              height: "60px",
            }}
          >
            Sign up
          </Button>
          <Link style={{ textDecoration: "none", color: "black" }} to="/login">
            <Button
              color="warning"
              sx={{
                borderRadius: 20,

                "&:hover, &:focus": {
                  border: "2px solid #000",
                },
                border: "2px solid rgba(0,0,0,0.1)",
                [theme.breakpoints.down("md")]: {
                  width: "200px",
                },
                [theme.breakpoints.up("md")]: {
                  width: "230px",
                },
                [theme.breakpoints.up("lg")]: {
                  width: "300px",
                },

                padding: "12px 22px",
                fontSize: 18,
                fontWeight: "bold",
                letterSpacing: 1,
              }}
              variant="outlined"
            >
              Login
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default Register;
