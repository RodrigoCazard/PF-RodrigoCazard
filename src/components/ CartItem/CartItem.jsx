import { Box, Button, IconButton, Typography } from "@mui/material";
import React from "react";
import { useContext } from "react";
import CartContext from "../../context/CartContext";
import ClearIcon from "@mui/icons-material/Clear";

const CartItem = ({ img, id, name, price, quantityProp }) => {
  const { cartRemove } = useContext(CartContext);

  const handleCartRemove = () => {
    cartRemove(id);
  };

  return (
    <>
      <Box display={"flex"} mb={2}>
        <img
          src={img}
          alt=""
          width={"100px"}
          style={{ objectFit: "contain" }}
        />
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-around"}
          paddingY={3}
          mx={3}
        >
          <Typography fontWeight={"bold"} variant="subtitle1" width={"250px"}>
            {name}
          </Typography>
          <Typography variant="subtitle1">
            {quantityProp} x ${price}
          </Typography>
        </Box>

        <IconButton
          onClick={handleCartRemove}
          disableElevation
          disableRipple
          sx={{
            color: "black",
            border: "2px solid rgba(0,0,0,0.1)",
            transition: "border 0.3s, color 0.3s",
            height: "40px",
            width: "40px",
            marginY: "auto",
            marginLeft: "auto",
            "&:hover, &:focus": {
              border: "2px solid #000",
            },
          }}
        >
          <ClearIcon />
        </IconButton>
      </Box>
    </>
  );
};

export default CartItem;
