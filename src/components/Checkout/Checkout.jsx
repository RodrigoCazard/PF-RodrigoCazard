import React, { useState, useContext, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../services/config";
import {
  Box,
  Breadcrumbs,
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import CartContext from "../../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import { toast } from "sonner";
import Profile from "../Profile/Profile";
import CartPreview from "../Cart/CartPreview";

const Checkout = () => {
  const { isAuthenticated, user } = useAuth();
  const { cart, total, quantity, cartClear } = useContext(CartContext);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const q = query(collection(db, "users"), where("uid", "==", user?.uid));
        const docSnap = await getDocs(q);

        const data = docSnap.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        if (data) {
          setUserData(data[0]);
        } else {
          console.log("Usuario no encontrado en Firestore");
        }
      } catch (error) {
        console.error("Error al obtener datos de usuario:", error);
      }
    };

    if (isAuthenticated()) {
      fetchUserData();
    }
  }, [user?.uid, isAuthenticated]);

  const handlePurchase = async () => {
    if (!isAuthenticated()) {
      toast.error("You must log in to make a purchase");
      navigate("/login");
      return;
    }

    // Aquí puedes agregar la lógica para procesar la compra y enviar el ticket a Firebase
    const db = getFirestore();
    const purchasesCollection = collection(db, "purchases");

    try {
      console.log(user);
      const docRef = await addDoc(purchasesCollection, {
        userData: {
          id: user?.uid,
          userName: user?.displayName,
          userPhone: userData?.phone,
          userAddress: userData?.address,
          userEmail: user?.email,
          userCountry: userData?.country,
        },
        products: cart.map((product) => ({
          id: product.item.id,
          name: product.item.name,
          quantity: product.quantity,
        })),
        total: total,
        quantity: quantity,
        timestamp: serverTimestamp(),
      });

      cartClear();
      navigate("/");
      window.scrollTo(0, 0);
      console.log("Compra realizada con éxito. Ticket creado:", docRef.id);
    } catch (error) {
      console.error("Error al realizar la compra", error.message);
    }
  };

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
    <div>
      <Breadcrumbs
        sx={{ margin: "20px 0 40px 0" }}
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        <StyledLink to="/">Home page</StyledLink>
        <StyledLink to="/cart">Cart</StyledLink>
        <Typography color="text.primary">Checkout</Typography>
      </Breadcrumbs>

      {isAuthenticated() ? (
        <>
          <Box display={"flex"} gap={20} marginY={10}>
            <Box width={"50%"}>
              <Profile></Profile>
            </Box>
            <Box
              padding={"20px 50px"}
              width={"50%"}
              border={"2px solid rgba(0,0,0,0.1)"}
              borderRadius={15}
            >
              <CartPreview checkoutDisable={true} />
            </Box>
          </Box>
        </>
      ) : (
        <h2>Debes iniciar sesión para acceder al checkout.</h2>
      )}
    </div>
  );
};

export default Checkout;