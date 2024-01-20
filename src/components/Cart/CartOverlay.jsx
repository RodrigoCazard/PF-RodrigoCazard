import React, { useEffect, useState } from "react";
import CartPreview from "./CartPreview";
import { Box, Hidden } from "@mui/material";

const CartOverlay = ({ scrolled, isVisible }) => {
  const [overlayStyle, setOverlayStyle] = useState({
    opacity: 0,
    visibility: "hidden",
  });
  const [isMouseOver, setIsMouseOver] = useState(false);

  useEffect(() => {
    if (!isMouseOver) {
      setOverlayStyle({
        opacity: isVisible ? 1 : 0,
        visibility: isVisible ? "visible" : "hidden",
        transition: "all 0.2s ease",
      });
    }
  }, [isVisible, isMouseOver]);

  const handleMouseEnter = () => {
    setIsMouseOver(true);
  };

  const handleMouseLeave = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsMouseOver(false);
    }
  };

  return (
    <Box
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      marginRight={"7%"}
      sx={{
        bgcolor: "transparent",
        paddingTop: scrolled ? 2 : 4,
        position: "fixed",
        right: 0,

        top: scrolled ? 50 : 70,
        ...overlayStyle, // Aplicar el estilo dinámico
        alignItems: "center",
        justifyContent: "center",
        zIndex: "1000",
      }}
    >
      <Box
        maxHeight={"80vh"}
        bgcolor={"white"}
        borderRadius={7}
        border="1px solid rgba(0,0,0,0.1)"
        paddingX={5}
        paddingY={3}
        className="cart-overlay"
        sx={{ overflowY: "auto" }}
      >
        <CartPreview />
      </Box>
    </Box>
  );
};

export default CartOverlay;
