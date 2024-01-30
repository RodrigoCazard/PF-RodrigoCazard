import React, { useRef } from "react";
import Slider from "react-slick";
import { Box, Stack, Typography, Button } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useTheme } from "@emotion/react";

const SimpleSlider = () => {
  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;

  const sliderRef = useRef(null);

  const next = () => {
    sliderRef.current.slickNext();
  };

  const previous = () => {
    sliderRef.current.slickPrev();
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: "true",
    autoplaySpeed: "100",
  };

  return (
    <Box pl={{ lg: 20, sm: 0, xs: 0 }} mt={{ lg: 0, sm: 10, xs: 10 }}>
      <Slider {...settings} ref={sliderRef} arrows={false}>
        <Stack
          spacing={4}
          textAlign={{ sm: "center", xs: "center", lg: "start" }}
        >
          <img
            alt="Remy Sharp"
            src="https://randomuser.me/api/portraits/women/19.jpg"
            style={{
              width: 83,
              height: 83,
              borderRadius: "50%",
              border: `2px solid ${primaryColor}`,
              padding: 5,
              display: "inline",
            }}
          />

          <Typography variant="body1">Remy Sharp</Typography>
          <Typography variant="body2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
            accusamus quibusdam incidunt beatae nobis. Harum?
          </Typography>
        </Stack>
        <Stack spacing={4}>
          <img
            alt="Travis Howard"
            src="https://randomuser.me/api/portraits/men/43.jpg"
            style={{
              width: 83,
              height: 83,
              borderRadius: "50%",
              border: `2px solid ${primaryColor}`,
              padding: 5,
            }}
          />
          <Typography>Travis Howard</Typography>
          <Typography variant="body2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
            accusamus quibusdam incidunt beatae nobis. Harum?
          </Typography>
        </Stack>
        <Stack spacing={4}>
          <img
            alt="Cindy Baker"
            src="https://randomuser.me/api/portraits/women/2.jpg"
            style={{
              width: 83,
              height: 83,
              borderRadius: "50%",
              border: `2px solid ${primaryColor}`,
              padding: 5,
            }}
          />
          <Typography>Cindy Baker</Typography>
          <Typography variant="body2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
            accusamus quibusdam incidunt beatae nobis. Harum?
          </Typography>
        </Stack>
      </Slider>
      <Stack
        mt={10}
        spacing={3}
        direction={"row"}
        justifyContent={{
          xs: "center",
          sm: "center",
          md: "center",
          lg: "start",
        }}
      >
        <Box
          p={3}
          display={"flex"}
          alignItems="center"
          justifyContent="center"
          width="40px"
          height="40px"
          onClick={previous}
          borderRadius="50%"
          border="2px solid rgba(0,0,0,0.1)"
          sx={{
            transition: "all 0.5s ease",
            cursor: "pointer",
            "&:hover": { border: "2px solid rgba(0,0,0,1)" },
          }}
        >
          <KeyboardArrowLeftIcon fontSize="large" />
        </Box>
        <Box
          p={3}
          onClick={next}
          display="flex"
          alignItems="center"
          justifyContent="center"
          width="40px"
          height="40px"
          borderRadius="50%"
          border="2px solid rgba(0,0,0,0.1)"
          sx={{
            transition: "all 0.5s ease",
            cursor: "pointer",
            "&:hover": { border: "2px solid rgba(0,0,0,1)" },
          }}
        >
          <KeyboardArrowRightIcon fontSize="large" />
        </Box>
      </Stack>
    </Box>
  );
};

export default SimpleSlider;
