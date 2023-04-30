import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";

const DonationTable = (props) => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(15);
  const [rows, setRows] = useState([]);
  const [totalRows, setTotalRows] = useState(0);

  const columns = [
    { field: "id", headerName: "", flex: 0.5 },
    { field: "memberNumber", headerName: "Member Number", flex: 2 },
    { field: "type", headerName: "Type", flex: 1 },
    { field: "amount", headerName: "Donation Value", flex: 1 },
    { field: "received", headerName: "Received", flex: 2 },
    { field: "confirmed", headerName: "Confirmed", flex: 2 },
    { field: "confirmedBy", headerName: "Confirmed By", flex: 2 },
    { field: "donationNumber", headerName: "Donation Number", flex: 1 },
    { field: "description", headerName: "Description", flex: 3 },
    { field: "purpose", headerName: "Purpose", flex: 3 },
  ];

  const handlePageChange = (params) => {
    setPage(params);
  };

  // const handleRowDoubleClick = (params) => {
  //   props.editMember(params.row);
  // };

  const handlePageSizeChange = (params) => {
    setPageSize(params);
  };

  const fetchRows = async () => {
    await fetch(`${process.env.REACT_APP_API_URL}/Donations/Rows`)
      .then((response) => response.json())
      .then((data) => setTotalRows(data[0]));
  };

  const fetchData = async () => {
    await fetch(
      `${process.env.REACT_APP_API_URL}/Donations/Confirmed?pageNumber=${
        page + 1
      }&pageSize=${pageSize}`
    )
      .then((response) => response.json())
      .then((data) => setRows(data));
  };

  useEffect(() => {
    fetchRows();
    fetchData();
  }, [page, pageSize, props.refreshTable]);

  return (
    <Box
      sx={{
        height: "80vh",
        width: "100%",
        padding: "1%",
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
        disableRowSelectionOnClick
        paginationMode="server"
        //onRowDoubleClick={handleRowDoubleClick}
      />
    </Box>
  );
};

export default DonationTable;
