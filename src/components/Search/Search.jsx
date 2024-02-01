import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Item from "../Items/Item";
import { Link, useParams } from "react-router-dom";
import { db } from "../../services/config";
import { collection, getDocs, query } from "firebase/firestore";
import { toast } from "sonner";
import BreadCrumbsCustom from "../BreadCrumbsCustom/BreadCrumbsCustom";

const Search = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { search } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const q = query(collection(db, "products"));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        const filtered = data.filter((product) => {
          const lowerSearch = search.toLowerCase();
          const lowerName = product.name.toLowerCase();
          const lowerCategory = product.category.toLowerCase();

          const searchTerms = lowerSearch.split("_");

          return searchTerms.some(
            (term) =>
              lowerName
                .split(" ")
                .some((word) => word === term.toLowerCase()) ||
              lowerCategory
                .split(" ")
                .some((word) => word === term.toLowerCase())
          );
        });

        setFilteredProducts(filtered);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        toast.error("Error fetching data");
        setIsLoading(false);
      }
    };

    fetchData();
  }, [search]);

  return (
    <>
      <BreadCrumbsCustom breadCrumbs={["Search"]}></BreadCrumbsCustom>
      <Box>
        <Typography variant="body1" color={"primary"} component={"p"} mb={1}>
          - Search
        </Typography>
        <Typography variant="h3" component="h2">
          Result of your search
        </Typography>
      </Box>
      {isLoading ? (
        <>
          {" "}
          <Box display="flex" justifyContent="center" my={40}>
            <CircularProgress />
          </Box>
        </>
      ) : (
        <>
          {filteredProducts.length === 0 ? (
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              gap={4}
              my={27}
            >
              <Typography variant="h3">No products found</Typography>
              <Link to="/category/all">
                {" "}
                <Button
                  variant="contained"
                  disableElevation
                  sx={{
                    borderRadius: 15,
                    padding: "20px 50px",
                    fontSize: "20px",
                  }}
                >
                  Explore products
                </Button>
              </Link>
            </Box>
          ) : (
            <Grid container spacing={6} my={3}>
              {filteredProducts.map((product, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={index}>
                  <Item {...product}></Item>
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}
    </>
  );
};

export default Search;
