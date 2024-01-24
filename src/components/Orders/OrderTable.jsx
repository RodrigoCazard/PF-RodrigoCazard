import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

const columns = [
  { field: "product", headerName: "Products", width: 500 },
  {
    field: "quantity",
    headerName: "Total Quantity",
    width: 200,
    type: "number",
  },

  {
    field: "total",
    headerName: "Total",
    type: "number",
    width: 200,
  },
  { width: 200 },
  { field: "id", headerName: "ID", width: 300 },
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
        rows={rows}
        columns={columns}
        disableColumnSelector
        disableColumnMenu
        hideFooterSelectedRowCount
        hideFooter
        //ver celda
        // showColumnVerticalBorder
        // showCellVerticalBorder
        //
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
