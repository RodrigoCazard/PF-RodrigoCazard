import { Box, Button, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import { useContext } from "react";
import CartContext from "../../context/CartContext";
import ClearIcon from "@mui/icons-material/Clear";
import Counter from "../Counter/Counter";
import { Link } from "react-router-dom";

const CartItem = ({ img, id, name, price, quantityProp, stock, variant }) => {
  const { cartRemove } = useContext(CartContext);
  const { cartUpdate } = useContext(CartContext);
  const handleCartRemove = () => {
    cartRemove(id);
  };

  const [count, setCount] = useState(quantityProp);

  const handleUpdate = (updatedCount) => {
    cartUpdate({ img, id, name, price, stock }, updatedCount);
  };

  const increment = () => {
    if (count > stock - 1) {
      setCount(Number(stock));
    } else {
      setCount(count + 1);
      handleUpdate(count + 1);
    }
  };
  const decrement = () => {
    if (count === 1) {
      setCount(1);
    } else {
      setCount(count - 1);
      handleUpdate(count - 1);
    }
  };

  return (
    <>
      <Box display={"flex"} mb={2}>
        <img
          src={img}
          alt=""
          width={variant ? "200px" : "100px"}
          style={{ objectFit: "contain" }}
        />

        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
          paddingY={3}
          paddingBottom={variant ? 0 : 3}
          mx={3}
        >
          {" "}
          <Link
            to={`/item/${id}`}
            style={{ textDecoration: "none", color: "rgba(0,0,0,0.9)" }}
          >
            <Typography
              fontWeight={"bold"}
              variant={variant ? "body1" : "subtitle1"}
              width={"100%"}
            >
              {name}
            </Typography>
          </Link>
          <Typography variant={variant ? "subtitule1" : "subtitle2"}>
            {quantityProp} x ${price}
          </Typography>
          {variant && (
            <Box display={"flex"}>
              <Box height={"100%"}>
                <Counter
                  count={count}
                  stock={stock}
                  handleUpdate={handleUpdate}
                  increment={increment}
                  decrement={decrement}
                />
              </Box>
              <IconButton
                onClick={handleCartRemove}
                disableElevation
                disableRipple
                sx={{
                  color: "black",
                  border: "2px solid rgba(0,0,0,0.1)",
                  transition: "border 0.3s, color 0.3s",
                  height: "60px",
                  width: "60px",

                  "&:hover, &:focus": {
                    border: "2px solid #000",
                  },
                }}
              >
                <ClearIcon fontSize={"large"} />
              </IconButton>
            </Box>
          )}
        </Box>
        {!variant && (
          <IconButton
            onClick={handleCartRemove}
            disableElevation
            disableRipple
            sx={{
              color: "black",
              border: "2px solid rgba(0,0,0,0.01)",
              transition: "border 0.3s, color 0.3s",
              height: "40px",
              width: "40px",
              my: "auto",
              ml: "auto",
              "&:hover, &:focus": {
                border: "2px solid #000",
              },
            }}
          >
            <ClearIcon />
          </IconButton>
        )}
      </Box>
    </>
  );
};
export default CartItem;
