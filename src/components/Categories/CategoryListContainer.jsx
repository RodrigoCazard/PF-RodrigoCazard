import { Box, CircularProgress, Typography } from "@mui/material";
import { useState, useEffect } from "react";

import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { getCategoryNames, getIconByCategoryName } from "../Utils/category";
import { useTheme } from "@emotion/react";

const CategoryListContainer = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryNames = await getCategoryNames();
        setCategories(categoryNames || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);
  const StyledBox = styled("div")({
    position: "relative",
    minWidth: "220px",
    minHeight: "170px",
    display: "flex",
    cursor: "pointer",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: 10,
    borderRadius: 20,
    backgroundColor: theme.palette.customColor1.main,
    fontWeight: "bold",
    transition: "all 0.2s ease",
    "&:hover": {
      transform: "translateY(-10px)",
    },
  });

  return (
    <Box component={"section"} marginY={"120px"}>
      <Typography variant="body1" color={"primary"} component={"p"} mb={1}>
        - The Categories
      </Typography>
      <Typography variant="h3" component="h2" sx={{}}>
        Browse by Category
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
        <Box
          transition={"all 0.3s ease-in-out;"}
          display={"flex"}
          gap={4}
          my={10}
          flexWrap={"wrap"}
          justifyContent={"center"}
        >
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              style={{
                textDecoration: "none",
                color: theme.palette.basicText.main,
              }}
            >
              <StyledBox>
                {getIconByCategoryName(category.name)}
                {category.name}
              </StyledBox>
            </Link>
          ))}
        </Box>
      )}
    </Box>
  );
};
export default CategoryListContainer;
