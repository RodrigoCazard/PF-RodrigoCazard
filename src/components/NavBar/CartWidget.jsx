import { useTheme } from "@emotion/react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";

const CartWidget = () => {
  const theme = useTheme();

  const primaryColor = theme.palette.primary.main;

  const styledCartWidget = {
    styledBox: {
      display: "inline-block",
      cursor: "pointer",
      "&:hover": {
        transform: "scale(1.1)",
        opacity: 1,
        color: primaryColor,
        "& .MuiBadge-badge": {
          transform: "translate(1px) scale(0.9)",
          opacity: 0,
          fontWeight: "bold",
          transition: "all 0.2s linear",
        },
      },
      transition: "all 0.5s ease",
      opacity: 0.8,
    },
  };

  return (
    <Box sx={styledCartWidget.styledBox}>
      <Badge
        badgeContent={2}
        color="primary"
        sx={{ "& .MuiBadge-badge": { right: 7, top: 5 } }}
      >
        <ShoppingCartOutlinedIcon fontSize="large"></ShoppingCartOutlinedIcon>
      </Badge>
    </Box>
  );
};

export default CartWidget;
