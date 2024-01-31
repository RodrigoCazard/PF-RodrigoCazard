import React from "react";
import ProfileDetails from "./ProfileDetails";
import ProfileActions from "./ProfileActions";
import { Box, Breadcrumbs, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { useAuth } from "../../context/AuthContext.jsx";
import NotLogged from "../NotLogged/NotLogged.jsx";
import BreadCrumbsCustom from "../BreadCrumbsCustom/BreadCrumbsCustom.jsx";
const Profile = () => {
  const { user, isAuthenticated } = useAuth();

  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;

  const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
    opacity: 0.6;

    &:hover {
      text-decoration: underline;
      opacity: 1;
      color: ${primaryColor};
    }
  `;

  return (
    <>
      <BreadCrumbsCustom breadCrumbs={["Profile"]} />
      <Box>
        <Typography variant="body1" color={"primary"} component={"p"} mb={1}>
          - Profile
        </Typography>
        <Typography variant="h3" component="h2">
          All your information
        </Typography>
      </Box>
      {isAuthenticated() ? (
        <>
          <Box display={"flex"} my={10}>
            <Box
              width={"100%"}
              mr={7}
              padding={"40px 80px"}
              border={`2px solid ${theme.palette.border.main}`}
              borderRadius={15}
              mb={"40px"}
            >
              <Typography variant="h4" mb={5}>
                Profile Info{" "}
              </Typography>
              <ProfileDetails></ProfileDetails>
            </Box>
            <ProfileActions></ProfileActions>
          </Box>
        </>
      ) : (
        <NotLogged></NotLogged>
      )}
    </>
  );
};

export default Profile;
