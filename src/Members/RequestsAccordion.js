import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
} from "@mui/material";
import { Search, ExpandMore } from "@mui/icons-material";
import { Bar } from "react-chartjs-2";

const data = {
  labels: ["January", "February", "March", "April", "May"],
  datasets: [
    {
      label: "Requests",
      data: [10, 5, 8, 15, 12],
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
    },
  ],
};

const RequestsAccordion = () => {
  const [searchParams, setSearchParams] = React.useState({
    type: "",
    amount: "",
    received: "",
    memberNumber: "",
    RequestNumber: "",
    confirmed: "",
    confirmedBy: "",
    id: 0,
  });

  const handleInputChange = (e) => {
    setSearchParams((prevSearchParams) => ({
      ...prevSearchParams,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSearch = () => {
    // Perform search/query logic with the searchParams
    console.log("Search parameters:", searchParams);
  };

  return (
    <Accordion style={{ margin: "2vw" }}>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="filter-content"
        id="filter-header"
      >
        <Typography>Requests</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              name="memberNumber"
              label="Member Number"
              value={searchParams.memberNumber}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              name="requestNumber"
              label="Request Number"
              value={searchParams.RequestNumber}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              name="stockNumber"
              label="Stock Number"
              value={searchParams.stockNumber}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              name="confirmed"
              label="Confirmed"
              value={searchParams.confirmed}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              name="received"
              label="Received"
              value={searchParams.received}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          {/* Other search parameters */}
          <Grid item xs={12}>
            <Button
              variant="contained"
              startIcon={<Search />}
              onClick={handleSearch}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </AccordionDetails>
      <AccordionDetails>
        <Paper style={{ width: "90%", height: 300 }}>
          <Bar data={data} options={{ maintainAspectRatio: false }} />
        </Paper>
      </AccordionDetails>
    </Accordion>
  );
};

export default RequestsAccordion;
