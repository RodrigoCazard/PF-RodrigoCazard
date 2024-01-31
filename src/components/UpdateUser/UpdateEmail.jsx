import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import BreadCrumbsCustom from "../BreadCrumbsCustom/BreadCrumbsCustom";
import { updateEmail, verifyBeforeUpdateEmail } from "firebase/auth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../Utils/users";
const UpdateEmail = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const theme = useTheme();

  const user = useAuth();

  const navigate = useNavigate();
  const handleChangeEmail = () => {
    setIsLoading(true);

    if (!email) {
      toast.error("Please complete all fields.");
      setIsLoading(false);
      return;
    }
    verifyBeforeUpdateEmail(user.user, email).then(() => {});

    updateEmail(user.user, email)
      .then(() => {
        toast.success("The email address has been successfully changed.");

        updateUser(user.user.uid, { email }).then((res) => {
          setIsLoading(false);
          navigate("/profile");
        });
      })
      .catch((error) => {
        let errorMessage = "There was an error changing the email address.";

        if (error.code === "auth/requires-recent-login") {
          errorMessage =
            "For security reasons, log back into your account before changing the email address.";
        } else if (error.code === "auth/invalid-email") {
          errorMessage = "Invalid email format. Please enter a valid email";
        } else if (error.code === "auth/too-many-requests") {
          errorMessage =
            "Access to this account has been temporarily disabled due to many failed login attempts.";
        } else if (error.code === "auth/email-already-in-use") {
          errorMessage = "Email already in use";
        }

        toast.error(errorMessage);
        setIsLoading(false);
      });
  };
  const [isFocused, setIsFocused] = useState({
    email: false,
  });

  const handleFocus = (field) => {
    setIsFocused((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field) => {
    setIsFocused((prev) => ({ ...prev, [field]: false }));
  };

  const inputEmailStyle = {
    border: isFocused.email
      ? "2px solid #9c27b0"
      : `2px solid ${theme.palette.border.main}`,
  };

  const inputStyle = {
    padding: "17px 20px",
    fontSize: "20px",
    borderRadius: 40,
    outline: "none",
    width: "100%",
    marginBottom: "50px",
    transition: "all 0.5s ease",
  };
  return (
    <>
      {isLoading && (
        <Backdrop
          open={isLoading}
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <CircularProgress color="primary" />
        </Backdrop>
      )}
      <BreadCrumbsCustom
        breadCrumbs={[{ name: "Profile", link: "/profile" }, "Update email"]}
      />
      <Box>
        <Typography variant="body1" color={"primary"} component={"p"} mb={1}>
          - Change Email Address
        </Typography>
        <Typography variant="h3" component="h2">
          Change your email
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
        <Button
          width
          disableElevation
          disableRipple
          fullWidth
          variant="contained"
          onClick={handleChangeEmail}
          sx={{
            padding: "10px 75px",
            fontWeight: "bold",
            fontSize: "1.1rem",
            borderRadius: 20,

            height: "60px",
          }}
        >
          Update information
        </Button>
      </Box>
    </>
  );
};

export default UpdateEmail;
