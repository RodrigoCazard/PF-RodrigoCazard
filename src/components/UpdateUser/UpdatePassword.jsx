import React, { useState } from "react";
import { getAuth, updatePassword } from "firebase/auth";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useTheme } from "@emotion/react";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import BreadCrumbsCustom from "../BreadCrumbsCustom/BreadCrumbsCustom";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
const UpdatePassword = () => {
  const theme = useTheme();

  const inputStyle = {
    padding: "17px 20px",
    fontSize: "20px",
    borderRadius: 40,
    outline: "none",
    width: "100%",
    marginBottom: "50px",
    transition: "all 0.5s ease",
  };

  const styleIcon = {
    opacity: 0.4,
    "&:hover": {
      opacity: 0.8,
    },
    color: `black`,
    position: "absolute",
    right: "20px",
    top: "22%",
    transform: "translateY(-25%)",
    cursor: "pointer",
  };

  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  const handleSetShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleSetShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isFocused, setIsFocused] = useState({
    password: false,
  });

  const inputPasswordStyle = {
    border: isFocused.password
      ? "2px solid #9c27b0"
      : `2px solid ${theme.palette.border.main}`,
  };
  const inputConfirmPasswordStyle = {
    border: isFocused.confirmPassword
      ? "2px solid #9c27b0"
      : `2px solid ${theme.palette.border.main}`,
  };

  const auth = getAuth();

  const user = auth.currentUser;

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const handleUpdatePassword = () => {
    setLoading(true);

    if (!password || !confirmPassword) {
      toast.error("Please complete all fields.");
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    updatePassword(user, password)
      .then(() => {
        toast.success("The password has been successfully changed.");
        setLoading(false);
        navigate("/profile");
      })
      .catch((error) => {
        let errorMessage = "There was an error changing the password.";
        if (error.code === "auth/weak-password") {
          errorMessage = "The password should be at least 6 characters.";
        }
        if (error.code === "auth/requires-recent-login") {
          errorMessage =
            "For security reasons, log back into your account before changing the password.";
        }
        toast.error(errorMessage);
        setLoading(false);
      });
  };

  const handleFocus = (field) => {
    setIsFocused((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field) => {
    setIsFocused((prev) => ({ ...prev, [field]: false }));
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
      <BreadCrumbsCustom
        breadCrumbs={[{ name: "Profile", link: "/profile" }, "Change Password"]}
      ></BreadCrumbsCustom>
      <Box>
        <Typography variant="body1" color={"primary"} component={"p"} mb={1}>
          - Change Password
        </Typography>
        <Typography variant="h3" component="h2">
          Change your password
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
        <Button
          width
          disableElevation
          disableRipple
          fullWidth
          variant="contained"
          onClick={handleUpdatePassword}
          sx={{
            padding: "10px 75px",
            fontWeight: "bold",
            fontSize: "1.1rem",
            borderRadius: 20,
            mt: 3,
            height: "60px",
          }}
        >
          Update information
        </Button>
      </Box>
    </>
  );
};

export default UpdatePassword;
