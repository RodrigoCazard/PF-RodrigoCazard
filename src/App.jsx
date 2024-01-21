import "./App.css";
import MainNavBar from "./components/NavBar/MainNavBar";

import "./transitionStyles.css";
import ItemListContainer from "./components/Items/ItemListContainer";
import Hero from "./components/Hero/Hero";
import ScrollToTopOnRefresh from "./components/Utils/ScrollToTop";
import { useEffect, useState } from "react";
import Loader from "./components/Utils/Loader";
import NavMenu from "./components/NavBar/NavMenu";
import CategoryListContainer from "./components/Categories/CategoryListContainer";
import { Box } from "@mui/material";
import CustomThemeProvider from "./components/Utils/CustomThemeProvider";
import WhyUs from "./components/WhyUs/WhyUs";

import Newsletter from "./components/Newsletter/Newsletter";
import Footer from "./components/Footer/Footer";
import { Toaster } from "sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";
import { CartProvider } from "./context/CartContext.jsx";
import Cart from "./components/Cart/Cart.jsx";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

import Checkout from "./components/Checkout/Checkout.jsx";
import Profile from "./components/Profile/Profile.jsx";

import ScrollTopRoute from "./components/Utils/ScrollTopRoute.jsx";

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
            <BrowserRouter basename="PreEntrega-Dos-Cazard">
              <ScrollToTopOnRefresh />
              <Toaster
                position="bottom-left"
                richColors
                offset="64px"
                closeButton
                duration={2200}
                toastOptions={{
                  style: { fontSize: "1.2rem" },
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

                      <Routes>
                        <Route
                          path="/"
                          element={
                            <>
                              <Hero></Hero>
                              <CategoryListContainer></CategoryListContainer>
                              <ItemListContainer />
                              <WhyUs></WhyUs>

                              <Newsletter></Newsletter>
                            </>
                          }
                        />
                        <Route
                          path="/category/:category"
                          element={<ItemListContainer></ItemListContainer>}
                        />
                        <Route
                          path="/item/:idItem"
                          element={<ItemDetailContainer></ItemDetailContainer>}
                        />
                        <Route path="/login" element={<Login></Login>} />
                        <Route
                          path="/register"
                          element={<Register></Register>}
                        />
                        <Route path="/cart" element={<Cart></Cart>} />
                        <Route
                          path="/cart/checkout"
                          element={<Checkout></Checkout>}
                        />
                        <Route path="/profile" element={<Profile></Profile>} />
                      </Routes>

                      <Footer></Footer>
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
