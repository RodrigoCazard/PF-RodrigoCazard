// src/components/Profile.jsx
import React from "react";
import { Paper, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import Logout from "../Logout/Logout.jsx";
const Profile = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    isAuthenticated() && (
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
          Perfil de Usuario
        </Typography>
        <Typography variant="body1" gutterBottom>
          Nombre: {user.displayName || "No disponible"}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Email: {user.email || "No disponible"}
        </Typography>
        <Typography variant="body1" gutterBottom>
          UID: {user.uid}
        </Typography>
        <Logout></Logout>
      </Paper>
    )
  );
};

export default Profile;
