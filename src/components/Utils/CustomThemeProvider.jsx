import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { purple, green } from "@mui/material/colors";
import PropTypes from "prop-types";

const CustomThemeProvider = ({ children }) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: purple[500],
      },
      secondary: {
        main: green[500],
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
    typography: {
      fontFamily: "Roboto, sans-serif",
    },
  });

  // Modificar las fuentes después de definir los breakpoints
  theme.typography.h1 = {
    fontFamily: "Roboto, sans-serif",
    fontSize: "2.5rem",
    [theme.breakpoints.down("md")]: {
      fontSize: "2rem",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",
    },
  };

  theme.typography.h2 = {
    fontFamily: "Roboto, sans-serif",
    fontSize: "2.5rem",
    [theme.breakpoints.down("md")]: {
      fontSize: "2rem",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "3.5rem",
    },
  };

  theme.typography.h3 = {
    fontFamily: "Roboto, sans-serif",
    fontSize: "2rem",
    [theme.breakpoints.down("md")]: {
      fontSize: "1.5rem",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2rem",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "3.5rem",
    },
  };

  theme.typography.body1 = {
    fontFamily: "Roboto, sans-serif",
    fontSize: "1.2rem",
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.4rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1.6rem",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "1.8rem",
    },
  };
  theme.typography.body2 = {
    fontSize: "1rem",
    fontWeight: "light",
    [theme.breakpoints.up("sm")]: {
      fontSize: "1rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1.1rem",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "1.2rem",
    },
  };
  theme.typography.body3 = {
    fontSize: "17px",
    letterSpacing: "3px",
    fontWeight: "light",
    display: "block",
    opacity: "0.8",
    cursor: "pointer",
    transition: "all .2s ease",
    "&:hover": {
      opacity: 1,
      transform: "scale(1.02)",
    },
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

CustomThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CustomThemeProvider;
