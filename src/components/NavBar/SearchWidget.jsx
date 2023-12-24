import { useState, useRef, useEffect } from 'react';
import { Box } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useTheme } from '@emotion/react';

const SearchWidget = () => {
  const [expanded, setExpanded] = useState(false);
  const searchInputRef = useRef(null);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (expanded && searchInputRef.current && !searchInputRef.current.contains(event.target)) {
        setExpanded(false);
      }
    };
  
    document.addEventListener('click', handleClickOutside, true);
  
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [expanded]);

  const theme = useTheme();

  const primaryColor = theme.palette.primary.main;

  return (
    <Box
      component="form"
      onClick={handleExpand}
      sx={{
        display:{
          xs: 'none',
          sm:'flex'
        },
        alignItems: "center",
        width: expanded ? '230px' : '35px',
        borderRadius: 10,
        height: 55,
        border: expanded ? "1px solid rgba(0,0,0,0.20)" : 'none', 
        padding: expanded ? '0px 15px' : 0,
        transition: "all 0.5s",
      }}
    >
      <SearchOutlinedIcon
       fontSize='large'
        onClick={handleExpand} 
        sx={{ 
       
        opacity: expanded ? 1 : 0.8 ,
        transform: expanded ? "scale(1.1)" : 'scale(1)',
        display: "inline-block",
        cursor: 'pointer',
        "&:hover": {
          color:primaryColor,
          transform: "scale(1.1)",
          opacity: 1},
        transition: "all 0.5s ease",
        }} />

      <input
        ref={searchInputRef}
        style={{
          width: expanded ? '165px' : '0',
          border: 'none',
          outline: 'none',
          transition: 'all 0.5s',
          paddingLeft: expanded ? '7px' : '0',
          paddingRight: expanded ? '7px' : '0',
          opacity: expanded ? '1' : '0',
        }}
        placeholder="Search..."
        onClick={(e) => e.stopPropagation()}
      />
    </Box>
  );
}

export default SearchWidget;
