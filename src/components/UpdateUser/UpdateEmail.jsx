import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Box, Typography } from "@mui/material";

const UpdateEmail = () => {
  const [email, setEmail] = useState("");
  const { changeEmail } = useAuth();

  const handleChangeEmail = () => {
    const newEmail = email;

    changeEmail(newEmail);
  };

  return (
    <div>
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
            // style={{ ...inputStyle, ...inputEmailStyle }}
            // onFocus={() => handleFocus("email")}
            // onBlur={() => handleBlur("email")}
          />
        </Box>
        <button onClick={handleChangeEmail}>Cambiar Correo Electrónico</button>
      </Box>
    </div>
  );
};

export default UpdateEmail;
