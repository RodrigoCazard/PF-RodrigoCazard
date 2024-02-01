import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import BreadCrumbsCustom from "../BreadCrumbsCustom/BreadCrumbsCustom";
import { useTheme } from "@emotion/react";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { toast } from "sonner";
const Contact = () => {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [message, setMessage] = useState("");

  const theme = useTheme();

  const handleFakeSend = () => {
    if (!displayName || !email || !message) {
      toast.error("Please complete all fields.");
      return;
    }
    toast.success("Message sent");
  };
  const [isFocused, setIsFocused] = useState({
    email: false,
    message: false,
    displayName: false,
  });
  const inputMessageStyle = {
    border: isFocused.message
      ? "2px solid #9c27b0"
      : `2px solid ${theme.palette.border.main}`,
  };
  const inputEmailStyle = {
    border: isFocused.email
      ? "2px solid #9c27b0"
      : `2px solid ${theme.palette.border.main}`,
  };
  const inputDisplayNameStyle = {
    border: isFocused.displayName
      ? "2px solid #9c27b0"
      : `2px solid ${theme.palette.border.main}`,
  };
  const handleFocus = (field) => {
    setIsFocused((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field) => {
    setIsFocused((prev) => ({ ...prev, [field]: false }));
  };

  const inputStyle = {
    padding: "17px 20px",
    fontSize: "20px",
    borderRadius: 40,
    outline: "none",
    width: "100%",
    marginBottom: "50px",
    transition: "all 0.5s ease",
    resize: "vertical",
  };

  return (
    <>
      <BreadCrumbsCustom breadCrumbs={["Contact Us"]}></BreadCrumbsCustom>
      <Box mb={15}>
        <Typography variant="body1" color={"primary"} component={"p"} mb={1}>
          - Ask Questions
        </Typography>
        <Typography variant="h3" component="h2">
          We are always here to help you
        </Typography>
      </Box>
      <Grid container spacing={{ md: 12, xs: 6 }} mb={20}>
        <Grid item xs={12} md={6}>
          <Typography mb={3}> Customer Services</Typography>
          <Typography
            variant="body2"
            style={{ letterSpacing: "2px", lineHeight: "30px" }}
          >
            Please send us an email at{" "}
            <span
              style={{
                textDecoration: "underline",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              example@gmail.com
            </span>
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography mb={3}> Public Relations</Typography>
          <Typography
            variant="body2"
            style={{ letterSpacing: "2px", lineHeight: "30px" }}
          >
            You can contact our media team by sending them an email at{" "}
            <span
              style={{
                textDecoration: "underline",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              example@gmail.com
            </span>
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography mb={3}> Large Orders</Typography>
          <Typography
            variant="body2"
            style={{ letterSpacing: "2px", lineHeight: "30px" }}
          >
            If you are thinking of making a very large order, plese feel free to
            contact us at{" "}
            <span
              style={{
                textDecoration: "underline",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              example@gmail.com
            </span>{" "}
            and we will give you a special discount
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography mb={3}> Other Enquiries</Typography>
          <Typography
            variant="body2"
            style={{ letterSpacing: "2px", lineHeight: "30px" }}
          >
            For all of your other questions, please send us an email at{" "}
            <span
              style={{
                textDecoration: "underline",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              example@gmail.com
            </span>{" "}
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={12} paddingX={"10%"} mb={15}>
        <Grid item xs={12} md={6}>
          <Typography variant="body1" color={"primary"} component={"p"} mb={1}>
            - Reach Out to Us
          </Typography>
          <Typography variant="h3" component="h2">
            Please fill out the contact form
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
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
              type="text"
              placeholder="Your Email"
              style={{ ...inputStyle, ...inputEmailStyle }}
              onFocus={() => handleFocus("email")}
              onBlur={() => handleBlur("email")}
            />
          </Box>
          <Box width={"100%"} mx="auto">
            <Typography variant="body2" sx={{ letterSpacing: "1px" }} mb={3}>
              Message
            </Typography>
            <TextareaAutosize
              minRows={6}
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              type="text"
              placeholder="Your Message"
              style={{ ...inputStyle, ...inputMessageStyle }}
              onFocus={() => handleFocus("message")}
              onBlur={() => handleBlur("message")}
            />
          </Box>
          <Button
            disableElevation
            onClick={handleFakeSend}
            size="large"
            variant="contained"
            sx={{
              fontWeight: "bold",
              padding: "12px 45px",
              fontSize: "20px",
              borderRadius: 40,
            }}
          >
            Send
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Contact;
