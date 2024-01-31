import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/system";

const CategoryColors = {
  desktop: "60, 179, 113",
  laptop: "23, 120, 255",
  mobilePhone: "255, 165, 0",
  printer: "255, 0, 0",
};
const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    boxShadow: theme.shadows[1],
    fontSize: 20,
  },
}));
const Item = ({ id, category, name, price, img }) => {
  const theme = useTheme();

  const primaryColor = theme.palette.primary.main;

  return (
    <Box maxHeight={800}>
      <Link to={`/item/${id}`}>
        <Box
          minHeight={"350px"}
          borderRadius={10}
          position={"relative"}
          mb={5}
          sx={{
            backgroundImage: `url(${img})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            borderRadius: 5,
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
              whiteSpace: "nowrap",
              width: "fit-content",
              padding: "16px 32px",
              borderRadius: 20,
              fontSize: "1rem",
              fontWeight: "bold",

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
      <LightTooltip title={name} arrow>
        <Typography
          variant="h5"
          mb={3}
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {name}
        </Typography>
      </LightTooltip>
      <Box display={"flex"} mt={1}>
        <Link
          to={`/category/${category}`}
          style={{ textDecoration: "none", color: "black" }}
        >
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
        </Link>
        <Typography variant="h"> ${price}</Typography>
      </Box>
    </Box>
  );
};

export default Item;
