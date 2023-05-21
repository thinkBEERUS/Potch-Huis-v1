import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Typography } from "@mui/material";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import InsertChartOutlinedRoundedIcon from "@mui/icons-material/InsertChartOutlinedRounded";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import Modal from "@mui/material/Modal";
import BarChart from "./BarChart";
import Unconfirmed from "./Unconfirmed";
import { EditOutlined } from "@material-ui/icons";
import { useMode, tokens } from "../theme";
import { AppState } from "../AppState";
import { useContext } from "react";

const UnconfirmedTable = (props) => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(15);
  const [rows, setRows] = useState([]);
  const [totalRows, setTotalRows] = useState(10);
  const [chartName, setChartName] = useState("");
  const [chartData, setChartData] = useState([]);
  const [showChart, setShowChart] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState([]);
  const [theme] = useMode();
  const colors = tokens(theme.palette.mode);
  const { appState, setAppState } = useContext(AppState);
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-GB");

  const handleChartShow = () => {
    setShowChart(true);
  };

  const handleModalClose = () => {
    setShowChart(false);
  };
  const styleModal = {
    marginTop: "30vh",
    marginLeft: "30vw",
    width: "50%",
    height: "50%",
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

  const handleConfirm = () => {
    const endpoint =
      "https://localhost:7287/Donations/Donation?donationNumber=" +
      selectedDonation.donationNumber;

    fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Handle the response data
        const oldDonation = data[0];
        const newDonation = {
          type: oldDonation.type,
          amount: oldDonation.amount,
          received: oldDonation.received,
          memberNumber: oldDonation.memberNumber,
          donationNumber: oldDonation.donationNumber,
          confirmed: formattedDate,
          confirmedBy: appState.memberNumber,
          id: 0,
        };
        //Update the Donation
        const endpoint = "https://localhost:7287/Donations/Update";

        fetch(endpoint, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newDonation),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Request failed with status ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            // Handle the response data
            console.log(data);
          })
          .catch((error) => {
            // Handle any errors that occurred during the request
            console.error(error);
          });
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error(error);
      });
    setOpen(false);
    setRefresh(true);
  };

  const handleRowDoubleClick = (params) => {
    setOpen(true);
    setSelectedDonation(params.row);
  };

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
  }, [page, pageSize, refresh]);

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
            <BarChart data={chartData} memberName={chartName} />
          </Box>
        </Modal>
      )}

      {open && (
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="confirmation-modal-title"
          aria-describedby="confirmation-modal-description"
        >
          <Box sx={styleModal}>
            <h1 id="confirmation-modal-title">Confirm Donation</h1>
            <h3 id="confirmation-modal-description">
              Are you sure you want to confirm the donation{" "}
              {selectedDonation.donationNumber}?
            </h3>
            <Typography>Details:</Typography>
            <p>
              Member&nbsp;&nbsp;Number:&nbsp;{selectedDonation.memberNumber}
            </p>
            <p>Donation&nbsp;&nbsp;Amount:&nbsp;{selectedDonation.amount}</p>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <Button
                sx={{
                  backgroundColor: colors.itemColor,
                  color: colors.typographyColor,
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                  margin: "30px",
                }}
                onClick={() => {
                  handleConfirm();
                }}
              >
                Confirm Donation
              </Button>
              <Button
                sx={{
                  backgroundColor: colors.itemColor,
                  color: colors.typographyColor,
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                  margin: "30px",
                }}
                onClick={() => {
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>
      )}
    </Box>
  );
};

export default UnconfirmedTable;
