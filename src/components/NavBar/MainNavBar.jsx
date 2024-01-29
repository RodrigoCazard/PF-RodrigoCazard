import { useState, useEffect } from "react";
import CartWidget from "./CartWidget.jsx";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import SearchWidget from "./SearchWidget.jsx";
import NavWidget from "./NavWidget.jsx";
import LogoImg from "../../assets/logo.png";
import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import ProfileActionsOverlay from "../Profile/ProfileActionsOverlay.jsx";
import VerificationMessage from "../VerificationMessage/VerificationMessage.jsx";
import { Grid } from "@mui/material";

const MainNavBar = ({ isOpen, toggleMenu }) => {
  const { user } = useAuth();
  const verify = user?.reloadUserInfo.emailVerified;
  let authState;

  if (user && !verify) {
    authState = true;
  } else {
    authState = false;
  }

  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsOverlayVisible(true);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      setIsOverlayVisible(false);
    }, 200);
  };

  const isAuthenticated = useAuth().isAuthenticated();

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 70) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleToggle = () => {
    toggleMenu();
  };

  const theme = useTheme();

  const primaryColor = theme.palette.primary.main;

  const styledMainNavBar = {
    styledHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",

      transition: "background-color 0.3s, padding 0.3s, box-shadow 0.3s",
      backgroundColor: "white",
      padding: scrolled ? "10px 10%" : "30px 10%",
      boxShadow: scrolled ? "0px 2px 5px rgba(0, 0, 0, 0.1)" : "none",
    },
    styledIcon: {
      transition: "all 0.5s ease",
      opacity: 0.8,
      display: "inline-block",
      cursor: "pointer",
      "&:hover": {
        transform: "scale(1.2)",
        opacity: 1,
        color: primaryColor,
      },
    },
  };

  return (
    <>
      <Box height={authState ? "170px" : "120px"}>
        <Box component={"header"} position={"fixed"} width={"100%"} zIndex={1}>
          <Box>
            {" "}
            <VerificationMessage
              user={user}
              verify={verify}
            ></VerificationMessage>
          </Box>
          <Box style={styledMainNavBar.styledHeader}>
            <NavWidget isOpen={isOpen} toggleMenu={handleToggle} sx={{}} />{" "}
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              <Box
                display={"flex"}
                alignItems={"center"}
                sx={{ cursor: "pointer" }}
              >
                <img
                  src={LogoImg}
                  alt="Store logo"
                  style={{ display: "block", width: 45, marginRight: "10px" }}
                />
                <Typography
                  variant="body1"
                  component="h1"
                  sx={{
                    display: {
                      xs: "none",
                      sm: "block",
                    },
                  }}
                >
                  ByteTech
                </Typography>
              </Box>
            </Link>
            <Box sx={{ display: "flex", gap: "4vw", alignItems: "center" }}>
              <SearchWidget />
              <CartWidget scrolled={scrolled} authState={authState} />
              <Link
                to={isAuthenticated ? "/profile" : "/login"}
                style={{ textDecoration: "none", color: "black" }}
              >
                <AccountCircleOutlinedIcon
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  fontSize="large"
                  sx={{
                    ...styledMainNavBar.styledIcon,
                    display: {
                      xs: "none",
                      sm: "flex",
                    },
                  }}
                />
                <ProfileActionsOverlay
                  authState={authState}
                  isVisible={isOverlayVisible}
                  scrolled={scrolled}
                ></ProfileActionsOverlay>
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default MainNavBar;
