import React from "react";
import { useCounter } from "../../hooks/useCounter";
const CustomHooks = () => {
  const { count, increment, decrement } = useCounter(1, 10);

  return (
    <div>
      <h2>Contador</h2>
      <button onClick={increment}>+</button>
      <button>{count}</button>
      <button onClick={decrement}>-</button>
    </div>
  );
};

export default CustomHooks;
