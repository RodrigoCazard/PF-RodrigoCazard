// src/components/Checkout.jsx
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

const Checkout = () => {
  const { isAuthenticated, user } = useAuth();
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handlePurchase = async () => {
    if (!isAuthenticated()) {
      alert("Debes iniciar sesión para realizar la compra.");
      return;
    }

    // Aquí puedes agregar la lógica para procesar la compra y enviar el ticket a Firebase
    const db = getFirestore();
    const purchasesCollection = collection(db, "purchases");

    try {
      // Añadir un nuevo documento con los detalles de la compra
      const docRef = await addDoc(purchasesCollection, {
        userId: user.uid,
        userName: user.displayName,
        userEmail: user.email,
        productName,
        quantity,
        timestamp: serverTimestamp(),
      });

      alert("Compra realizada con éxito. Ticket creado:", docRef.id);
    } catch (error) {
      console.error("Error al realizar la compra", error.message);
    }
  };

  return (
    <div>
      {isAuthenticated() ? (
        <div>
          <h2>¡Bienvenido al Checkout!</h2>
          <p>Completa la compra:</p>
          <label>
            Producto:
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </label>
          <label>
            Cantidad:
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </label>
          <button
            onClick={handlePurchase}
            style={{ width: "200px", height: "200px" }}
          >
            Comprar
          </button>
        </div>
      ) : (
        <h2>Debes iniciar sesión para acceder al checkout.</h2>
      )}
    </div>
  );
};

export default Checkout;
