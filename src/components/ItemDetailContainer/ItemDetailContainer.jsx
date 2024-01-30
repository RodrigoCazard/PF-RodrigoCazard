import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import ItemDetail from "./ItemDetail";
import { db } from "../../services/config";
import { collection, doc, getDoc } from "firebase/firestore";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import ItemFeature from "./ItemFeature";
import ReviewContainer from "../ReviewSection/ReviewContainer";

const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { idItem } = useParams();

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
    <Box>
      {product ? (
        <div>
          <ItemDetail {...product}></ItemDetail>

          <ItemFeature {...product}></ItemFeature>

          <ReviewContainer></ReviewContainer>
        </div>
      ) : (
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          gap={4}
          my={27}
        >
          <Typography variant="h3">
            No product was found with that id
          </Typography>
          <Link to="/category/all">
            {" "}
            <Button
              variant="contained"
              disableElevation
              sx={{ borderRadius: 15, padding: "20px 50px", fontSize: "20px" }}
            >
              Explore products
            </Button>
          </Link>
        </Box>
      )}
    </Box>
  );
};

export default ItemDetailContainer;
