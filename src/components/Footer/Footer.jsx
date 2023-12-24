import { Box, Grid, Typography, styled } from "@mui/material";
import React from "react";
import LogoImg from "../../assets/logo.png";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
const Footer = () => {
  const LogoImage = styled("img")(({ theme }) => ({
    width: 35,
    marginRight: "10px",
    display: "block",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  }));

  const theme = useTheme();

  const primaryColor = theme.palette.primary.main;

  const styleSocial = {
    opacity: 0.8,
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.1) ",
      opacity: 1,
      color: primaryColor,
    },
  };

  const BoxSocial = {
    bgcolor: "rgba(0,0,0,0.05)",
    display: "inline-flex",
    padding: 1,
    borderRadius: "50%",
    cursor: "pointer",
  };

  return (
    <Grid container spacing={3} mb={"120px"}>
      <Grid
        item
        xs={6}
        md={3}
        display={"flex"}
        flexDirection={"column"}
        gap={2}
      >
        <Box display="flex" alignItems="center" sx={{ cursor: "pointer" }}>
          <LogoImage src={LogoImg} alt="Store logo" />
          <Typography variant="h5" component="h1">
            ByteTech
          </Typography>
        </Box>
        <Typography variant="subtitle1">
          © 2023 - All rights reserved
        </Typography>
        <Box display={"flex"} gap={2} mt={3}>
          <Box sx={BoxSocial}>
            <FacebookIcon sx={styleSocial} fontSize="normal"></FacebookIcon>
          </Box>
          <Box sx={BoxSocial}>
            <InstagramIcon sx={styleSocial} fontSize="normal"></InstagramIcon>
          </Box>
          <Box sx={BoxSocial}>
            <TwitterIcon sx={styleSocial} fontSize="normal"></TwitterIcon>
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={6}
        md={3}
        display={"inline-flex"}
        flexDirection={"column"}
        gap={2}
      >
        <Typography variant="h5">Categories</Typography>
        <Link
          to={"/category/desktop"}
          style={{ textDecoration: "none", color: "black" }}
        >
          <Typography variant="body3">Desktop</Typography>{" "}
        </Link>
        <Link
          to={"/category/laptop"}
          style={{ textDecoration: "none", color: "black" }}
        >
          <Typography variant="body3">Laptop</Typography>{" "}
        </Link>
        <Link
          to={"/category/mobilePhone"}
          style={{ textDecoration: "none", color: "black" }}
        >
          <Typography variant="body3">Mobile phone</Typography>
        </Link>
        <Link
          to={"/category/printer"}
          style={{ textDecoration: "none", color: "black" }}
        >
          <Typography variant="body3">Printer</Typography>
        </Link>
        <Link
          to={"/category/others"}
          style={{ textDecoration: "none", color: "black" }}
        >
          <Typography variant="body3">Others</Typography>
        </Link>
      </Grid>
      <Grid
        item
        xs={6}
        md={3}
        display={"inline-flex"}
        flexDirection={"column"}
        gap={2}
      >
        <Typography variant="h5">Legal</Typography>
        <Typography variant="body3">Terms of Services</Typography>
        <Typography variant="body3">Privacy Policy</Typography>
        <Typography variant="body3">Returns Policy</Typography>
        <Typography variant="body3">Shipping</Typography>
        <Typography variant="body3">Data Protection</Typography>
      </Grid>
      <Grid
        item
        xs={6}
        md={3}
        display={"inline-flex"}
        flexDirection={"column"}
        gap={2}
      >
        <Typography variant="h5">Company</Typography>
        <Typography variant="body3">About</Typography>
        <Typography variant="body3">Faq</Typography>
        <Typography variant="body3">Contact</Typography>
        <Typography variant="body3">Vision</Typography>
        <Typography variant="body3">Culture</Typography>
      </Grid>
    </Grid>
  );
};

export default Footer;
