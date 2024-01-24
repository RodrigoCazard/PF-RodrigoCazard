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
    setIsFavorite(!isFavorite);

    updateUser(user?.uid, { favorites: productId }).then((res) => {
      console.log(res);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    setIsLoading(true);
    if (isAuthenticated() && user?.uid) {
      (async () => {
        const userData = await fetchUserData(user?.uid);
        console.log(userData);
        setIsFavorite(isProductInFavorites(userData, productId));
      })();
    } else {
      console.log("no estoy autenticado");
    }
    setIsLoading(false);
  }, [isAuthenticated, user?.uid, productId]);

  return (
    <>
      {" "}
      {!isLoading ? (
        <Box
          onClick={handleSetIsFavorite}
          sx={{
            width: 60,
            height: 60,
            border: 2,
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
        <CircularProgress />
      )}{" "}
    </>
  );
};

export default AddToFavoritesButton;
