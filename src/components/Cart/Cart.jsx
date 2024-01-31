import { useContext, useState } from "react";
import CartContext from "../../context/CartContext";
import { Link } from "react-router-dom";
import CartItem from "../ CartItem/CartItem";
import { Box, Button, Grid, Typography } from "@mui/material";

import { useTheme } from "@emotion/react";
import BreadCrumbsCustom from "../BreadCrumbsCustom/BreadCrumbsCustom";
const Cart = () => {
  const theme = useTheme();

  const { cart, cartClear, total, quantity } = useContext(CartContext);

  return (
    <>
      <BreadCrumbsCustom breadCrumbs={["Cart"]}></BreadCrumbsCustom>
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
                border: `2px solid ${theme.palette.basicText.main}`,
              },
              border: `2px solid ${theme.palette.border.main}`,
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
          <Typography variant="h4">
            There are no products in the cart.
          </Typography>
          <Link to="/category/all">
            {" "}
            <Button
              variant="contained"
              disableElevation
              sx={{
                borderRadius: 40,
                padding: "20px 50px",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              Explore products
            </Button>
          </Link>
        </Box>
      ) : (
        <Box marginY={10}>
          <Box display="flex" width="100%">
            <Grid container spacing={6}>
              <Grid item md={12} lg={8}>
                <Box
                  position={"sticky"}
                  display={"flex"}
                  flexDirection={"column"}
                  gap={6}
                >
                  {cart.map((prod) => (
                    <Box
                      key={prod.item.id}
                      sx={{ border: `2px solid ${theme.palette.border.main}` }}
                      borderRadius={15}
                      padding={"20px 50px"}
                    >
                      <CartItem
                        quantityProp={prod.quantity}
                        {...prod.item}
                        variant
                      >
                        {" "}
                      </CartItem>
                    </Box>
                  ))}
                </Box>
              </Grid>
              <Grid item xs={12} md={12} lg={4}>
                <Box
                  ml={"auto"}
                  height={"fit-content"}
                  sx={{ border: `2px solid ${theme.palette.border.main}` }}
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
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Cart;
