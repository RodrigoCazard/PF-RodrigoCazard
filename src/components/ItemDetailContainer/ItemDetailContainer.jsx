import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ItemDetail from "./ItemDetail";
import { db } from "../../services/config";
import { collection, doc, getDoc } from "firebase/firestore";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";

const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [productNotFound, setProductNotFound] = useState(false);

  const { idItem } = useParams();

  const theme = useTheme();

  const primaryColor = theme.palette.primary.main;
  useEffect(() => {
    const getProductById = async () => {
      try {
        const docRef = doc(db, "products", idItem);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct({
            ...docSnap.data(),
            id: docSnap.id,
          });
        } else {
          setProductNotFound(true);
        }
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      } finally {
        setLoading(false);
      }
    };

    if (idItem) {
      getProductById();
    }
  }, [idItem]);

  if (loading) {
    return (
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        height={"50vh"}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      {product ? (
        <div>
          <ItemDetail {...product}></ItemDetail>
        </div>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems={"center"}
          height={"50vh"}
        >
          <Typography variant="body1" color={"primary"}>
            {productNotFound ? "No product was found with that id" : ""}
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default ItemDetailContainer;
