import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import {
  updateUser,
  isProductInFavorites,
  fetchUserData,
} from "../Utils/users.js";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Box, CircularProgress } from "@mui/material";
import { useTheme } from "@emotion/react";
import { toast } from "sonner";
const AddToFavoritesButton = ({ productId }) => {
  const { user, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState();

  const [isFavorite, setIsFavorite] = useState(false);

  const theme = useTheme();

  const primaryColor = theme.palette.primary.main;

  const handleSetIsFavorite = () => {
    setIsLoading(true);
    if (isAuthenticated() && user?.uid) {
      updateUser(user?.uid, { favorites: productId })
        .then((res) => {
          setIsFavorite(!isFavorite);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      toast.warning("You are not logged in, you cannot add to favorites");
      setIsLoading(false);
    }
  };
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        if (isAuthenticated() && user?.uid) {
          const userData = await fetchUserData(user?.uid);
          setIsFavorite(isProductInFavorites(userData, productId));
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated, user?.uid, productId]);

  return (
    <>
      {!isLoading ? (
        <Box
          onClick={handleSetIsFavorite}
          sx={{
            width: 60,
            height: 60,

            transition: "all 0.5s ease",
            border: "2px solid rgba(0,0,0,0.1)",
            "&:hover": {
              border: "2px solid rgba(0,0,0,1)",
            },
            display: "grid",
            placeItems: "center",
            padding: 1,
            borderRadius: "50%",
            cursor: "pointer",
          }}
        >
          {isFavorite ? (
            <FavoriteIcon fontSize="large" sx={{ color: primaryColor }}>
              {" "}
            </FavoriteIcon>
          ) : (
            <>
              <FavoriteBorderIcon fontSize="large"></FavoriteBorderIcon>
            </>
          )}
        </Box>
      ) : (
        <>
          <CircularProgress />
        </>
      )}{" "}
    </>
  );
};

export default AddToFavoritesButton;
