import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getOrdersByUser } from "../Utils/users";

import { Box, Button, CircularProgress, Typography } from "@mui/material";

import { Link } from "react-router-dom";

import { useTheme } from "@emotion/react";
import NotLogged from "../NotLogged/NotLogged";
import OrderTable from "./OrderTable";
import BreadCrumbsCustom from "../BreadCrumbsCustom/BreadCrumbsCustom";
const Orders = () => {
  const [orders, setOrders] = useState([]);

  const { isAuthenticated, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      if (isAuthenticated() && user?.uid) {
        try {
          const result = await getOrdersByUser(user?.uid);
          setOrders(result);
        } catch (error) {
          console.error("Error :", error);
        }
      } else {
        console.error("Not authenticated");
      }
      setIsLoading(false);
    };

    fetchData();
  }, [user?.uid, isAuthenticated]);

  return (
    <>
      <BreadCrumbsCustom
        breadCrumbs={[{ name: "Profile", link: "/profile" }, "Orders"]}
      />
      <Box>
        <Typography variant="body1" color={"primary"} component={"p"} mb={1}>
          - Orders
        </Typography>
        <Typography variant="h3" component="h2">
          Your Orders
        </Typography>
      </Box>
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
                  <>
                    <OrderTable ordersDetails={orders}> </OrderTable>
                  </>
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
