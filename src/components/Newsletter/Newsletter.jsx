import { Box, Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import { toast } from "sonner";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();

    const templateParams = {
      from_email: email,
    };

    emailjs
      .send(
        "service_i5eo9f8",
        "template_221t5rd",
        templateParams,
        "WMwpX2LtjWyOa7YTs"
      )
      .then(() => {
        toast.success("You have successfully subscribed");
      })
      .catch((e) => {
        toast.error("Event has not been created", e);
      });

    setEmail("");
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
    width: "100%", // Ancho del input al 100% del contenedor
    maxWidth: "450px", // Ancho máximo permitido
    minWidth: "150px", // Ancho mínimo permitido
    border: isFocused ? "2px solid #9c27b0" : "2px solid transparent",
    transition: "all 0.5s ease",
  };

  return (
    <Box
      component={"section"}
      my={"120px"}
      bgcolor={"rgba(0,0,0,0.03)"}
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
          onSubmit={sendMessage}
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
            onClick={() => {}}
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
