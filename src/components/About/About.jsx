import React from "react";
import BreadCrumbsCustom from "../BreadCrumbsCustom/BreadCrumbsCustom";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import Img from "../../assets/hero-image.jpg";

const About = () => {
  const theme = useTheme();

  return (
    <>
      <BreadCrumbsCustom breadCrumbs={["About"]}></BreadCrumbsCustom>
      <Box mb={10}>
        <Typography variant="body1" color={"primary"} component={"p"} mb={1}>
          - Learn More
        </Typography>
        <Typography variant="h3" component="h2">
          All About Us
        </Typography>
      </Box>
      <Box
        marginBottom={20}
        sx={{
          backgroundImage: `url(${Img})`,
          borderRadius: 25,
          objectFit: "cover",
          width: "100%",
          height: { xs: "20vh", sm: "40vh", md: "60vh" },
          display: { xs: "none", sm: "block" },
        }}
      />
      <Grid container paddingX={"10%"} mb={15} spacing={{ sm: 7, md: 15 }}>
        <Grid item xs={12} md={6} sx={{ display: { xs: "none", sm: "block" } }}>
          <Typography variant="body1" color={"primary"} component={"p"} mb={1}>
            - How it has Started
          </Typography>
          <Typography variant="h3" component="h2" mb={5}>
            How and When it has All Started
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box mb={15}>
            <Typography
              mb={5}
              variant="h4"
              sx={{ color: theme.palette.primary.main, fontWeight: "bold" }}
            >
              <ul>
                <li> Best parts Only</li>
              </ul>
            </Typography>
            <Typography
              variant="body"
              sx={{
                letterSpacing: "1px",
                lineHeight: "50px",
              }}
              mb={3}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
              unde, animi optio quaerat totam iure eveniet distinctio eligendi
              explicabo molestias.
            </Typography>
          </Box>
          <Box>
            <Typography
              mb={5}
              variant="h4"
              sx={{ color: theme.palette.primary.main, fontWeight: "bold" }}
            >
              <ul>
                <li> Affordable Pricing Strategy</li>
              </ul>
            </Typography>
            <Typography
              variant="body"
              sx={{ letterSpacing: "1px", lineHeight: "50px" }}
              mb={3}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
              unde, animi optio quaerat totam iure eveniet distinctio eligendi
              explicabo molestias.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default About;
