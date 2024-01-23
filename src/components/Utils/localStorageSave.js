export const getLocalStorage = () => {
  const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
  const storedQuantity = storedCart.reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  const storedTotal = storedCart.reduce(
    (acc, item) => acc + item.item.price * item.quantity,
    0
  );
  console.log(storedCart, storedQuantity, storedTotal);
  return { storedCart, storedQuantity, storedTotal };
};

export const saveCartToLocalStorage = (cartData) => {
  console.log(cartData);

  localStorage.setItem("cart", JSON.stringify(cartData));
};
