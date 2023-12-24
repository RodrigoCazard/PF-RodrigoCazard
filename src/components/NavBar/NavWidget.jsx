import React, { useState } from 'react';

import {Box} from '@mui/material'
import { useTheme } from '@emotion/react';


const NavWidget = ({ isOpen, toggleMenu }) => {
  const handleToggle = () => {
    toggleMenu ();
  };

  const theme = useTheme();

  const primaryColor = theme.palette.primary.main;

  return (
    <Box
    padding={'15px'}
    justifyContent={'center'}
    bgcolor={"rgba(0,0,0,0.03)"}
    borderRadius={'50%'}
    >
      <Box onClick={handleToggle}
      sx={{
          width: '25px',
          height: '20px',
          position: 'relative',
          cursor: 'pointer',
          transition:"all 0.5s ease",
            "&:hover":{
            transform:"scale(1.1)",
            opacity:1,
            '& span':{
              backgroundColor:primaryColor
            }
          },
            opacity: isOpen ? 1 : 0.8 ,
          transform: isOpen ? "scale(1.1)" : 'scale(1)',
          '& span': {
            position: 'absolute',
            width: '100%',
            height: '3px',
            backgroundColor: isOpen ? primaryColor : 'black',
            transition: 'transform 0.3s ease',
            borderRadius:15,
          },
        
          '.line-1': {
            top: 0,
            transformOrigin: 'top left',
          },
        
          '.line-2': {
            bottom: 0,
            transformOrigin: 'bottom left',
          },
        
          '.open.line-1': {
            marginLeft:0.6,
            transform: 'rotate(45deg)',
          },
        
          '.open.line-2': {
            marginLeft:0.6,
            transform: 'rotate(-45deg)',
          },
        
          
        
          
        }}>
        <span className={`line-1 ${isOpen ? 'open' : ''}`} />
        <span className={`line-2 ${isOpen ? 'open' : ''}`} />
      </Box>
    </Box>
  );
};

export default NavWidget;
