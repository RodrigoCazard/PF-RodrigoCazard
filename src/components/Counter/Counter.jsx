import { Box } from "@mui/material";
import React from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useTheme } from "@emotion/react";

const Counter = ({ count, decrement, increment, stock }) => {
  const theme = useTheme();

  const isMinCount = count === 1;
  const isMaxCount = count === stock;

  const handleDecrement = () => {
    if (!isMinCount) {
      decrement();
    }
  };

  const handleIncrement = () => {
    if (!isMaxCount) {
      increment();
    }
  };

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
      border={`2px solid ${theme.palette.border.main}`}
    >
      <KeyboardArrowLeftIcon
        onClick={handleDecrement}
        style={{
          cursor: isMinCount ? "" : "pointer",
          opacity: isMinCount ? 0.5 : 1,
        }}
        fontSize="large"
        sx={{ height: "100%" }}
      ></KeyboardArrowLeftIcon>

      <p>{count}</p>

      <KeyboardArrowRightIcon
        onClick={handleIncrement}
        style={{
          cursor: isMaxCount ? "" : "pointer",
          opacity: isMaxCount ? 0.5 : 1,
        }}
        fontSize="large"
        sx={{ height: "100%" }}
      ></KeyboardArrowRightIcon>
    </Box>
  );
};

export default Counter;
