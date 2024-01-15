// src/components/Login.jsx
import React, { useState } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Inicio de sesión exitoso");

      navigate("/profile");
    } catch (error) {
      console.error("Error al iniciar sesión", error.message);
    }
  };

  return (
    <Paper
      elevation={3}
      style={{
        maxWidth: "300px",
        padding: "20px",
        margin: "auto",
        marginTop: "50px",
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Iniciar Sesión
      </Typography>
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleLogin}
        style={{ marginTop: "20px" }}
      >
        Iniciar Sesión
      </Button>
      <Typography
        variant="body2"
        style={{ marginTop: "10px", textAlign: "center" }}
      >
        ¿No tienes una cuenta? <Link to="/register">Registrarse</Link>
      </Typography>
    </Paper>
  );
};

export default Login;
