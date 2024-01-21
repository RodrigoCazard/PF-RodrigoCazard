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
    <Box
      padding={"40px 80px"}
      border={"2px solid rgba(0,0,0,0.1)"}
      borderRadius={15}
    >
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
        <Box display={"flex"} flexDirection={"column"} gap={4} mb={"40px"}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              marginBottom: "40px",
            }}
          >
            {" "}
            Profile details
          </Typography>
          <Box
            display={"flex"}
            alignItems={"end"}
            justifyContent={"space-between"}
          >
            <Typography variant="body1" gutterBottom>
              Full Name:{" "}
            </Typography>
            <Typography variant="h5" gutterBottom>
              {userData?.displayName || "Not available"}
            </Typography>
          </Box>

          <Box
            display={"flex"}
            alignItems={"end"}
            justifyContent={"space-between"}
          >
            <Typography variant="body1" gutterBottom>
              Email Address:{" "}
            </Typography>
            <Typography variant="h5" gutterBottom>
              {userData?.email || "Not available"}
            </Typography>
          </Box>

          <Box
            display={"flex"}
            alignItems={"end"}
            justifyContent={"space-between"}
          >
            <Typography variant="body1" gutterBottom>
              Phone:{" "}
            </Typography>
            <Typography variant="h5" gutterBottom>
              {userData?.phone || "Not available"}
            </Typography>
          </Box>

          <Box
            display={"flex"}
            alignItems={"end"}
            justifyContent={"space-between"}
          >
            <Typography variant="body1" gutterBottom>
              Address:{" "}
            </Typography>
            <Typography variant="h5" gutterBottom>
              {userData?.address || "Not available"}
            </Typography>
          </Box>

          <Box
            display={"flex"}
            alignItems={"end"}
            justifyContent={"space-between"}
          >
            <Typography variant="body1" gutterBottom>
              Country:{" "}
            </Typography>
            <Typography variant="h5" gutterBottom>
              {userData?.country.label || "Not available"}
            </Typography>
          </Box>

          <Box
            display={"flex"}
            alignItems={"end"}
            justifyContent={"space-between"}
          >
            <Typography variant="body1" gutterBottom>
              UID:{" "}
            </Typography>
            <Typography variant="h5" gutterBottom>
              {user?.uid}
            </Typography>
          </Box>
        </Box>
      )}
      <Logout></Logout>
    </Box>
  ) : (
    <p>No hay usuario logeado</p>
  );
};

export default Profile;
