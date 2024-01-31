import { useContext } from "react";
import CartContext from "../../context/CartContext";
import { Link } from "react-router-dom";
import CartItem from "../ CartItem/CartItem";
import { Box, Button, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";

const CartPreview = ({ checkoutDisable }) => {
  const theme = useTheme();

  const { cart, cartClear, total, quantity } = useContext(CartContext);

  if (quantity === 0) {
    return (
      <>
        <Box
          display={"flex"}
          alignItems={"center"}
          flexDirection={"column"}
          justifyContent={"space-around"}
          gap={4}
        >
          <Typography variant="h5">
            There are no products in the cart.
          </Typography>
          <Link to="/category/all">
            {" "}
            <Button
              variant="contained"
              disableElevation
              sx={{
                fontWeight: "bold",
                padding: "12px 50px",
                fontSize: "14px",
                borderRadius: 40,
              }}
            >
              Explore products
            </Button>
          </Link>
        </Box>
      </>
    );
  }

  return (
    <Box>
      <Box width={"100%"}>
        {cart.map((prod) => (
          <CartItem
            quantityProp={prod.quantity}
            key={prod.item.id}
            {...prod.item}
          ></CartItem>
        ))}
      </Box>
      <Box display={"flex"} justifyContent={"space-between"} mb={3}>
        <Typography variant="body1">Total: </Typography>
        <Typography variant="body1"> ${total}</Typography>
      </Box>

      <Box display={"flex"} justifyContent={"space-between"} gap={2}>
        {!checkoutDisable && (
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/cart/checkout"
          >
            <Button
              disableElevation
              disableRipple
              variant="contained"
              sx={{
                padding: "10px 50px",
                fontWeight: "bold",
                fontSize: "1.1rem",
                borderRadius: 20,
                minWidth: "200px",
                height: "60px",
              }}
            >
              Checkout
            </Button>
          </Link>
        )}

        <Link
          style={{
            textDecoration: "none",
            color: "black",
            width: "100%",

            marginTop: checkoutDisable ? "45px" : 0,
          }}
          to="/cart"
        >
          <Button
            color="warning"
            sx={{
              borderRadius: 20,

              "&:hover, &:focus": {
                border: `2px solid ${theme.palette.basicText.main}`,
              },
              border: `2px solid ${theme.palette.border.main}`,
              minWidth: "100%",
              padding: "12px 22px",
              fontSize: 18,
              fontWeight: "bold",
              letterSpacing: 1,
            }}
            variant="outlined"
          >
            Edit Cart
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default CartPreview;
