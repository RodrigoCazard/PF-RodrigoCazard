import React, { useState, createContext, useEffect } from "react";
import { toast } from "sonner";
import {
  getLocalStorage,
  saveCartToLocalStorage,
} from "../components/Utils/localStorageSave";

export const CartContext = createContext({
  cart: [],
  total: 0,
  quantity: 0,
});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const cartData = getLocalStorage();

    setCart(cartData.storedCart);
    setQuantity(cartData.storedQuantity);
    setTotal(cartData.storedTotal);
  }, []);

  useEffect(() => {
    saveCartToLocalStorage(cart);
  }, [cart]);

  const cartAdd = (item, quantity) => {
    const itemExist = cart.find((prod) => prod.item.id === item.id);

    if (!itemExist) {
      setCart((prev) => [...prev, { item, quantity }]);
      setQuantity((prev) => prev + quantity);
      setTotal((prev) => prev + item.price * quantity);
    } else {
      const newCart = cart.map((prod) => {
        if (prod.item.id === item.id) {
          setTotal((prev) => prev + item.price * quantity);
          setQuantity((prev) => prev + quantity);
          return { ...prod, quantity: prod.quantity + quantity };
        } else {
          return prod;
        }
      });

      setCart(newCart);
    }

    toast.success("Product added to the cart successfully");
  };

  const cartRemove = (id) => {
    const deleteProduct = cart.find((prod) => prod.item.id === id);
    const newCart = cart.filter((prod) => prod.item.id !== id);

    setCart(newCart);
    setQuantity((prev) => prev - deleteProduct.quantity);
    setTotal(
      (prev) => prev - deleteProduct.item.price * deleteProduct.quantity
    );
  };

  const cartClear = () => {
    setCart([]);
    setQuantity(0);
    setTotal(0);
  };

  const cartUpdate = (item, quantity) => {
    const newCart = cart.map((prod) => {
      if (prod.item.id === item.id) {
        setTotal(item.price * quantity);
        setQuantity(quantity);

        return { ...prod, quantity: quantity };
      } else {
        return prod;
      }
    });
    setCart(newCart);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        total,
        quantity: quantity,
        cartAdd,
        cartRemove,
        cartClear,
        cartUpdate,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
