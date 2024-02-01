import { useState, useRef, useEffect } from "react";
import { Box } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SearchWidget = () => {
  const [expanded, setExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef(null);

  const navigate = useNavigate();

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (searchTerm.trim() === "") {
        toast.error("Please enter a search term");
      } else {
        const searchTermWithUnderscores = searchTerm.replace(/\s+/g, "_");
        setSearchTerm("");

        navigate(`/search/${searchTermWithUnderscores}`);
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        expanded &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target)
      ) {
        setExpanded(false);
      }
    };

    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [expanded]);

  useEffect(() => {
    // Agrega un event listener para manejar la tecla Enter
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [searchTerm]); // Asegúrate de que searchTerm esté en la dependencia para obtener el valor actualizado

  const theme = useTheme();

  const primaryColor = theme.palette.primary.main;

  return (
    <Box
      component="form"
      onClick={handleExpand}
      sx={{
        display: {
          xs: "none",
          sm: "flex",
        },
        alignItems: "center",
        width: expanded ? "230px" : "35px",
        borderRadius: 10,
        height: 55,
        border: expanded ? `2px solid ${theme.palette.border.main}` : "none",
        padding: expanded ? "0px 15px" : 0,
        transition: "all 0.5s",
      }}
    >
      <SearchOutlinedIcon
        fontSize="large"
        onClick={handleExpand}
        sx={{
          opacity: expanded ? 1 : 0.9,
          transform: expanded ? "scale(1.2)" : "scale(1)",
          display: "inline-block",
          cursor: "pointer",
          "&:hover": {
            color: primaryColor,
            transform: "scale(1.1)",
            opacity: 1,
          },
        }}
      />

      <input
        ref={searchInputRef}
        value={searchTerm}
        style={{
          color: theme.palette.basicText.main,
          width: expanded ? "165px" : "0",
          border: "none",
          outline: "none",
          transition: "all 0.5s",
          paddingLeft: expanded ? "7px" : "0",
          paddingRight: expanded ? "7px" : "0",
          backgroundColor: theme.palette.background.paper,
          opacity: expanded ? "1" : "0",
        }}
        placeholder="Search..."
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </Box>
  );
};

export default SearchWidget;
