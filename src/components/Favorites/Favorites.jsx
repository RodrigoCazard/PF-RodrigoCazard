import React, { useEffect, useState } from "react";
import { fetchFavoriteProducts } from "../Utils/users.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../services/config";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Button, Grid, Typography } from "@mui/material";
import Item from "../Items/Item.jsx";

import { useTheme } from "@emotion/react";
import { Link } from "react-router-dom";

import NotLogged from "../NotLogged/NotLogged.jsx";
import BreadCrumbsCustom from "../BreadCrumbsCustom/BreadCrumbsCustom.jsx";
const Favorites = () => {
  const { user, isAuthenticated } = useAuth();

  const [idProducts, setIdProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const favoriteIds = await fetchFavoriteProducts(user?.uid);
        setIdProducts(favoriteIds);

        const productsData = await Promise.all(
          favoriteIds.map(async (id) => {
            const docRef = doc(db, "products", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
              return {
                ...docSnap.data(),
                id: docSnap.id,
              };
            } else {
              console.error(`The product  ${id} didnt exist.`);
              return null;
            }
          })
        );

        setProducts(productsData.filter((product) => product !== null));
      } catch (error) {
        console.error("Error :", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchData();
    }
  }, [user?.uid, isAuthenticated]);

  return (
    <>
      <BreadCrumbsCustom
        breadCrumbs={[{ name: "Profile", link: "/profile" }, "Favorites"]}
      />
      <Box>
        <Typography variant="body1" color={"primary"} component={"p"} mb={1}>
          - Favorites
        </Typography>
        <Typography variant="h3" component="h2">
          Your Favorites products
        </Typography>
      </Box>
      {isLoading ? (
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          {isAuthenticated() ? (
            <>
              {" "}
              {products.length === 0 ? (
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={"center"}
                  gap={4}
                  my={27}
                >
                  <Typography variant="h3">
                    You dont have any favorites in your list
                  </Typography>
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
                <>
                  <Grid container spacing={6} my={3} mb={20}>
                    {products.map((product, index) => (
                      <Grid item xs={12} sm={6} lg={3} xl={3} key={index}>
                        <Item {...product}></Item>
                      </Grid>
                    ))}
                  </Grid>
                </>
              )}
            </>
          ) : (
            <NotLogged></NotLogged>
          )}
        </Box>
      )}
    </>
  );
};

export default Favorites;
