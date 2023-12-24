import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
  getFirstEightProducts,
  getProductCategories,
  getProducts,
} from "../../asyncmock";
import ItemList from "./ItemList";
import { useParams } from "react-router-dom";

const ItemListContainer = ({ greeting }) => {
  const [products, setProducts] = useState([]);
  const [allProducts, setallProducts] = useState(true);

  const handleAllProducts = () => {
    setallProducts(!allProducts);
  };

  const { category } = useParams();

  useEffect(() => {
    const functionProducts = category
      ? getProductCategories
      : allProducts
      ? getFirstEightProducts
      : getProducts;

    functionProducts(category).then((res) => setProducts(res));
  }, [category, allProducts]);

  return (
    <Box component={"main"} mb={"120px"}>
      <Typography variant="body1" color={"primary"} component={"p"} mb={1}>
        - Our Products
      </Typography>
      <Typography variant={"h3"} component={"h2"}>
        Explore out Products
      </Typography>
      <ItemList products={products}></ItemList>
      {!category ? (
        <Box display={"flex"} justifyContent={"center"}>
          <Button
            onClick={handleAllProducts}
            variant="contained"
            sx={{ padding: "15px 50px", borderRadius: 15, fontSize: "1.2rem" }}
          >
            {allProducts ? "View all" : "View less"}
          </Button>
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default ItemListContainer;
