import React, { useEffect, useState } from "react";
import CartPreview from "./CartPreview";
import { Box } from "@mui/material";
import { useTheme } from "@emotion/react";

const CartOverlay = ({ scrolled, isVisible, authState }) => {
  const theme = useTheme();

  const [isMouseOver, setIsMouseOver] = useState(false);

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

  const overlayStyle = {
    opacity: isMouseOver || isVisible ? 1 : 0,
    visibility: isMouseOver || isVisible ? "visible" : "hidden",
    transition: "all 0.2s ease",
  };

  const topStyle = {
    top: topValue,
  };

  return (
    <Box
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      marginRight={"7%"}
      sx={{
        paddingTop: scrolled ? 2 : 4,
        position: "fixed",
        right: 0,
        ...topStyle,
        alignItems: "center",
        justifyContent: "center",
        zIndex: "1000",
        ...overlayStyle,
      }}
    >
      <Box
        width={"550px"}
        maxHeight={"80vh"}
        borderRadius={7}
        border={`2px solid ${theme.palette.border.main}`}
        paddingX={5}
        paddingY={3}
        className="cart-overlay"
        sx={{ overflowY: "auto", bgcolor: theme.palette.background.paper }}
      >
        <CartPreview checkoutDisable={false} />
      </Box>
    </Box>
  );
};

export default CartOverlay;
