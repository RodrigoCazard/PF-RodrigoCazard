import React from "react";
import ProfileDetails from "./ProfileDetails";
import ProfileActions from "./ProfileActions";
import { Box, Breadcrumbs, Grid, Typography } from "@mui/material";
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
          <Grid container my={10} columnSpacing={{ lg: 7, md: 0 }}>
            <Grid
              md={12}
              sm={12}
              xs={12}
              lg={8}
              item
              width={"fit-content"}
              height={"fit-content"}
              padding={"40px 80px"}
              border={`2px solid ${theme.palette.border.main}`}
              borderRadius={15}
            >
              <Typography variant="h4" mb={5}>
                Profile Info{" "}
              </Typography>
              <ProfileDetails></ProfileDetails>
            </Grid>
            <Grid
              item
              md={12}
              sm={12}
              xs={12}
              lg={4}
              mt={{ sx: 7, md: 7, xs: 7, lg: 0 }}
            >
              {" "}
              <ProfileActions></ProfileActions>
            </Grid>
          </Grid>
        </>
      ) : (
        <NotLogged></NotLogged>
      )}
    </>
  );
};

export default Profile;
