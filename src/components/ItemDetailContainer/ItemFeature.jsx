import { Box, List, ListItem, Typography } from "@mui/material";
import React from "react";

const ItemFeature = ({ description }) => {
  const lines = description.split("\\n");

  return (
    <Box>
      <Typography variant="h3" component="h2" mb={2}>
        Explore the Features
      </Typography>
      <Typography variant="body1" color="primary" component="p" mb={2}>
        - Product Features
      </Typography>
      <List sx={{ listStyleType: "disc", margin: "60px 0" }}>
        {lines.map((line, index) => (
          <Typography
            sx={{
              display: "list-item",
              marginBottom: "17px",
              marginLeft: "4%",
            }}
            key={index}
            variant="body4"
            component="p"
            style={{ whiteSpace: "pre-line" }}
            mb={1}
          >
            {line}
          </Typography>
        ))}
      </List>
    </Box>
  );
};

export default ItemFeature;
