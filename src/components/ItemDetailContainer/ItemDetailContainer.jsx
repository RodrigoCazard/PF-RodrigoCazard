import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUnProducto } from "../../asyncmock";
import ItemDetail from "./ItemDetail";

const ItemDetailContainer = () => {
  const [product, setProduct] = useState([]);

  const { idItem } = useParams();

  useEffect(() => {
    getUnProducto(idItem).then((respuesta) => {
      setProduct(respuesta);
      console.log(respuesta);
    });
  }, [idItem]);

  return (
    <div>
      <ItemDetail {...product}></ItemDetail>
    </div>
  );
};

export default ItemDetailContainer;
