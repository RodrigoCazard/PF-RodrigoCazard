import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useTheme } from "@mui/material/styles";
import { Link, NavLink, Route, Routes } from "react-router-dom";
import { getCategoryNames } from "../Utils/category";
import SwitchMode from "../SwitchMode/SwitchMode";

const NavMenu = ({ isOpen, toggleMenu, toggleDarkMode, darkMode }) => {
  const [showCategoriesMenu, setShowCategoriesMenu] = useState(false);
  const [categories, setCategories] = useState([]);
  const theme = useTheme();

  const handleCategoriesClick = () => {
    setShowCategoriesMenu(!showCategoriesMenu);
  };

  const handleToggle = () => {
    toggleMenu();
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryData = await getCategoryNames();
        setCategories(categoryData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

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
    color: theme.palette.basicText.main,
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
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: theme.palette.basicText.main,
            }}
          >
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
              right={"-110%"}
              top={"0%"}
              display={"flex"}
              flexDirection={"column"}
              rowGap={2}
            >
              {categories.map((category) => (
                <Typography
                  key={category.id}
                  variant="body1"
                  sx={styleLink}
                  component={"li"}
                >
                  <NavLink
                    onClick={handleToggle}
                    to={`/category/${category.id}`}
                    style={{ ...styleLink, textDecoration: "none" }}
                  >
                    {category.name}
                  </NavLink>
                </Typography>
              ))}
            </Box>
          ) : (
            <></>
          )}
        </Typography>
        <Typography component={"li"} sx={styleLink}>
          About
        </Typography>
        <Typography component={"li"} sx={styleLink}>
          <Link
            onClick={handleToggle}
            to="/contact"
            style={{
              textDecoration: "none",
              color: theme.palette.basicText.main,
            }}
          >
            Contact
          </Link>
        </Typography>
      </Box>

      <Box
        position={"absolute"}
        component={"footer"}
        width={"80%"}
        height={80}
        bottom={"0"}
        display={"flex"}
        alignItems={"center"}
      >
        <Box display={"flex"} gap={8} alignItems={"center"}>
          <FacebookIcon sx={styleSocial} fontSize="large"></FacebookIcon>
          <InstagramIcon sx={styleSocial} fontSize="large"></InstagramIcon>
          <TwitterIcon sx={styleSocial} fontSize="large"></TwitterIcon>
          <SwitchMode
            onClick={handleToggle}
            toggleDarkMode={toggleDarkMode}
            darkMode={darkMode}
          ></SwitchMode>
        </Box>
      </Box>
    </Box>
  );
};

export default NavMenu;
