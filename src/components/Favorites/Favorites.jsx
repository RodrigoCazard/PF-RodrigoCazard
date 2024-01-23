import React, { useEffect, useState } from "react";
import { fetchFavoriteProducts } from "../Utils/users.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../services/config";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Breadcrumbs, Grid, Typography } from "@mui/material";
import Item from "../Items/Item.jsx";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import { Link } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NotLogged from "../NotLogged/NotLogged.jsx";
const Favorites = () => {
  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;

  const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
    opacity: 0.6;

    &:hover {
      text-decoration: underline;
      opacity: 1;
      color: ${primaryColor};
    }
  `;

  const { user, isAuthenticated } = useAuth();

  const [idProducts, setIdProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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
              console.error(`El producto con ID ${id} no existe.`);
              return null;
            }
          })
        );

        setProducts(productsData.filter((product) => product !== null));
      } catch (error) {
        console.error("Error al obtener los productos favoritos:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchData();
    }
  }, [user?.uid, isAuthenticated]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <Breadcrumbs
        sx={{ margin: "20px 0 40px 0" }}
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        <StyledLink to="/">Home page</StyledLink>
        <StyledLink to="/profile">Profile</StyledLink>
        <Typography color="text.primary">Favorites</Typography>
      </Breadcrumbs>
      <Box>
        <Typography variant="body1" color={"primary"} component={"p"} mb={1}>
          - Favorites
        </Typography>
        <Typography variant="h3" component="h2">
          Your Favorites products
        </Typography>
      </Box>
      {isAuthenticated() ? (
        <>
          {" "}
          {products.length === 0 ? (
            <div>
              <p>
                No tienes productos favoritos. ¿Por qué no exploras nuestra{" "}
                <Link to="/">página de inicio</Link>?
              </p>
            </div>
          ) : (
            <>
              <Grid container spacing={6} my={3} marginY={"80px"}>
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
    </>
  );
};

export default Favorites;
