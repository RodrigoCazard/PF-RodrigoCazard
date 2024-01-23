import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const NotLogged = () => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      gap={4}
      my={27}
    >
      <Typography variant="h3">No user logged in</Typography>
      <Link to="/login">
        {" "}
        <Button
          variant="contained"
          disableElevation
          sx={{
            borderRadius: 15,
            width: "250px",
            padding: "20px 50px",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          Login
        </Button>
      </Link>
    </Box>
  );
};

export default NotLogged;
