import React, { useContext, useState } from "react";
import { useTheme } from "@emotion/react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import CartOverlay from "../Cart/CartOverlay";
import CartContext from "../../context/CartContext";

const StyledLink = styled(Link)`
  display: inline-block;
  cursor: pointer;
  transition: all 0.5s ease;
  opacity: 0.8;
  color: black;

  &.overlay-visible {
    opacity: 1;
    color: ${(props) => props.primaryColor};
    transform: scale(1.2);

    .MuiBadge-badge {
      transform: translate(1px) scale(0.9);
      opacity: 0;
      font-weight: bold;
      transition: all 0.2s linear;
    }
  }
`;

const CartWidget = ({ scrolled }) => {
  const { quantity } = useContext(CartContext);

  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;

  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsOverlayVisible(true);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      setIsOverlayVisible(false);
    }, 200);
  };

  return (
    <Box className="cart-widget">
      <StyledLink
        to={"/cart"}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        primaryColor={primaryColor}
        className={isOverlayVisible ? "overlay-visible" : ""}
      >
        <Badge
          badgeContent={quantity === 0 ? "0" : quantity}
          color="primary"
          sx={{ "& .MuiBadge-badge": { right: 7, top: 5 } }}
        >
          <ShoppingCartOutlinedIcon fontSize="large">
            {" "}
          </ShoppingCartOutlinedIcon>
        </Badge>
      </StyledLink>

      <CartOverlay scrolled={scrolled} isVisible={isOverlayVisible} />
    </Box>
  );
};

export default CartWidget;
