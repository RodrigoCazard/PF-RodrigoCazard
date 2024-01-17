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
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import CartContext from "../../context/CartContext";

const Checkout = () => {
  const { isAuthenticated, user } = useAuth();
  const { cart, total, quantity } = useContext(CartContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
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
  }, [user.uid, isAuthenticated]);

  const handlePurchase = async () => {
    if (!isAuthenticated()) {
      alert("Debes iniciar sesión para realizar la compra.");
      return;
    }

    // Aquí puedes agregar la lógica para procesar la compra y enviar el ticket a Firebase
    const db = getFirestore();
    const purchasesCollection = collection(db, "purchases");

    try {
      console.log(user);
      const docRef = await addDoc(purchasesCollection, {
        userData: {
          id: user.uid,
          userName: user.displayName,
          userPhone: userData.phone,
          userAddress: userData.address,
          userEmail: user.email,
          userCountry: userData.country,
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

      console.log("Compra realizada con éxito. Ticket creado:", docRef.id);
      alert("Compra realizada con éxito. Ticket creado:", docRef.id);

      // Limpiar el carrito después de la compra
      // Puedes agregar una función para limpiar el carrito en tu contexto
      // Por ejemplo, si tienes una función clearCart en tu contexto, podrías llamar a:
      // clearCart();
    } catch (error) {
      console.error("Error al realizar la compra", error.message);
    }
  };

  return (
    <div>
      {isAuthenticated() ? (
        <>
          <h2>Resumen de Compra:</h2>

          {/* Información del usuario */}
          <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
            <Typography variant="h5" gutterBottom>
              Información del Usuario
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary={`Nombre: ${user.displayName || "No disponible"}`}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={`Email: ${user.email || "No disponible"}`}
                />
              </ListItem>
              {/* ... otras propiedades del usuario que quieras mostrar ... */}
            </List>
          </Paper>

          {/* Información del carrito */}
          <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
            <Typography variant="h5" gutterBottom>
              Productos en el Carrito
            </Typography>
            <List>
              {cart.map((product) => (
                <ListItem key={product.item.id}>
                  <ListItemText
                    primary={`Producto: ${product.item.name}`}
                    secondary={`Cantidad: ${product.quantity}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>

          {/* Información del total y botón para realizar la compra */}
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h5" gutterBottom>
              Total de la Compra
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Total: ${total}
            </Typography>
            <Button sx={{ height: 50 }} onClick={handlePurchase}>
              Realizar Compra
            </Button>
          </Paper>
        </>
      ) : (
        <h2>Debes iniciar sesión para acceder al checkout.</h2>
      )}
    </div>
  );
};

export default Checkout;
