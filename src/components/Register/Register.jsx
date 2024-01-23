import React, { useState, useMemo } from "react";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Select from "react-select";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

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
import { Link, useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  const changeHandler = (country) => {
    setCountry(country);
  };
  const styleIcon = {
    backgroundColor: "white",
    opacity: 0.4,
    "&:hover": {
      opacity: 0.8,
    },
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
    } catch (error) {
      console.error("Error adding user to Firestore:", error);
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
      toast.error("Please complete all fields.");
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }
    if (!termsAndConditionsChecked) {
      toast.error("You must accept the terms and conditions.");
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
        favorites: [],
      };

      await addUserToFirestore(userData);

      toast.success("Successful registration");
    } catch (error) {
      console.log(error.message);
      let errorMessage = "Login error";
      if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email format. Please enter a valid email.";
      }
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "Email already in use";
      }

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
    navigate("/profile");
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
    "&:hover": {
      border: isFocused.country
        ? "2px solid #9c27b0"
        : "2px solid rgba(0,0,0,0.1)",
    },
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
        width={{ xs: "100%", sm: "80%", md: "60%", lg: "40%", xl: "40%" }}
      >
        <Box width={"100%"} mx="auto">
          <Typography variant="body2" sx={{ letterSpacing: "1px" }} mb={3}>
            Full name
          </Typography>
          <input
            type="text"
            value={displayName}
            onChange={(e) => {
              const inputValue = e.target.value.replace(/[^A-Za-z ]/g, "");

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

          <PhoneInput
            defaultCountry="uy"
            placeholder="Phone number"
            value={phone}
            hideDropdown
            countrySelectorStyleProps={{
              style: {
                marginLeft: 20,
                display: "flex",

                alignItems: "center",
              },
              buttonStyle: {
                border: 0,
              },
            }}
            style={{
              height: "65px",
              marginBottom: "50px",
              ...inputPhoneStyle,
              transition: "all 0.5s ease",
              borderRadius: 40,
            }}
            inputStyle={{
              border: "0",
              height: "61px",
              ...inputStyle,
              paddingLeft: 5,
            }}
            onChange={(value) => setPhone(value)}
            onFocus={() => handleFocus("phone")}
            onBlur={() => handleBlur("phone")}
          ></PhoneInput>
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
              clearIndicator: (base) => ({
                ...base,
                color: "rgba(0,0,0,0.2)",
                "&:hover": {
                  color: "rgba(0,0,0,0.9)",
                },
              }),
              dropdownIndicator: (base) => ({
                ...base,
                color: "rgba(0,0,0,0.2)",
                "&:hover": {
                  color: "rgba(0,0,0,0.9)",
                },
              }),
              control: (base) => ({
                ...base,
                ...inputStyle,
                cursor: "pointer",

                border: "2px solid rgba(0,0,0,0.1)",
                transition: "all 0.5s ease",
                boxShadow: "none",
                ...inputCountryStyle,
                padding: "10px",
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
              padding: "10px 75px",
              fontWeight: "bold",
              fontSize: "1.1rem",
              borderRadius: 20,

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

                padding: "10px 75px",
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
