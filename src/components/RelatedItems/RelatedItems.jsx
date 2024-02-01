import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../services/config";
import ItemList from "../Items/ItemList";
import { Box, Typography } from "@mui/material";

const RelatedItems = ({ category, currentProductId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let q;
        if (category && category !== "all") {
          q = query(
            collection(db, "products"),
            where("category", "==", category)
          );
        } else {
          q = query(collection(db, "products"));
        }

        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        const filteredData = data.filter(
          (product) => product.id !== currentProductId
        );

        const limitedData = filteredData.slice(0, 4);

        setProducts(limitedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [category, currentProductId]);

  return (
    <Box my={15}>
      <Box>
        <Typography variant="body1" color={"primary"} component={"p"} mb={1}>
          - Explore More
        </Typography>
        <Typography variant={"h2"} component={"h2"}>
          Related Products
        </Typography>
      </Box>
      <ItemList products={products}></ItemList>
    </Box>
  );
};

export default RelatedItems;
