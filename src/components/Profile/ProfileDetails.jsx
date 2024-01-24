import React, { useEffect, useRef, useState } from "react";
import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext.jsx";
import Logout from "../Logout/Logout.jsx";
import { db } from "../../services/config.js";
import { getDocs, collection, query, doc, where } from "firebase/firestore";
import { fetchUserData } from "../Utils/users.js";
const ProfileDetails = ({ profile, shipping, variant }) => {
  const { user, isAuthenticated } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (isAuthenticated()) {
      fetchUserData(user?.uid).then((userData) => {
        setUserData(userData);
        setLoading(false);
      });
    }
  }, [user?.uid, isAuthenticated]);

  return (
    isAuthenticated() && (
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
          <Box
            display={"flex"}
            flexDirection={"column"}
            gap={4}
            mb={profile || shipping ? "40px" : "0px"}
          >
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
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Typography variant="body1">UID: </Typography>
                  <Typography variant="h5">{user?.uid}</Typography>
                </Box>
              </>
            )}
          </Box>
        )}
      </>
    )
  );
};

export default ProfileDetails;
