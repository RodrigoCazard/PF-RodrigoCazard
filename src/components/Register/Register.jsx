// src/components/Register.jsx
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Paper, Typography, TextField, Button } from "@mui/material";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const auth = getAuth();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("Registro exitoso");
    } catch (error) {
      console.error("Error al registrar", error.code, error.message);
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
        Registrarse
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
        onClick={handleRegister}
        style={{ marginTop: "20px" }}
      >
        Registrarse
      </Button>
    </Paper>
  );
};

export default Register;
