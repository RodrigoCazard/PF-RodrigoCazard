import React from "react";
import { Box, Button, Typography } from "@mui/material";
const UpdateUser = () => {
  const [displayName, setDisplayName] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const changeHandler = (country) => {
    setCountry(country);
  };

  const [isFocused, setIsFocused] = useState({
    displayName: false,
    phone: false,
    address: false,
    country: false,
  });
  const handleFocus = (field) => {
    setIsFocused((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field) => {
    setIsFocused((prev) => ({ ...prev, [field]: false }));
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
    </Box>
  );
};

export default UpdateUser;
