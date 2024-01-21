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
        <Box display={"flex"} justifyContent={"space-between"}>
          <Typography variant="h3" component="h2">
            Shopping Cart
          </Typography>

          <Button
            color="warning"
            onClick={() => cartClear()}
            fullw
            sx={{
              borderRadius: 20,

              "&:hover, &:focus": {
                border: "2px solid #000",
              },
              border: "2px solid rgba(0,0,0,0.1)",
              minWidth: "200px",
              fontSize: 18,
              fontWeight: "bold",
              letterSpacing: 1,
            }}
            variant="outlined"
          >
            Clear all
          </Button>
        </Box>
      </Box>
      {quantity === 0 ? (
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          gap={4}
          my={27}
        >
          <Typography variant="h3">
            There are no products in the cart.
          </Typography>
          <Link to="/category/all">
            {" "}
            <Button
              variant="contained"
              disableElevation
              sx={{ borderRadius: 15, padding: "20px 50px", fontSize: "20px" }}
            >
              Explore products
            </Button>
          </Link>
        </Box>
      ) : (
        <Box marginY={10}>
          <Box display="flex" width="100%">
            <Box
              position={"sticky"}
              width="65%"
              paddingRight="16px"
              display={"flex"}
              flexDirection={"column"}
              gap={6}
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
              width="33%"
              ml={"auto"}
              height={"fit-content"}
              border={"2px solid rgba(0,0,0,0.1)"}
              padding={"40px 80px"}
              borderRadius={15}
            >
              <Typography
                variant="h4"
                sx={{ fontWeight: "bold", marginBottom: "45px" }}
              >
                {" "}
                Cart Total
              </Typography>
              <Box display={"flex"} gap={6} flexDirection={"column"}>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="h5">Subtotal: </Typography>
                  <Typography variant="h5"> ${total}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="h5">Tax: </Typography>
                  <Typography variant="h5"> In development</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="h5">Shipping: </Typography>
                  <Typography variant="h5"> In development</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    Total:
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    ${total}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    Total quantity:
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    {quantity} items
                  </Typography>
                </Box>
              </Box>

              <Link
                style={{ textDecoration: "none", color: "black" }}
                to="/cart/checkout"
              >
                <Button
                  disableElevation
                  disableRipple
                  fullWidth
                  variant="contained"
                  sx={{
                    marginTop: 9,
                    padding: "10px 50px",
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                    borderRadius: 20,
                    height: "60px",
                  }}
                >
                  Checkout
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Cart;
