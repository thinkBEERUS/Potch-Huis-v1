import React, { useState } from "react";
import { TextField, Button, Box, Typography, Grid, Paper } from "@mui/material";
import { Add } from "@mui/icons-material";
import NewRequestItemForm from "./NewRequestItemForm";

function NewRequestForm() {
  const [requestData, setRequestData] = useState({
    requestNumber: "",
    memberNumber: "",
    value: "",
    received: "",
    confirmed: "",
    id: 0,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("https://localhost:7287/Requests/Create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRequestData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Box sx={{ m: "1%" }}>
      <Typography variant="h5" gutterBottom>
        New Request
      </Typography>
      <Paper sx={{ p: "2%", mt: "2%" }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                id="requestNumber"
                name="requestNumber"
                label="Request Number"
                value={requestData.requestNumber}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="memberNumber"
                name="memberNumber"
                label="Member Number"
                value={requestData.memberNumber}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="value"
                name="value"
                label="Value"
                value={requestData.value}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="received"
                name="received"
                label="Received"
                value={requestData.received}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="confirmed"
                name="confirmed"
                label="Confirmed"
                value={requestData.confirmed}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <NewRequestItemForm />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<Add />}
            sx={{ mt: "2%" }}
          >
            Create Request
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default NewRequestForm;
