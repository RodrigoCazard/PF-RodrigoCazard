import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext.jsx";
import Logout from "../Logout/Logout.jsx";
import { db } from "../../services/config.js";
import { getDocs, collection, query, doc, where } from "firebase/firestore";

const ProfileDetails = ({ profile, shipping }) => {
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
    <>
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
          {!shipping && (
            <>
              {" "}
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
            </>
          )}

          {!profile && (
            <>
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
            </>
          )}
          {!profile && !shipping && (
            <>
              {" "}
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
            </>
          )}
        </Box>
      )}
    </>
  ) : (
    <p>No hay usuario logeado</p>
  );
};

export default ProfileDetails;
