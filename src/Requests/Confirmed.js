import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";

const columns = [
  { field: "id", headerName: "", width: 25 },
  { field: "requestNumber", headerName: "Request Number", width: 150 },
  { field: "memberNumber", headerName: "Member Number", width: 150 },
  { field: "value", headerName: "Value", width: 150 },
  { field: "received", headerName: "Received", width: 200 },
  { field: "confirmed", headerName: "Confirmed", width: 200 },
];

const ReqConfirmedRequestsuests = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(15);
  const [rows, setRows] = useState([]);
  const [totalRows, setTotalRows] = useState(0);

  const handlePageChange = (params) => {
    setPage(params);
  };

  const handlePageSizeChange = (params) => {
    setPageSize(params);
  };

  const fetchRows = async () => {
    await fetch(process.env.REACT_APP_API_URL + `/Requests/Rows`)
      .then((response) => response.json())
      .then((data) => setTotalRows(data[0]));
  };

  const fetchData = async () => {
    await fetch(
      process.env.REACT_APP_API_URL +
        `/Requests?pageNumber=${page + 1}&pageSize=${pageSize}`
    )
      .then((response) => response.json())
      .then((data) => setRows(data));
  };

  useEffect(() => {
    fetchRows();
    fetchData();
  }, [page, pageSize]);

  return (
    <Box
      sx={{
        height: "90vh",
        width: "100%",
        padding: "5vh",
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        pagination
        page={page}
        pageSize={pageSize}
        rowsPerPageOptions={[15, 25, 50, 100]}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        rowCount={totalRows}
        paginationMode="server"
      />
    </Box>
  );
};

export default ConfirmedRequests;
