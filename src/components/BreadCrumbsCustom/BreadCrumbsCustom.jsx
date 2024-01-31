import { Breadcrumbs, Typography } from "@mui/material";
import React from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { useTheme } from "@emotion/react";

const BreadCrumbsCustom = ({ breadCrumbs }) => {
  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;

  const StyledLink = styled(Link)`
    text-decoration: none;
    color: ${theme.palette.basicText.main};
    opacity: 0.6;

    &:hover {
      opacity: 1;
      color: ${primaryColor};
    }
  `;

  return (
    <Breadcrumbs
      sx={{ margin: "20px 0 40px 0" }}
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
    >
      <StyledLink to={`/`}>Home page</StyledLink>
      {breadCrumbs.slice(0, -1).map((breadcrumb, index) => (
        <StyledLink key={index} to={breadcrumb.link}>
          {breadcrumb.name}
        </StyledLink>
      ))}

      <Typography color="text.primary">
        {breadCrumbs[breadCrumbs.length - 1]}
      </Typography>
    </Breadcrumbs>
  );
};

export default BreadCrumbsCustom;
