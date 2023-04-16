import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import ItemModal from "./ItemModal";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 130 },
  { field: "quantity", headerName: "Quantity", width: 130 },
  { field: "value", headerName: "Value", width: 130 },
  { field: "requestNumber", headerName: "Request Number", width: 200 },
  { field: "stockNumber", headerName: "Stock Number", width: 200 },
  {
    field: "requestedItemNumber",
    headerName: "Requested Item Number",
    width: 250,
  },
  { field: "actualQuantity", headerName: "Actual Quantity", width: 200 },
];

const rows = [
  {
    id: 1,
    name: "Outdoor",
    quantity: "5",
    value: "200",
    requestNumber: "R1",
    stockNumber: "#S1",
    requestedItemNumber: "#RI1",
    actualQuantity: "5.3",
  },
  {
    id: 2,
    name: "Indoor",
    quantity: "3",
    value: "100",
    requestNumber: "R2",
    stockNumber: "#S2",
    requestedItemNumber: "#RI2",
    actualQuantity: "2.5",
  },
];

const ConfirmedRequests = () => {
  // const [selectedRequestNumber, setSelectedRequestNumber] = useState(null);
  const [item, setItem] = useState(null);

  const handleRowDoubleClick = (params) => {
    // setSelectedRequestNumber(params.row.requestNumber);
    setItem(params.row);
  };

  return (
    <>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          onRowDoubleClick={handleRowDoubleClick}
        />
      </div>
      {item && <ItemModal item={item} />}
    </>
  );
};

export default ConfirmedRequests;
