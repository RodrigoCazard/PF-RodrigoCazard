import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { fetchUserData, getOrders } from "../Utils/users";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [ordersDetails, setOrdersDetails] = useState([]);
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
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
    };

    fetchData();
  }, [user?.uid, isAuthenticated]);

  return (
    <div>
      {console.log(orders)}
      {orders.map((order) => {
        return (
          <div key={order.id}>
            <p>{order.id}</p>
            <hr />
            <p>{order.quantity}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Orders;
