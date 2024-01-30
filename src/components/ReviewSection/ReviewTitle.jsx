import { Box, Typography } from "@mui/material";
import React from "react";

const ReviewTitle = () => {
  return (
    <>
      <Box>
        <Typography variant="body1" color={"primary"} component={"p"} mb={1}>
          - Our Reviews
        </Typography>
        <Typography variant={"h2"} component={"h2"}>
          What our Customers are Saying
        </Typography>
      </Box>
    </>
  );
};

export default ReviewTitle;
