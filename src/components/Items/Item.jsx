import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Img from "../../assets/icon-image-not-found-free-vector.jpg";
const CategoryColors = {
  desktop: "60, 179, 113",
  laptop: "0, 0, 255",
  mobilePhone: "255, 165, 0",
  printer: "255, 0, 0",
};

const Item = ({ id, category, nombre, precio, img }) => {
  const theme = useTheme();

  const handleClick = () => {
    console.info("You clicked the Chip.");
  };
  const primaryColor = theme.palette.primary.main;

  return (
    <Box>
      <Link to={`/item/${id}`}>
        <Box
          bgcolor={"rgba(0,0,0,0.03)"}
          minHeight={"350px"}
          borderRadius={10}
          position={"relative"}
          mb={5}
          sx={{
            backgroundImage: `url(${Img})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            position: "relative",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",

            "&::before": {
              content: '"Add to Cart"',
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: primaryColor,
              color: "white",
              padding: "16px 32px",
              borderRadius: "4px",
              fontSize: "1rem",
              opacity: 0,
              transition: "opacity 0.3s ease-in-out",
              pointerEvents: "none",
            },
            "&:hover::before": {
              opacity: 1,
            },
          }}
        ></Box>
      </Link>
      <Typography variant="h4" mb={3}>
        {nombre}
      </Typography>
      <Box display={"flex"} mt={1}>
        <Typography
          sx={{
            textTransform: "uppercase",
            bgcolor: `rgba(${CategoryColors[category]},0.2)`,
            padding: "8px 17px",
            borderRadius: 10,
            fontWeight: "bold",
            color: `rgb(${CategoryColors[category]})`,
            mr: 3,
          }}
          variant="body3"
        >
          {category ?? "NO CATEGORY"}
        </Typography>
        <Typography variant="h"> ${precio}</Typography>
      </Box>
    </Box>
  );
};

export default Item;
