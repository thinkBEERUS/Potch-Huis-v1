import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import InsertChartOutlinedRoundedIcon from "@mui/icons-material/InsertChartOutlinedRounded";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import Modal from "@mui/material/Modal";
import BarChart from "./BarChart";

const StockTable = (props) => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [rows, setRows] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [chartName, setChartName] = useState("");
  const [chartData, setChartData] = useState([]);
  const [showChart, setShowChart] = useState(false);

  const handleChartShow = () => {
    setShowChart(true);
  };

  const handleModalClose = () => {
    setShowChart(false);
  };
  const styleModal = {
    marginTop: "10vh",
    marginLeft: "10vw",
    width: "80vw",
    height: "80vh",
    bgcolor: "primary.main",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const fetchChartData = async (name) => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL +
          `/Stock/Reporting/Requests/Monthly?name=${name}&months=12`
      );
      const data = await response.json();
      setChartData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    { field: "id", headerName: "", flex: 0.5 },
    { field: "stockNumber", headerName: "Stock Number", flex: 1 },
    { field: "name", headerName: "Name", flex: 2 },
    { field: "description", headerName: "Description", flex: 3 },
    { field: "quantity", headerName: "Quantity", flex: 1 },
    { field: "value", headerName: "Value", flex: 1 },
    { field: "lastUpdated", headerName: "Updated On", flex: 2 },
    { field: "active", headerName: "Menu Status", flex: 1 },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      flex: 1,
      getActions: (params) => {
        return [
          <InsertChartOutlinedRoundedIcon
            onClick={() => {
              setChartName(params.row.name);
              fetchChartData(params.row.name);
              handleChartShow();
            }}
          />,
          <DeleteForeverOutlinedIcon
            onClick={() => props.removeStock(params.row.id)}
          />,
        ];
      },
    },
  ];

  const handlePageChange = (params) => {
    setPage(params);
  };

  const handleRowDoubleClick = (params) => {
    props.editStock(params.row.id);
  };

  const handlePageSizeChange = (params) => {
    setPageSize(params);
  };

  const fetchRows = async () => {
    await fetch(`${process.env.REACT_APP_API_URL}/Stock/Rows`)
      .then((response) => response.json())
      .then((data) => setTotalRows(data[0]));
  };

  const fetchData = async () => {
    await fetch(
      `${process.env.REACT_APP_API_URL}/AllStock?pageNumber=${
        page + 1
      }&pageSize=${pageSize}`
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
        rowsPerPageOptions={[10, 25, 50, 100]}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        rowCount={totalRows}
        disableRowSelectionOnClick
        paginationMode="server"
        onRowDoubleClick={handleRowDoubleClick}
      />
      {showChart && (
        <Modal open={showChart} onClose={handleModalClose}>
          <Box sx={styleModal}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button onClick={handleModalClose}>
                <HighlightOffOutlinedIcon />
              </Button>
            </Box>
            <BarChart data={chartData} stockName={chartName} />
          </Box>
        </Modal>
      )}
    </Box>
  );
};

export default StockTable;
