import "./App.css";
import MainNavBar from "./components/NavBar/MainNavBar";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import "./transitionStyles.css";
import ScrollToTop from "react-scroll-up";
import ScrollToTopOnRefresh from "./components/ComponentsUtils/ScrollToTop.jsx";
import { useEffect, useState } from "react";
import Loader from "./components/ComponentsUtils/Loader.jsx";
import NavMenu from "./components/NavBar/NavMenu";

import { Box, IconButton } from "@mui/material";
import CustomThemeProvider from "./components/Theme/CustomThemeProvider.jsx";

import Footer from "./components/Footer/Footer";
import { Toaster } from "sonner";
import { BrowserRouter } from "react-router-dom";

import { CartProvider } from "./context/CartContext.jsx";

import { AuthProvider } from "./context/AuthContext.jsx";

import ScrollTopRoute from "./components/ComponentsUtils/ScrollTopRoute.jsx";

import AppRoutes from "./routes/Routes.jsx";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500); //Tiempo del loading

    return () => clearTimeout();
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const toggleMenu = () => {
    setIsOpen(!isOpen);

    if (!isOpen) {
      setScrollPosition(window.scrollY);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      window.scrollTo(0, scrollPosition);
    }
  }, [isOpen, scrollPosition]);

  return (
    <AuthProvider>
      <CartProvider>
        <>
          <CustomThemeProvider>
            <BrowserRouter>
              <ScrollToTopOnRefresh />
              <Toaster
                position="bottom-left"
                richColors
                offset="64px"
                closeButton
                duration={3000}
                toastOptions={{
                  style: { fontSize: "1.4rem" },
                }}
              />

              {loading ? (
                <Loader />
              ) : (
                <>
                  <MainNavBar isOpen={isOpen} toggleMenu={toggleMenu} />

                  {isOpen ? (
                    <NavMenu isOpen={isOpen} toggleMenu={toggleMenu}></NavMenu>
                  ) : (
                    <Box style={{ padding: "0 10%" }}>
                      <ScrollTopRoute />

                      <AppRoutes />

                      <Footer></Footer>
                      <ScrollToTop
                        showUnder={400}
                        style={{
                          padding: "30px 60px",
                        }}
                      >
                        <IconButton
                          color="primary"
                          sx={{
                            opacity: "0.9",
                            transition: "all 0.5s ease",
                            "&:hover": {
                              opacity: "1",
                              transform: "scale(1.1)",
                              color: "primary",
                            },
                          }}
                        >
                          <ArrowCircleUpIcon
                            style={{
                              opacity: "1",
                              fontSize: "4rem",
                            }}
                          ></ArrowCircleUpIcon>
                        </IconButton>
                      </ScrollToTop>
                    </Box>
                  )}
                </>
              )}
            </BrowserRouter>
          </CustomThemeProvider>
        </>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
