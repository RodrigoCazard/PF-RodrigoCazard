import React, { useState, createContext, useEffect } from "react";

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
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const storedQuantity = storedCart.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    const storedTotal = storedCart.reduce(
      (acc, item) => acc + item.item.price * item.quantity,
      0
    );

    setCart(storedCart);
    setQuantity(storedQuantity);
    setTotal(storedTotal);
  }, []);

  const saveCartToLocalStorage = (cartData) => {
    localStorage.setItem("cart", JSON.stringify(cartData));
  };

  console.log(cart);
  console.log(total);
  console.log(quantity);
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
    saveCartToLocalStorage(cart);
  };

  const cartRemove = (id) => {
    const deleteProduct = cart.find((prod) => prod.item.id === id);
    const newCart = cart.filter((prod) => prod.item.id !== id);

    setCart(newCart);
    setQuantity((prev) => prev - deleteProduct.quantity);
    setTotal(
      (prev) => prev - deleteProduct.item.price * deleteProduct.quantity
    );
    saveCartToLocalStorage(cart);
  };

  const cartClear = () => {
    setCart([]);
    setQuantity(0);
    setTotal(0);
    saveCartToLocalStorage(cart);
  };

  const cartUpdate = (item, quantity) => {
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
    saveCartToLocalStorage(cart);
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
