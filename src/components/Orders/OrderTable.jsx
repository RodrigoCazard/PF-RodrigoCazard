import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OrderTable({ ordersDetails }) {
  const navigate = useNavigate();

  const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    "& .MuiDataGrid-row": {
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "rgba(156, 39, 176,0.2)",
      },
    },
  }));

  const columns = [
    {
      field: "timestamp",
      headerName: "Purchase Date",
      width: 250,
      headerAlign: "start",
    },
    {
      field: "product",
      headerName: "Products",
      width: 400,
      headerAlign: "start",
    },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 150,
      type: "number",
      headerAlign: "start",
      renderCell: (params) => `${params.row.quantity} Items`,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      width: 150,
      headerAlign: "start",
      renderCell: (params) => `$ ${params.row.total}`,
    },

    { field: "id", headerName: "ID", width: 300, headerAlign: "start" },
  ];

  const [rows, setRows] = useState([]);

  const handleRowClick = (params) => {
    navigate(`/profile/orders/${params.id}`);
  };

  useEffect(() => {
    if (ordersDetails) {
      const updatedRows = ordersDetails.map((order) => {
        const timestampInMilliseconds =
          order.timestamp.seconds * 1000 +
          Math.floor(order.timestamp.nanoseconds / 1e6);
        const date = new Date(timestampInMilliseconds);
        const productNames = order.products
          .map((product) => product.name)
          .join(", ");
        return {
          id: String(order.id),
          product: productNames,
          quantity: order.quantity,
          total: order.total,
          timestamp: date.toLocaleString(),
        };
      });

      setRows(updatedRows);
    }
  }, [ordersDetails]);

  return (
    <div style={{ width: "100%" }}>
      <StyledDataGrid
        sx={{
          border: "2px solid rgba(0,0,0,0.1)",
          borderRadius: 5,
          padding: "15px 30px",
        }}
        rows={rows}
        columns={columns}
        disableColumnMenu
        disableClickEventBubbling
        disableDensitySelector
        disableRowSelectionOnClick
        onRowClick={handleRowClick}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
      />
    </div>
  );
}
