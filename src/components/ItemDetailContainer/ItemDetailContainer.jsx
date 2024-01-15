import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUnProducto } from "../../asyncmock";
import ItemDetail from "./ItemDetail";
import { db } from "../../services/config";

import { collection, doc, getDoc } from "firebase/firestore";
import { Box, CircularProgress } from "@mui/material";
("firebase/firestore");
const ItemDetailContainer = () => {
  const [product, setProduct] = useState([]);
  const { idItem } = useParams();
  const [loading, setLoading] = useState(true);

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
          console.log("No se encontró el producto con el ID especificado");
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
        <p>No se encontró el producto</p>
      )}
    </div>
  );
};

export default ItemDetailContainer;
