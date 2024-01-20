import { useContext } from "react";
import CartContext from "../../context/CartContext";
import { Link } from "react-router-dom";
import CartItem from "../ CartItem/CartItem";
import { Box, Button, Typography } from "@mui/material";

const CartPreview = ({ checkoutDisable }) => {
  const { cart, cartClear, total, quantity } = useContext(CartContext);

  if (quantity === 0) {
    return (
      <>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-around"}
          gap={4}
        >
          <Typography variant="body2">
            There are no products in the cart.
          </Typography>
          <Link to="/category/all">
            {" "}
            <Button
              variant="contained"
              disableElevation
              sx={{ borderRadius: 15 }}
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
      {cart.map((prod) => (
        <CartItem
          quantityProp={prod.quantity}
          key={prod.item.id}
          {...prod.item}
        ></CartItem>
      ))}
      <Box display={"flex"} justifyContent={"space-between"} mb={3}>
        <Typography variant="body1">Total: </Typography>
        <Typography variant="body1"> ${total}</Typography>
      </Box>

      <Box display={"flex"} justifyContent={"space-between"} gap={2}>
        {!checkoutDisable && (
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/checkout"
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

        <Link style={{ textDecoration: "none", color: "black" }} to="/cart">
          <Button
            color="warning"
            sx={{
              borderRadius: 20,

              "&:hover, &:focus": {
                border: "2px solid #000",
              },
              border: "2px solid rgba(0,0,0,0.1)",
              minWidth: "200px",
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
