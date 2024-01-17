import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { Paper, Typography, TextField, Button } from "@mui/material";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../services/config";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const addUserToFirestore = async (userData) => {
    try {
      const userCollectionRef = collection(db, "users");
      await addDoc(userCollectionRef, userData);
      console.log("Usuario agregado a Firestore");
    } catch (error) {
      console.error("Error al agregar usuario a Firestore:", error);
    }
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      console.error("Las contraseñas no coinciden");
      return;
    }

    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredential.user, {
        displayName: `${displayName} ${lastName}`,
      });

      const userData = {
        uid: userCredential.user.uid,
        email: email,
        displayName: `${displayName} ${lastName}`,
        phone: phone,
        address: address,
        country: country,
      };

      await addUserToFirestore(userData);

      console.log("Registro exitoso");
    } catch (error) {
      console.error("Error al registrar", error.code, error.message);
    }
  };

  return (
    <Paper
      elevation={3}
      style={{
        maxWidth: "800px",
        padding: "20px",
        margin: "auto",
        marginTop: "50px",
        marginBottom: "50px",
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Registrarse
      </Typography>
      <TextField
        label="Nombre"
        variant="outlined"
        fullWidth
        margin="normal"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
      />
      <TextField
        label="Apellido"
        variant="outlined"
        fullWidth
        margin="normal"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Teléfono"
        variant="outlined"
        fullWidth
        margin="normal"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <TextField
        label="Dirección"
        variant="outlined"
        fullWidth
        margin="normal"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <TextField
        label="País"
        variant="outlined"
        fullWidth
        margin="normal"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />
      <TextField
        label="Contraseña"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        label="Confirmar Contraseña"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleRegister}
        style={{ marginTop: "20px" }}
      >
        Registrarse
      </Button>
    </Paper>
  );
};

export default Register;
