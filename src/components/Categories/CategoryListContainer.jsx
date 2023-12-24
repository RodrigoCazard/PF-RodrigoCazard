import { Box, Button, Typography } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import LaptopIcon from "@mui/icons-material/Laptop";
import DesktopMacOutlinedIcon from "@mui/icons-material/DesktopMacOutlined";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const CategoryListContainer = () => {
  const StyledBox = styled("div")({
    position: "relative",
    minWidth: "220px",
    minHeight: "170px",
    display: "flex",
    cursor: "pointer",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: 10,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.03)",
    fontWeight: "bold",
    transition: "all 0.2s ease",
    "&:hover": {
      transform: "translateY(-10px)",
    },
  });

  return (
    <Box component={"section"} my={"120px"}>
      <Typography variant="body1" color={"primary"} component={"p"} mb={1}>
        - The Categories
      </Typography>
      <Typography variant="h3" component="h2" sx={{}}>
        Browse by Category
      </Typography>

      <Box
        transition={"all 0.3s ease-in-out;"}
        display={"flex"}
        gap={4}
        my={10}
        flexWrap={"wrap"}
        justifyContent={"center"}
      >
        <Link
          to={"/category/desktop"}
          style={{ textDecoration: "none", color: "black" }}
        >
          <StyledBox>
            <DesktopMacOutlinedIcon
              fontSize="large"
              color="primary"
            ></DesktopMacOutlinedIcon>
            Desktop
          </StyledBox>
        </Link>
        <Link
          to={"/category/laptop"}
          style={{ textDecoration: "none", color: "black" }}
        >
          <StyledBox>
            <LaptopIcon fontSize="large" color="primary"></LaptopIcon>
            Laptop
          </StyledBox>
        </Link>
        <Link
          to={"/category/mobilePhone"}
          style={{ textDecoration: "none", color: "black" }}
        >
          <StyledBox>
            <PhoneIphoneOutlinedIcon
              fontSize="large"
              color="primary"
            ></PhoneIphoneOutlinedIcon>
            Mobile phone
          </StyledBox>
        </Link>
        <Link
          to={"/category/printer"}
          style={{ textDecoration: "none", color: "black" }}
        >
          <StyledBox>
            <LocalPrintshopOutlinedIcon
              fontSize="large"
              color="primary"
            ></LocalPrintshopOutlinedIcon>
            Printer
          </StyledBox>
        </Link>
        <Link
          to={"/category/others"}
          style={{ textDecoration: "none", color: "black" }}
        >
          <StyledBox>
            <ControlPointOutlinedIcon
              fontSize="large"
              color="primary"
            ></ControlPointOutlinedIcon>
            Others
          </StyledBox>
        </Link>
      </Box>
    </Box>
  );
};

export default CategoryListContainer;
