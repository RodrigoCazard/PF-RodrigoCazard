import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";

import { useContext } from "react";
import CartContext from "../../context/CartContext";
import { Link } from "react-router-dom";

import Counter from "../Counter/Counter";
import AddToFavoritesButton from "../AddToFavoritesButton/AddToFavoritesButton";
import BreadCrumbsCustom from "../BreadCrumbsCustom/BreadCrumbsCustom";

const CategoryColors = {
  desktop: "60, 179, 113",
  laptop: "23, 120, 255",
  mobilePhone: "255, 165, 0",
  printer: "255, 0, 0",
};

const ItemDetail = ({ id, name, price, category, stock, img }) => {
  const { cartAdd } = useContext(CartContext);

  const formatName = name
    .match(/[\w'-]+/g)
    .slice(0, 3)
    .join(" ");
  const formatCategory = category.charAt(0).toUpperCase() + category.slice(1);

  const handleCartAdd = () => {
    cartAdd({ id, name, price, category, stock, img }, count);
  };

  const [count, setCount] = useState(1);

  const increment = () => {
    if (count == stock) {
      setCount(Number(stock));
    } else {
      setCount(count + 1);
    }
  };
  const decrement = () => {
    if (count === 1) {
      setCount(1);
    } else {
      setCount(count - 1);
    }
  };

  return (
    <>
      <BreadCrumbsCustom
        breadCrumbs={[
          { name: "Category", link: "/category/all" },
          { name: formatCategory, link: `/category/${category}` },
          formatName,
        ]}
      ></BreadCrumbsCustom>

      <Grid container>
        <Grid item sm={12} lg={6} margin={"20px 0px 150px"}>
          <Box textAlign={"center"}>
            <img
              src={img}
              alt=""
              width={"80%"}
              height={"auto"}
              style={{
                objectFit: "contain",
                borderRadius: 50,
              }}
            />
          </Box>
        </Grid>

        <Grid
          item
          sm={12}
          lg={6}
          width={"100%"}
          margin={"20px 0px 150px"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={{ sm: "center", lg: "flex-start" }}
        >
          <Typography
            color={"primary"}
            component={"p"}
            mb={1}
            sx={{ fontSize: "20px" }}
          >
            - Selling Fast
          </Typography>

          <Typography variant="h2" mb={2}>
            {name}
          </Typography>
          <Box display={"flex"} mt={1} alignItems={"center"}>
            <Link
              to={`/category/${category}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <Typography
                sx={{
                  textTransform: "uppercase",
                  fontSize: "1.1rem",
                  bgcolor: `rgba(${CategoryColors[category]},0.2)`,
                  padding: "15px 28px",
                  borderRadius: 10,
                  color: `rgb(${CategoryColors[category]})`,
                  mr: 3,
                }}
                variant="body3"
              >
                {category ?? "NO CATEGORY"}
              </Typography>
            </Link>
            <Typography variant="h"> ${price}</Typography>
          </Box>
          <Typography variant="body2" mt={5}>
            Id: <strong style={{ opacity: 1 }}>{id}</strong>
          </Typography>
          <Typography variant="body2" mt={1} mb={5}>
            Stock: {stock}
          </Typography>
          <Grid container gap={2} justifyContent={"center"}>
            <Grid item>
              {" "}
              <Counter
                stock={stock}
                count={count}
                increment={increment}
                decrement={decrement}
              ></Counter>{" "}
            </Grid>
            <Grid item>
              {" "}
              <Button
                onClick={handleCartAdd}
                variant="contained"
                sx={{
                  padding: "15px 50px",
                  borderRadius: 15,
                  fontSize: "1.2rem",
                  marginRight: 2,
                }}
              >
                Add to cart
              </Button>
            </Grid>
            <Grid item>
              {" "}
              <AddToFavoritesButton productId={id}></AddToFavoritesButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ItemDetail;
