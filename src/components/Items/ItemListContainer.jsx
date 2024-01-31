import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import ItemList from "./ItemList";
import { Link, useParams } from "react-router-dom";
import { db } from "../../services/config";

import { getDocs, collection, query, where } from "firebase/firestore";

import BreadCrumbsCustom from "../BreadCrumbsCustom/BreadCrumbsCustom";

const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const { category } = useParams();

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

  const formatCategory = category?.charAt(0).toUpperCase() + category?.slice(1);

  return (
    <>
      {category && (
        <BreadCrumbsCustom
          breadCrumbs={[
            { name: "Categories", link: "/categories" },
            formatCategory,
          ]}
        ></BreadCrumbsCustom>
      )}

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
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                gap={4}
                my={27}
              >
                <Typography variant="h3">{errorMessage}</Typography>
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
