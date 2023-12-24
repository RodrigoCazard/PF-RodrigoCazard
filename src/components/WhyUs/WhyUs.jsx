import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import PersonPinCircleOutlinedIcon from "@mui/icons-material/PersonPinCircleOutlined";
import StarPurple500OutlinedIcon from "@mui/icons-material/StarPurple500Outlined";
import AssignmentReturnOutlinedIcon from "@mui/icons-material/AssignmentReturnOutlined";
const WhyUs = () => {
  return (
    <Box component={"section"} mb={"120px"}>
      <Box textAlign={"center"}>
        <Typography variant="body1" color={"primary"} component={"p"} mb={1}>
          - Why Us
        </Typography>
        <Typography variant={"h2"} component={"h2"}>
          Why People Choose Us
        </Typography>
      </Box>
      <Grid container spacing={9} justifyContent={"center"} mt={1}>
        <Grid item textAlign={"center"} lg={4} md={6}>
          <Box
            bgcolor={"rgba(0,0,0,0.05)"}
            display={"inline-flex"}
            padding={2}
            borderRadius={"50%"}
          >
            <AssignmentReturnOutlinedIcon
              sx={{ fontSize: "45px" }}
            ></AssignmentReturnOutlinedIcon>
          </Box>
          <Typography variant="body1" component={"p"} mb={3} mt={4}>
            Easy Returns
          </Typography>
          <Typography
            variant="body2"
            component={"p"}
            width={"60%"}
            margin={"auto"}
          >
            Our return policy is simple and that is why customers love our shop.
          </Typography>
        </Grid>
        <Grid item textAlign={"center"} lg={4} md={6}>
          <Box
            bgcolor={"rgba(0,0,0,0.05)"}
            display={"inline-flex"}
            padding={2}
            borderRadius={"50%"}
          >
            <PersonPinCircleOutlinedIcon
              sx={{ fontSize: "45px" }}
            ></PersonPinCircleOutlinedIcon>
          </Box>
          <Typography variant="body1" component={"p"} mb={3} mt={4}>
            Customer Service
          </Typography>
          <Typography
            variant="body2"
            component={"p"}
            width={"60%"}
            margin={"auto"}
          >
            We offer amazing customer service no matter what happens.
          </Typography>
        </Grid>
        <Grid item textAlign={"center"} lg={4} md={6}>
          <Box
            bgcolor={"rgba(0,0,0,0.05)"}
            display={"inline-flex"}
            padding={2}
            borderRadius={"50%"}
          >
            <StarPurple500OutlinedIcon
              sx={{ fontSize: "45px" }}
            ></StarPurple500OutlinedIcon>
          </Box>
          <Typography variant="body1" component={"p"} mb={3} mt={4}>
            High Quality
          </Typography>
          <Typography
            variant="body2"
            component={"p"}
            width={"60%"}
            margin={"auto"}
          >
            All of our products go through very strict inspection before we
            dispatch them.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WhyUs;
