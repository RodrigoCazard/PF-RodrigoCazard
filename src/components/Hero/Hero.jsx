import { Grid, Button, Box } from "@mui/material";
import Typography from "@mui/material/Typography";

import { Link } from "react-router-dom";
import Carousel from "./Carousel";
const Hero = () => {
  const styledHero = {
    styledButton: {
      width: 300,
      height: 70,
      fontSize: "1.5rem",
      fontWeight: "bold",
      borderRadius: 10,
    },
    styledImg: {
      width: "70%",
      height: "auto",
      display: "block",
      objectFit: "contain",
    },
    styledGridContainer: {
      backgroundColor: "rgba(0,0,0,0.03)",
      borderRadius: 10,

      width: "100%",
      height: "100%",
      padding: "5px",
    },

    styledGridItems: {
      item1: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 4,
      },
    },

    styledBox: {
      width: "100%",
      height: "100%",
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },

    styledIcons: {
      arrows: {
        cursor: "pointer",
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
      },
    },
  };

  return (
    <Grid container sx={styledHero.styledGridContainer}>
      <Grid
        item
        xs={12}
        md={5}
        paddingLeft={"80px"}
        width={100}
        display={"flex"}
        justifyContent={"center"}
        alignContent={"center"}
        flexDirection={"column"}
      >
        <Box mb={6} ml={{ lg: 6, md: 0 }}>
          <Typography variant="body1" color={"primary"} component={"p"} mb={1}>
            - Tech Products
          </Typography>
          <Typography variant={"h2"} component={"h2"}>
            We Offer the Best Products for you
          </Typography>
        </Box>
        <Link
          to="/category/all"
          style={{
            textDecoration: "none",
            color: "white",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            disableElevation
            size="large"
            fullWidth
            variant="contained"
            sx={{
              fontWeight: "bold",
              fontSize: "1.1rem",
              borderRadius: 20,
              minWidth: "100px",
              minHeight: "60px",
            }}
          >
            Shop now
          </Button>
        </Link>
      </Grid>
      <Grid
        item
        xs={12}
        md={7}
        padding={"10px"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box width={"100%"}>
          <Carousel></Carousel>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Hero;
