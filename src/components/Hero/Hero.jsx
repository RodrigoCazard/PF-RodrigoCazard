import { Grid, Button, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Img from "../../assets/icon-image-not-found-free-vector.jpg";

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
        md={6}
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
        <Button
          disableElevation
          size="large"
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
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        padding={"40px"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <img
          src={Img}
          alt="Imagen de computadora"
          style={{ objectFit: "contain", width: "80%" }}
        ></img>
      </Grid>
    </Grid>
  );
};

export default Hero;
