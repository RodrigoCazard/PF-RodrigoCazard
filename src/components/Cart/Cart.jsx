import { useContext } from "react";
import CartContext from "../../context/CartContext";
import { Link } from "react-router-dom";
import CartItem from "../ CartItem/CartItem";
import { Button } from "@mui/material";

const Cart = () => {
  const { cart, cartClear, total, quantity } = useContext(CartContext);

  if (quantity === 0) {
    return (
      <>
        <h2>No hay productos en el carrito.</h2>
        <Link to="/category/all">Ver Productos</Link>
      </>
    );
  }

  return (
    <div>
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
    </div>
  );
};

export default Cart;
