import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useContext } from "react";
import CartContext from "../../context/CartContext";

const CartItem = ({ id, nombre, price, quantityProp }) => {
  const { cartRemove } = useContext(CartContext);

  const handleCartRemove = () => {
    cartRemove(id);
  };

  return (
    <>
      <Box>
        <Typography>{nombre}</Typography>
        <Typography>Id:{id}</Typography>
        <Typography>${price}</Typography>
        <Typography>Quantity:{quantityProp}</Typography>
        <Button onClick={handleCartRemove}>X</Button>
      </Box>
      <hr />
    </>
  );
};

export default CartItem;
