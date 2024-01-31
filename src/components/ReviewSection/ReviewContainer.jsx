import { Grid } from "@mui/material";
import React from "react";
import ReviewTitle from "./ReviewTitle";
import ReviewComents from "./ReviewComents";
import { useTheme } from "@emotion/react";

const ReviewContainer = ({ variant }) => {
  const theme = useTheme();
  return (
    <Grid
      px={"8%"}
      py={"8%"}
      container
      sx={{
        backgroundColor: theme.palette.customColor1.main,
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
