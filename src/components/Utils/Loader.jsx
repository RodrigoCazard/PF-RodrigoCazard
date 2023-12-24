
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loader = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="97vh"

    >
      <CircularProgress color="primary" size={40} thickness={4} />
    </Box>
  );
};

export default Loader;
