import { useContext } from "react";
import CartContext from "../../context/CartContext";
import { Link } from "react-router-dom";
import CartItem from "../ CartItem/CartItem";
import { Box, Button } from "@mui/material";

const CartPreview = () => {
  const { cart, cartClear, total, quantity } = useContext(CartContext);

  if (quantity === 0) {
    return (
      <Box>
        <h2>No hay productos en el carrito.</h2>
        <Link to="/category/all">Ver Productos</Link>
      </Box>
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
      <h3>Total: ${total}</h3>
      <h3>Total Amount: {quantity}</h3>
      <Button onClick={() => cartClear()}>Empty Cart</Button>
      <Link to="/checkout">Finalizar compra</Link>
    </Box>
  );
};

export default CartPreview;
