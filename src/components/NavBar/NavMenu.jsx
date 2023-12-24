import { Box, Typography } from "@mui/material";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useTheme } from "@mui/material/styles";
import { BrowserRouter, Link, NavLink, Route, Routes } from "react-router-dom";
const NavMenu = ({ isOpen, toggleMenu }) => {
  const [showCategoriesMenu, setShowCategoriesMenu] = useState(false);

  const handleCategoriesClick = () => {
    setShowCategoriesMenu(!showCategoriesMenu);
  };

  const handleToggle = () => {
    toggleMenu();
  };
  const theme = useTheme();

  const primaryColor = theme.palette.primary.main;

  const styleSocial = {
    cursor: "pointer",
    opacity: 0.8,
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.1) ",
      opacity: 1,
      color: primaryColor,
    },
  };

  const styleLink = {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    opacity: 0.8,
    color: "black",
    position: "relative",
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.1) ",
      opacity: 1,
    },
  };

  const styleCategories = {
    opacity: showCategoriesMenu ? 1 : 0.8,
    transform: showCategoriesMenu ? "scale(1.1)" : "scale(1)",
  };
  return (
    <Box padding={"0 9%"}>
      <Box
        mt={"20px"}
        component={"ul"}
        sx={{
          listStyle: "none",
          display: "inline-flex",
          flexDirection: "column",
          rowGap: "20px",
        }}
      >
        <Typography
          variant="body1"
          component={"li"}
          sx={styleLink}
          onClick={handleToggle}
        >
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            Home
          </Link>
        </Typography>
        <Typography
          onClick={handleCategoriesClick}
          component={"li"}
          sx={{ ...styleLink, ...styleCategories }}
        >
          Categories
          <ExpandMoreIcon
            fontSize="large"
            sx={{ transform: "rotate(-90deg)" }}
          />
          {showCategoriesMenu ? (
            <Box
              position={"absolute"}
              right={"-100%"}
              top={"0%"}
              display={"flex"}
              flexDirection={"column"}
              rowGap={2}
            >
              <Typography variant="body1" sx={styleLink} component={"li"}>
                <NavLink
                  onClick={handleToggle}
                  to="/category/laptop"
                  style={{ ...styleLink, textDecoration: "none" }}
                >
                  Laptop
                </NavLink>
              </Typography>

              <Typography variant="body1" component={"li"} sx={styleLink}>
                <NavLink
                  onClick={handleToggle}
                  to="/category/desktop"
                  style={{ ...styleLink, textDecoration: "none" }}
                >
                  Desktop
                </NavLink>
              </Typography>
              <Typography variant="body1" sx={styleLink} component={"li"}>
                <NavLink
                  onClick={handleToggle}
                  to="/category/mobilePhone"
                  style={{ ...styleLink, textDecoration: "none" }}
                >
                  Mobile phone
                </NavLink>
              </Typography>
              <Typography variant="body1" sx={styleLink} component={"li"}>
                <NavLink
                  onClick={handleToggle}
                  to="/category/printer"
                  style={{ ...styleLink, textDecoration: "none" }}
                >
                  Printer
                </NavLink>
              </Typography>
              <Typography variant="body1" sx={styleLink} component={"li"}>
                <NavLink
                  onClick={handleToggle}
                  to="/category/others"
                  style={{ ...styleLink, textDecoration: "none" }}
                >
                  Others
                </NavLink>
              </Typography>
            </Box>
          ) : (
            <></>
          )}
        </Typography>
        <Typography component={"li"} sx={styleLink}>
          About
        </Typography>
        <Typography component={"li"} sx={styleLink}>
          Contact
        </Typography>
      </Box>

      <Box
        position={"absolute"}
        component={"footer"}
        bgcolor={"white"}
        width={"80%"}
        height={80}
        bottom={"0"}
        display={"flex"}
        alignItems={"center"}
      >
        <Box display={"flex"} gap={8}>
          <FacebookIcon sx={styleSocial} fontSize="large"></FacebookIcon>
          <InstagramIcon sx={styleSocial} fontSize="large"></InstagramIcon>
          <TwitterIcon sx={styleSocial} fontSize="large"></TwitterIcon>
        </Box>
      </Box>
    </Box>
  );
};

export default NavMenu;
