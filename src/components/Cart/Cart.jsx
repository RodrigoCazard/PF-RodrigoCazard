import { useContext, useState } from "react";
import CartContext from "../../context/CartContext";
import { Link } from "react-router-dom";
import CartItem from "../ CartItem/CartItem";
import { Box, Breadcrumbs, Button, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
const Cart = () => {
  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;

  const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
    opacity: 0.6;

    &:hover {
      text-decoration: underline;
      opacity: 1;
      color: ${primaryColor};
    }
  `;

  const { cart, cartClear, cartUpdate, total, quantity } =
    useContext(CartContext);

  const handleCartUpdate = () => {
    cartUpdate(cart, count);
  };

  return (
    <>
      <Breadcrumbs
        sx={{ margin: "20px 0 40px 0" }}
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        <StyledLink to="/">Home page</StyledLink>
        <Typography color="text.primary">Cart</Typography>
      </Breadcrumbs>
      <Box>
        <Typography variant="body1" color={"primary"} component={"p"} mb={1}>
          - Your Cart
        </Typography>
        <Typography variant="h3" component="h2">
          Shopping Cart
        </Typography>
      </Box>
      {quantity === 0 ? (
        <Box marginTop={10}>
          <h2>No hay productos en el carrito.</h2>
          <Link to="/category/all">Ver Productos</Link>
        </Box>
      ) : (
        <Box marginY={10}>
          <Box display="flex" width="100%">
            <Box
              width="60%"
              paddingRight="16px"
              height={"65vh"}
              sx={{ overflowY: "auto" }}
              display={"flex"}
              flexDirection={"column"}
              gap={5}
            >
              {cart.map((prod) => (
                <Box
                  key={prod.item.id}
                  border={"2px solid rgba(0,0,0,0.1)"}
                  padding={"20px 50px"}
                  borderRadius={15}
                >
                  <CartItem quantityProp={prod.quantity} {...prod.item} variant>
                    {" "}
                  </CartItem>
                </Box>
              ))}
            </Box>

            <Box
              width="30%"
              mx={"auto"}
              padding="16px"
              border={"2px solid rgba(0,0,0,0.1)"}
              padding={"40px 80px"}
              borderRadius={15}
            >
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2">Total: </Typography>
                <Typography variant="body2"> ${total}</Typography>
              </Box>

              <Typography style={{ marginTop: "8px" }}>
                Total Amount: {quantity}
              </Typography>
              <Button
                onClick={() => cartClear()}
                style={{ marginTop: "8px", marginRight: "8px" }}
              >
                Empty Cart
              </Button>
              <Link to="/checkout" style={{ marginTop: "8px" }}>
                Finalizar compra
              </Link>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Cart;
