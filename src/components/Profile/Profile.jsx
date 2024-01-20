import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import Logout from "../Logout/Logout.jsx";
import { db } from "../../services/config";
import { getDocs, collection, query, doc, where } from "firebase/firestore";

const Profile = () => {
  const { user, isAuthenticated } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
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
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated()) {
      fetchUserData();
    }
  }, [user?.uid, isAuthenticated]);

  return isAuthenticated() ? (
    <Paper
      elevation={3}
      style={{
        maxWidth: "800px",
        padding: "20px",
        margin: "auto",
        marginBottom: "50px",
        marginTop: "50px",
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Perfil de Usuario
      </Typography>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems={"center"}
          height={"30vh"}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Typography variant="body1" gutterBottom>
            Full Name: {userData?.displayName || "Not available"}
          </Typography>

          <Typography variant="body1" gutterBottom>
            Email: {userData?.email || "Not available"}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Phone: {userData?.phone || "Not available"}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Address: {userData?.address || "Not available"}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Country: {userData?.country.label || "Not available"}
          </Typography>
          <Typography variant="body1" gutterBottom>
            UID: {user?.uid}
          </Typography>
        </>
      )}
      <Logout></Logout>
    </Paper>
  ) : (
    <p>No hay usuario logeado</p>
  );
};

export default Profile;
