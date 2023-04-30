import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import InsertChartOutlinedRoundedIcon from "@mui/icons-material/InsertChartOutlinedRounded";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import Modal from "@mui/material/Modal";
import BarChart from "./BarChart";
import Unconfirmed from "./Unconfirmed";
import { EditOutlined } from "@material-ui/icons";

const UnconfirmedTable = (props) => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(15);
  const [rows, setRows] = useState([]);
  const [totalRows, setTotalRows] = useState(10);
  const [chartName, setChartName] = useState("");
  const [chartData, setChartData] = useState([]);
  const [showChart, setShowChart] = useState(false);
  const [refresh, setRefresh] = useState(false);

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

  function deleteDonation(donationNumber) {
    fetch(
      `https://localhost:7287/Donations/Delete?donationNumber=${donationNumber}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));

    setRefresh(true);
  }

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
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      flex: 1,
      getActions: (params) => {
        return [
          <EditOutlined
            onClick={() => {
              console.log(params.row);
            }}
          />,
          <DeleteForeverOutlinedIcon
            onClick={() => deleteDonation(params.row.donationNumber)}
          />,
        ];
      },
    },
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
      `${process.env.REACT_APP_API_URL}/Donations/Unconfirmed?pageNumber=${
        page + 1
      }&pageSize=${pageSize}`
    )
      .then((response) => response.json())
      .then((data) => setRows(data));
  };

  useEffect(() => {
    fetchRows();
    fetchData();
  }, [page, pageSize, refresh, props.refreshTable]);

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
      {showChart && (
        <Modal open={showChart} onClose={handleModalClose}>
          <Box sx={styleModal}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button onClick={handleModalClose}>
                <HighlightOffOutlinedIcon />
              </Button>
            </Box>
            <BarChart data={chartData} memberName={chartName} />
          </Box>
        </Modal>
      )}
    </Box>
  );
};

export default UnconfirmedTable;
