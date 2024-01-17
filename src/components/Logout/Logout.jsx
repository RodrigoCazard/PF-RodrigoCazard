// src/components/LogoutButton.jsx
import React from "react";
import { Button } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Logout = () => {
  const { logout } = useAuth();

  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Button variant="outlined" color="secondary" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default Logout;
