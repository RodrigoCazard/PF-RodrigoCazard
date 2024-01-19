import {
  Box,
  Breadcrumbs,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import ItemList from "./ItemList";
import { Link, useParams } from "react-router-dom";
import { db } from "../../services/config";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useTheme } from "@emotion/react";
import { getDocs, collection, query, where } from "firebase/firestore";
import styled from "@emotion/styled";

const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const { category } = useParams();

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

        if (data.length === 0) {
          setErrorMessage("There are no products in this category.");
        } else {
          setErrorMessage("");
        }

        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setErrorMessage("Error loading products.");
        setLoading(false);
      }
    };

    fetchData();
  }, [category]);

  if (loading) {
    <Box display="flex" justifyContent="center" mt={2}>
      <CircularProgress />
    </Box>;
  }

  return (
    <>
      {category ? (
        <Breadcrumbs
          sx={{ margin: "20px 0 40px 0" }}
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <StyledLink to="/">Home page</StyledLink>
          <StyledLink to="/category/all">Category</StyledLink>
          <Typography color="text.primary">
            {category?.charAt(0).toUpperCase() + category?.slice(1)}
          </Typography>
        </Breadcrumbs>
      ) : null}

      <Box component={"main"} mb={"120px"}>
        <Typography variant="body1" color={"primary"} component={"p"} mb={1}>
          - Our Products
        </Typography>
        <Typography variant={"h3"} component={"h2"}>
          Explore our Products
        </Typography>
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems={"center"}
            height={"50vh"}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            {errorMessage ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems={"center"}
                height={"50vh"}
              >
                <Typography variant="body1" color={"primary"}>
                  {errorMessage}
                </Typography>
              </Box>
            ) : (
              <>
                {!category || category !== "all" ? (
                  <>
                    <ItemList products={products.slice(0, 8)}></ItemList>
                    <Link
                      to="/category/all"
                      style={{
                        textDecoration: "none",
                        color: "black",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        variant="contained"
                        sx={{
                          marginTop: 4,
                          padding: "15px 50px",
                          borderRadius: 15,
                          fontSize: "1.2rem",
                        }}
                      >
                        Explore all
                      </Button>
                    </Link>
                  </>
                ) : (
                  <ItemList products={products}></ItemList>
                )}
              </>
            )}
          </>
        )}
      </Box>
    </>
  );
};

export default ItemListContainer;
