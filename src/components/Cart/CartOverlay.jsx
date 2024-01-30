import React, { useEffect, useState } from "react";
import CartPreview from "./CartPreview";
import { Box, Hidden } from "@mui/material";

const CartOverlay = ({ scrolled, isVisible, authState }) => {
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

  let topValue;

  if (!authState) {
    topValue = scrolled ? 50 : 70;
  } else {
    topValue = scrolled ? 100 : 115;
  }

  const topStyle = {
    top: topValue,
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
        ...topStyle,
        top: topStyle,
        ...overlayStyle,
        alignItems: "center",
        justifyContent: "center",
        zIndex: "1000",
      }}
    >
      <Box
        width={"500px"}
        maxHeight={"80vh"}
        bgcolor={"white"}
        borderRadius={7}
        border="2px solid rgba(0,0,0,0.1)"
        paddingX={5}
        paddingY={3}
        className="cart-overlay"
        sx={{ overflowY: "auto" }}
      >
        <CartPreview checkoutDisable={false} />
      </Box>
    </Box>
  );
};

export default CartOverlay;
