// src/components/Login.jsx
import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Box,
  FormControlLabel,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";

import styled from "@emotion/styled";
import Checkbox from "@mui/material/Checkbox";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { toast } from "sonner";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import Cookies from "js-cookie";
import BreadCrumbsCustom from "../BreadCrumbsCustom/BreadCrumbsCustom";
const Login = ({ variant }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const rememberedEmail = Cookies.get("rememberedEmail");

    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  const handleLogin = async () => {
    setLoading(true);
    if (!email) {
      toast.error("Please enter an email.");
      setLoading(false);
      return;
    }
    if (!password) {
      toast.error("Please enter a password.");
      setLoading(false);
      return;
    }

    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);

      if (rememberMe) {
        Cookies.set("rememberedEmail", email, { expires: 365 });
      } else {
        Cookies.remove("rememberedEmail");
      }

      toast.success("Successful login");
      if (!variant) {
        navigate("/profile");
      }
    } catch (error) {
      let errorMessage = "Login error";
      if (error.code === "auth/invalid-credential") {
        errorMessage = "User not found. Please check your credentials";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email format. Please enter a valid email";
      } else if (error.code === "auth/too-many-requests") {
        errorMessage =
          "Access to this account has been temporarily disabled due to many failed login attempts.";
      }

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const [showPassword, setShowPassword] = useState(true);

  const handleSetShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;

  const styleIcon = {
    "&:hover": {
      opacity: 0.8,
    },
    color: `black`,
    opacity: 0.4,
    position: "absolute",
    right: "20px",
    top: "22%",
    transform: "translateY(-25%)",
    cursor: "pointer",
  };

  const StyledLink = styled(Link)`
    text-decoration: none;
    color: ${theme.palette.basicText.main};
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
    <>
      {loading && (
        <Backdrop
          open={loading}
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <CircularProgress color="primary" />
        </Backdrop>
      )}
      {!variant && (
        <>
          <BreadCrumbsCustom breadCrumbs={["Login"]} />
          <Box>
            <Typography
              variant="body1"
              color={"primary"}
              component={"p"}
              mb={1}
            >
              - Login
            </Typography>
            <Typography variant="h3" component="h2">
              Login to Your Account
            </Typography>
          </Box>
        </>
      )}

      <Box
        marginTop={10}
        marginBottom={variant ? 0 : 17}
        marginX={"auto"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
        width={
          !variant
            ? { xs: "100%", sm: "80%", md: "60%", lg: "40%", xl: "40%" }
            : "100%"
        }
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
        <FormControlLabel
          sx={{ marginTop: "-30px", marginRight: "auto" }}
          control={
            <Checkbox
              color="primary"
              icon={<RadioButtonUncheckedIcon fontSize="large" />}
              checkedIcon={<RadioButtonCheckedIcon fontSize="large" />}
              checked={rememberMe}
              onChange={handleRememberMeChange}
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
          flexWrap={"wrap"}
          gap={2}
          justifyContent={{ xs: "center", sm: "space-between" }}
          alignItems={"center"}
          width={"100%"}
        >
          {" "}
          <Link
            to={"/register"}
            style={{ textDecoration: "none", color: "black" }}
          >
            <Button
              color="warning"
              sx={{
                borderRadius: 20,
                "&:hover, &:focus": {
                  border: `2px solid ${theme.palette.basicText.main}`,
                },
                border: `2px solid ${theme.palette.border.main}`,
                padding: "12px 22px",
                fontSize: 18,
                fontWeight: "bold",
                letterSpacing: 1,
              }}
              variant="outlined"
            >
              <Typography variant="body2"> Create account</Typography>
            </Button>
          </Link>
          <StyledLink
            style={{
              fontSize: "1.5rem",
            }}
          >
            <Typography variant="h5">Forgot Password?</Typography>
          </StyledLink>
        </Box>
      </Box>
    </>
  );
};

export default Login;
