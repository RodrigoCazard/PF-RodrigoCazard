import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

const columns = [
  {
    field: "product",
    headerName: "Products",
    width: 500,
    headerAlign: "start",
  },
  {
    field: "quantity",
    headerName: "Total Quantity",
    width: 200,
    type: "number",
    headerAlign: "start",
  },

  {
    field: "total",
    headerName: "Total",
    type: "number",
    width: 150,
    headerAlign: "start",
  },

  { width: 150 },
  { field: "id", headerName: "ID", width: 300, headerAlign: "start" },
];

export default function OrderTable({ ordersDetails }) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (ordersDetails) {
      const updatedRows = ordersDetails.map((order) => ({
        id: String(order.id),
        product: order.products[0].name,
        quantity: `${order.quantity} items`,
        total: `${order.total} $`,
      }));

      setRows(updatedRows);
    }
  }, [ordersDetails]);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        sx={{
          border: "2px solid rgba(0,0,0,0.1)",
          borderRadius: 5,
          padding: "15px 30px",
        }}
        rows={rows}
        columns={columns}
        disableColumnMenu
        hideFooterSelectedRowCount
        hideFooter
        //ver celda
        // showColumnVerticalBorder
        // showCellVerticalBorder
        disableClickEventBubbling
        disableDensitySelector
        disableRowSelectionOnClick
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
}
