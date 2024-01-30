import { Grid } from "@mui/material";
import React from "react";
import ReviewTitle from "./ReviewTitle";
import ReviewComents from "./ReviewComents";

const ReviewContainer = ({ variant }) => {
  return (
    <Grid
      px={"8%"}
      py={"8%"}
      container
      sx={{
        backgroundColor: "rgba(0,0,0,0.03)",
        borderRadius: 10,
        mb: "68px",

        width: "100%",
        height: "100%",
      }}
    >
      <Grid item lg={6} sm={12} xs={12} display={"flex"} alignItems={"center"}>
        <ReviewTitle variant={variant}></ReviewTitle>
      </Grid>
      <Grid item lg={6} sm={12} xs={12}>
        <ReviewComents></ReviewComents>
      </Grid>
    </Grid>
  );
};

export default ReviewContainer;
