import { Box } from "@mui/material";
import React from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
const Counter = ({ count, decrement, increment }) => {
  return (
    <Box
      mr={2}
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      gap={4}
      height={"100%"}
      borderRadius={"50px"}
      padding={"0 10px"}
      border={"2px solid rgba(0,0,0,0.1)"}
    >
      <KeyboardArrowLeftIcon
        onClick={decrement}
        style={{ cursor: "pointer" }}
        fontSize="large"
        sx={{ height: "100%" }}
      ></KeyboardArrowLeftIcon>

      <p>{count}</p>

      <KeyboardArrowRightIcon
        onClick={increment}
        style={{ cursor: "pointer" }}
        fontSize="large"
        sx={{ height: "100%" }}
      ></KeyboardArrowRightIcon>
    </Box>
  );
};

export default Counter;
