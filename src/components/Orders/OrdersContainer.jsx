import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { fetchUserData, getOrders } from "../Utils/users";
import Order from "./Order";
import {
  Box,
  Breadcrumbs,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useTheme } from "@emotion/react";
import NotLogged from "../NotLogged/NotLogged";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [ordersDetails, setOrdersDetails] = useState([]);
  const { isAuthenticated, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      if (isAuthenticated() && user?.uid) {
        try {
          const result = await getOrders(user?.uid);
          setOrders(result);
        } catch (error) {
          console.error("Error al obtener las ordenes:", error);
        }
      } else {
        console.log("no estoy autenticado");
      }
      setIsLoading(false);
    };

    fetchData();
  }, [user?.uid, isAuthenticated]);

  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;

  const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
    opacity: 0.6;

    &:hover {
      text-decoration: underline;
      opacity: 1;
      color: ${primaryColor};
    }
  `;

  return (
    <>
      {isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems={"center"}
          height={"30vh"}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          <Breadcrumbs
            sx={{ margin: "20px 0 40px 0" }}
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            <StyledLink to="/">Home page</StyledLink>
            <StyledLink to="/profile">Profile</StyledLink>
            <Typography color="text.primary">Orders</Typography>
          </Breadcrumbs>
          <Box>
            <Typography
              variant="body1"
              color={"primary"}
              component={"p"}
              mb={1}
            >
              - Orders
            </Typography>
            <Typography variant="h3" component="h2">
              Your Orders
            </Typography>
          </Box>
          {isAuthenticated() ? (
            <>
              {orders.length === 0 ? (
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={"center"}
                  gap={4}
                  my={27}
                >
                  <Typography variant="h3">
                    You dont have any order yet.
                  </Typography>
                  <Link to="/category/all">
                    {" "}
                    <Button
                      variant="contained"
                      disableElevation
                      sx={{
                        borderRadius: 15,
                        padding: "20px 50px",
                        fontSize: "20px",
                      }}
                    >
                      Explore products
                    </Button>
                  </Link>
                </Box>
              ) : (
                <Box my={10} display={"flex"} flexWrap={"wrap"} gap={2}>
                  {orders.map((order) => {
                    return (
                      <Box
                        key={order.id}
                        border={"2px solid rgba(0,0,0,0.1)"}
                        borderRadius={2}
                        width={"fit-content"}
                        padding={"10px 40px"}
                      >
                        <Order {...orders}></Order>
                        <p>id:{order.id}</p>
                        <p>Quantity:{order.quantity}</p>
                        <p>Price:{order.total}$</p>
                      </Box>
                    );
                  })}
                </Box>
              )}
            </>
          ) : (
            <NotLogged></NotLogged>
          )}
        </Box>
      )}
    </>
  );
};

export default Orders;
