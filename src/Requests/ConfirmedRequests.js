import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Header from "../ed-roh/components/Header";
import { useMode, tokens } from "../theme";
import { useNavigate } from "react-router-dom";
import RequestItems from "./RequestItems";

const columns = [
  { field: "id", headerName: "", flex: 0.5 },
  { field: "requestNumber", headerName: "Request Number", flex: 2 },
  { field: "memberNumber", headerName: "Member Number", flex: 2 },
  { field: "value", headerName: "Value", flex: 1 },
  { field: "received", headerName: "Received", flex: 3 },
  { field: "confirmed", headerName: "Confirmed", flex: 3 },
];

const ConfirmedRequests = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(15);
  const [rows, setRows] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [theme] = useMode();
  const colors = tokens(theme.palette.mode);
  const [items, setItems] = useState([]);

  const handlePageChange = (params) => {
    setPage(params);
  };

  const handlePageSizeChange = (params) => {
    setPageSize(params);
  };

  const fetchRows = async () => {
    await fetch(`${process.env.REACT_APP_API_URL}/Requests/Rows`)
      .then((response) => response.json())
      .then((data) => setTotalRows(data[0]));
  };

  const fetchData = async () => {
    await fetch(
      `${process.env.REACT_APP_API_URL}/Requests/Confirmed?pageNumber=${
        page + 1
      }&pageSize=${pageSize}`
    )
      .then((response) => response.json())
      .then((data) => setRows(data));
  };

  function handleShowItems(params) {
    fetch(
      `${process.env.REACT_APP_API_URL}/Requests/ItemRequest/${params.row.requestNumber}`,
      {
        method: "GET",
        headers: {
          Accept: "*/*",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setItems(data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }

  useEffect(() => {
    fetchRows();
    fetchData();
  }, [page, pageSize]);

  return (
    <Box
      sx={{
        height: "90vh",
        width: "100%",
      }}
    >
      <Box
        sx={{
          margin: "1%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Header
          title="Requests"
          subtitle="Easily view requests made to Potch Huis"
        />
        <Button
          sx={{
            backgroundColor: colors.itemColor,
            color: colors.typographyColor,
          }}
          onClick={() => navigate("/NewRequestForm?confirmed=true")}
        >
          <AddCircleOutlineOutlinedIcon />
        </Button>
      </Box>
      <Box
        sx={{
          margin: "1%",
          display: "flex",
          height: "85%",
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
          onRowDoubleClick={handleShowItems}
        />
      </Box>

      {items.length > 0 && <RequestItems items={items} />}
    </Box>
  );
};

export default ConfirmedRequests;
