import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import Img from "../../assets/icon-image-not-found-free-vector.jpg";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useTheme } from "@emotion/react";

const CategoryColors = {
  desktop: "60, 179, 113",
  laptop: "0, 0, 255",
  mobilePhone: "255, 165, 0",
  printer: "255, 0, 0",
  // Puedes agregar más categorías y colores según sea necesario
};

const ItemDetail = ({ id, nombre, precio, category, stock }) => {
  const [favorite, setFavorite] = useState(false);

  const handleFavorite = () => {
    setFavorite(!favorite);
    console.log("funciona");
  };

  const [count, setCount] = useState(1);

  const increment = () => {
    if (count == stock) {
      setCount(stock);
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

  const theme = useTheme();

  const primaryColor = theme.palette.primary.main;

  return (
    <Grid container>
      <Grid item sm={12} lg={6} margin={"20px 0px 150px"}>
        <Box textAlign={"center"}>
          <img
            src={Img}
            alt=""
            width={"60%"}
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
          {nombre}
        </Typography>
        <Box display={"flex"} mt={1} alignItems={"center"}>
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
          <Typography variant="h"> ${precio}</Typography>
        </Box>
        <Typography variant="body2" mt={5}>
          Id: <strong style={{ opacity: 1 }}>{id}</strong>
        </Typography>
        <Typography variant="body2" mt={1} mb={5}>
          Stock: {stock}
        </Typography>
        <Box display={"flex"}>
          <Box
            mr={2}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            gap={6}
            borderRadius={"50px"}
            bgcolor={"rgba(0,0,0,0.02)"}
            padding={"10px 20px"}
            border={1}
          >
            <p onClick={decrement} style={{ cursor: "pointer" }}>
              -
            </p>
            <p>{count}</p>

            <p onClick={increment} style={{ cursor: "pointer" }}>
              +
            </p>
          </Box>
          <Button
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
          <Box
            onClick={handleFavorite}
            sx={{
              width: 60,
              height: 60,
              border: 2,
              display: "grid",
              placeItems: "center",
              padding: 1,
              borderRadius: "50%",
              cursor: "pointer",
            }}
          >
            {favorite ? (
              <FavoriteIcon fontSize="large" sx={{ color: primaryColor }}>
                {" "}
              </FavoriteIcon>
            ) : (
              <FavoriteBorderIcon fontSize="large"></FavoriteBorderIcon>
            )}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ItemDetail;
