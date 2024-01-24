import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ImgComputer from "../../assets/71lZK7nE_oL-removebg.png";
import ImgPhone from "../../assets/Samsung-White-Combination-Pen-smartphone-mobile-on-transparent-background-PNG-PhotoRoom.png-PhotoRoom.png";
import ImgPrinter from "../../assets/71-715267_printer-png-image-transparent-background-printer-png-png-PhotoRoom.png-PhotoRoom.png";
import ImgLaptop from "../../assets/kisspng-laptop-intel-msi-gt80s-titan-sli-msi-gt80-titan-sl-ms-5b10ff23ce3678.1328110115278405478447-PhotoRoom.png-PhotoRoom.png";
import { Component } from "react";
import { Box } from "@mui/material";

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      autoplay: "true",
      autoplaySpeed: "40",
      dots: false,
      arrow: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <div>
        <Slider {...settings}>
          <Box>
            <img
              src={ImgComputer}
              alt="Computer images"
              style={{ objectFit: "contain", width: "80%", margin: "0 auto" }}
            ></img>
          </Box>
          <Box height={"80%"}>
            <img
              src={ImgPhone}
              alt="Computer images"
              style={{
                objectFit: "contain",
                width: "69%",
                margin: "auto auto",
              }}
            ></img>
          </Box>
          <Box>
            <img
              src={ImgPrinter}
              alt="Computer images"
              style={{
                objectFit: "contain",
                width: "69%",
                margin: "50px auto 0 ",
              }}
            ></img>
          </Box>
          <Box>
            <img
              src={ImgLaptop}
              alt="Computer images"
              style={{
                objectFit: "contain",
                width: "85%",
                margin: "40px auto 0",
              }}
            ></img>
          </Box>
        </Slider>
      </div>
    );
  }
}
