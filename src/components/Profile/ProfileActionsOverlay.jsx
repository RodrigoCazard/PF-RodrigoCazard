import React, { useEffect, useState } from "react";

import { Box, Hidden } from "@mui/material";
import ProfileActions from "./ProfileActions";

const ProfileActionsOverlay = ({ scrolled, isVisible }) => {
  const [overlayStyle, setOverlayStyle] = useState({
    opacity: 0,
    visibility: "hidden",
  });
  const [isMouseOver, setIsMouseOver] = useState(false);

  useEffect(() => {
    if (!isMouseOver) {
      setOverlayStyle({
        opacity: isVisible ? 1 : 0,
        visibility: isVisible ? "visible" : "hidden",
        transition: "all 0.2s ease",
      });
    }
  }, [isVisible, isMouseOver]);

  const handleMouseEnter = () => {
    setIsMouseOver(true);
  };

  const handleMouseLeave = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsMouseOver(false);
    }
  };

  return (
    <Box
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      marginRight={"7%"}
      sx={{
        bgcolor: "transparent",
        paddingTop: scrolled ? 2 : 4,
        position: "fixed",
        right: 0,

        top: scrolled ? 50 : 70,
        ...overlayStyle,
        alignItems: "center",
        justifyContent: "center",
        zIndex: "1000",
      }}
    >
      <ProfileActions variant />
    </Box>
  );
};

export default ProfileActionsOverlay;