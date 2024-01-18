import React from "react";
import CartPreview from "./CartPreview";
import { Box } from "@mui/material";

const CartOverlay = () => {
  // Lógica para mostrar u ocultar el overlay según sea necesario

  return (
    <Box
      marginRight={5}
      bgcolor={"white"}
      borderRadius={15}
      border={1}
      padding={5}
      maxWidth={"600px"}
      className="cart-overlay"
      sx={{
        position: "fixed",
        right: 0,
        top: 90,
        display: "flex",
        alignUtems: "center",
        justifyContent: "center",
        zIndex: "1000",
      }}
    >
      <CartPreview />
    </Box>
  );
};

export default CartOverlay;
