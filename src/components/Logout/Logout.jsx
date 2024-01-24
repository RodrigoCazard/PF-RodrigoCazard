// src/components/LogoutButton.jsx
import React from "react";
import { Button } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
const Logout = () => {
  const { logout } = useAuth();

  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/");
    logout();

    toast.info("Successful logout! We hope to see you again soon! 😊");
  };

  return (
    <Button
      variant="outlined"
      color="warning"
      disableElevation
      sx={{
        "&:hover, &:focus": {
          border: "2px solid #000",
        },
        marginTop: "40px",
        fontWeight: "bold",
        padding: "12px",
        fontSize: "14px",
        borderRadius: 40,
        letterSpacing: 1,
        border: "2px solid rgba(0,0,0,0.1)",
      }}
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
};

export default Logout;
