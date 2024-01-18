import { useTheme } from "@emotion/react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import { useContext, useState } from "react";
import CartContext from "../../context/CartContext";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import CartOverlay from "../Cart/CartOverlay";

const CartWidget = () => {
  const [isCartVisible, setCartVisibility] = useState(false);

  const handleCartClick = () => {
    setCartVisibility(!isCartVisible);
  };

  const { quantity } = useContext(CartContext);

  const handleToggle = () => {
    handleCartClick();
  };

  const theme = useTheme();

  const primaryColor = theme.palette.primary.main;

  const StyledLink = styled(Link)`
    display: inline-block;
    cursor: pointer;
    transition: all 0.5s ease;
    opacity: 0.8;
    color: black;

    &:hover {
      opacity: 1;
      color: ${primaryColor};
      transform: scale(1.2);

      .MuiBadge-badge {
        transform: translate(1px) scale(0.9);
        opacity: 0;
        font-weight: bold;
        transition: all 0.2s linear;
      }
    }
  `;

  return (
    <Box>
      {isCartVisible && <CartOverlay></CartOverlay>}
      <StyledLink
        to={"/cart"}
        onMouseEnter={handleToggle}
        onMouseLeave={handleToggle}
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
    </Box>
  );
};

export default CartWidget;
