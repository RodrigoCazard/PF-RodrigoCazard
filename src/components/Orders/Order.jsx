import { Box, Button, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React, { useEffect, useState } from "react";
import { getOrder } from "../Utils/order";
import { Link } from "react-router-dom";

const Order = ({ orderId }) => {
  const formatTimestamp = (timestamp) => {
    if (!timestamp || typeof timestamp !== "object") {
      return ""; // O cualquier valor predeterminado que desees mostrar
    }

    const { seconds, nanoseconds } = timestamp;
    const date = new Date(seconds * 1000 + nanoseconds / 1000000);

    return date.toLocaleString(); // Puedes ajustar el formato según tus necesidades
  };

  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const fetchedOrder = await getOrder(orderId);
        setOrder(fetchedOrder);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    fetchOrder();
  }, [orderId]);

  return (
    <>
      <Grid container columnSpacing={5}>
        <Grid md={12} lg={4} sm={12}>
          <Box
            border={"2px solid rgba(0,0,0,0.4)"}
            padding={"20px"}
            mb={4}
            borderRadius={2}
          >
            <Typography variant={"body2"}>Order #{orderId}</Typography>
            <hr style={{ marginBottom: "12px" }} />
            <Typography gutterBottom variant="subtitle2">
              {order?.userData?.userName}
            </Typography>
            <Typography variant="subtitle2">
              {order?.userData?.userEmail}
            </Typography>
            <Link to={"/profile"} sx={{ width: "100px" }}>
              <Button
                variant="contained"
                disableElevation
                sx={{
                  fontWeight: "bold",
                  padding: "7px 13px",
                  fontSize: "14px",
                  borderRadius: 5,
                  marginTop: 2,
                }}
              >
                View Profile
              </Button>
            </Link>
          </Box>
          <Box
            border={"2px solid rgba(0,0,0,0.4)"}
            padding={"10px 20px"}
            mb={4}
            borderRadius={2}
          >
            <Box display={"flex"} alignItems={"end"} gap={1}>
              <Typography variant={"body2"}>Data Placed:</Typography>
              <Typography variant="subtitle2">
                {formatTimestamp(order?.timestamp)}
              </Typography>
            </Box>
            <Box display={"flex"} alignItems={"end"} gap={1}>
              <Typography variant={"body2"}>Store:</Typography>
              <Typography variant="subtitle2">ByteTech</Typography>
            </Box>
            <Box display={"flex"} alignItems={"end"} gap={1}>
              <Typography variant={"body2"}>Coupon code:</Typography>
              <Typography variant="subtitle2">No</Typography>
            </Box>

            <Box display={"flex"} alignItems={"end"} gap={1}>
              <Typography variant={"body2"}>Payment method:</Typography>
              <Typography variant="subtitle2">Credit Card</Typography>
            </Box>
            <Box display={"flex"} alignItems={"end"} gap={1}>
              <Typography variant={"body2"}>Shipping type:</Typography>
              <Typography variant="subtitle2"> *In development* </Typography>
            </Box>
          </Box>
          <Box
            border={"2px solid rgba(0,0,0,0.4)"}
            padding={"10px 20px"}
            mb={4}
            borderRadius={2}
          >
            <Typography variant={"body2"} mb={2}>
              Payment Details
            </Typography>

            <Box display={"flex"} alignItems={"end"} gap={1}>
              <Typography variant={"body2"}>Card Name:</Typography>
              <Typography variant="subtitle2">
                {order?.paymentInfo?.name}
              </Typography>
            </Box>

            <Box display={"flex"} alignItems={"end"} gap={1}>
              <Typography variant={"body2"}> Number:</Typography>
              <Typography variant="subtitle2">
                {order?.paymentInfo?.number?.slice(
                  0,
                  order.paymentInfo?.number.length / 2
                )}
                ...
              </Typography>
            </Box>

            <Box display={"flex"} alignItems={"end"} gap={1}>
              <Typography variant={"body2"}>Issuer:</Typography>
              <Typography variant="subtitle2">
                {order?.paymentInfo?.issuer
                  ? order.paymentInfo.issuer
                  : "Not available"}
              </Typography>
            </Box>
          </Box>
          <Box
            border={"2px solid rgba(0,0,0,0.4)"}
            padding={"10px 20px"}
            mb={4}
            borderRadius={2}
          >
            <Typography variant={"body2"} mb={2}>
              Shipping Details
            </Typography>

            <Box display={"flex"} alignItems={"end"} gap={1}>
              <Typography variant={"body2"}>Country: </Typography>
              <Typography variant="subtitle2">
                {order?.userData?.userCountry?.label}
              </Typography>
            </Box>
            <Box display={"flex"} alignItems={"end"} gap={1}>
              <Typography variant={"body2"}> Address: </Typography>
              <Typography variant="subtitle2">
                {order?.userData?.userAddress}
              </Typography>
            </Box>
          </Box>
          <Link
            to={"/profile/orders"}
            style={{
              textDecoration: "none",
              color: "black",
            }}
          >
            <Button
              fullWidth
              disableElevation
              disableRipple
              color="warning"
              variant="outlined"
              sx={{
                borderRadius: 20,
                "&:hover, &:focus": {
                  border: "2px solid #000",
                },
                border: "2px solid rgba(0,0,0,0.1)",
                padding: "12px 22px",
                fontSize: 18,
                fontWeight: "bold",
                letterSpacing: 1,
              }}
            >
              See all your orders
            </Button>
          </Link>
        </Grid>
        <Grid md={12} lg={8} sm={12}>
          <Box
            display={"flex"}
            flexWrap={"wrap"}
            justifyContent={"space-between"}
            borderRadius={2}
            gap={2}
          >
            <Box
              border={"2px solid rgba(0,0,0,0.4)"}
              borderRadius={2}
              padding={"20px"}
              width={190}
            >
              <Typography variant={"body2"} mb={3}>
                Total
              </Typography>
              <Typography variant={"body4"}>${order?.total}</Typography>
            </Box>
            <Box
              border={"2px solid rgba(0,0,0,0.4)"}
              borderRadius={2}
              padding={"20px"}
              width={190}
            >
              <Typography variant={"body2"}>Tax</Typography>
            </Box>
            <Box
              border={"2px solid rgba(0,0,0,0.4)"}
              borderRadius={2}
              padding={"20px"}
              width={190}
            >
              <Typography variant={"body2"}>Shipping</Typography>
            </Box>
            <Box
              border={"2px solid rgba(0,0,0,0.4)"}
              borderRadius={2}
              padding={"20px"}
              width={190}
            >
              <Typography variant={"body2"} mb={3}>
                SubTotal
              </Typography>
              <Typography variant={"body4"}>${order?.total}</Typography>
            </Box>
          </Box>
          <Box
            border={"2px solid rgba(0,0,0,0.4)"}
            padding={"20px"}
            borderRadius={2}
            mt={5}
          >
            <Box display={"flex"} flexDirection={"column"}>
              {" "}
              <Box display={"flex"} justifyContent={"space-between"}>
                <Typography variant={"body1"}>Products</Typography>
                <Typography alignSelf={"end"} variant={"body2"}>
                  Total items: {order?.quantity}
                </Typography>
              </Box>
              <hr />
              {order?.products?.map((product, index) => (
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  gap={5}
                  key={index}
                  mt={2}
                >
                  <img src={product.img} width={"100px"}></img>
                  <Typography variant={"body2"}> {product?.name}</Typography>
                  <Typography variant={"body2"}>
                    Quantity: {product?.quantity}
                  </Typography>
                  <Typography variant={"body2"}>
                    Price: {product?.price}$
                  </Typography>

                  <hr />
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Order;
