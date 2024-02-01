import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

import { toast } from "sonner";
import { useTheme } from "@emotion/react";

const Newsletter = () => {
  const theme = useTheme();

  const [email, setEmail] = useState("");

  const isEmailValid = (email) => {
    // Expresión regular para validar el formato del correo electrónico
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleFakeSend = () => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    if (!isEmailValid(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    toast.success("You have successfully subscribed");
  };

  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const inputStyle = {
    padding: "20px",
    fontSize: "20px",
    borderRadius: 40,
    outline: "none",
    width: "100%",
    maxWidth: "450px",
    minWidth: "150px",
    border: isFocused ? "2px solid #9c27b0" : "2px solid transparent",
    transition: "all 0.5s ease",
  };

  return (
    <Box
      component={"section"}
      my={"160px"}
      bgcolor={theme.palette.customColor1.main}
      paddingY={"120px"}
      paddingX={"20px"}
      borderRadius={10}
    >
      <Box textAlign={"center"}>
        <Typography variant="body1" color={"primary"} component={"p"} mb={1}>
          - Our Newsletter
        </Typography>
        <Typography variant={"h2"} component={"h2"}>
          Sign Up to our Newsletter
        </Typography>
        <Box
          mt={8}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          flexWrap={"wrap"}
          gap={5}
          component={"form"}
        >
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="text"
            placeholder="Your Email"
            style={inputStyle}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <Button
            onClick={handleFakeSend}
            type="submit"
            variant="contained"
            disableElevation
            size="large"
            sx={{
              height: "70px",
              width: "160px",
              borderRadius: 10,
              fontSize: "1.3rem",
            }}
          >
            Sign up
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Newsletter;
