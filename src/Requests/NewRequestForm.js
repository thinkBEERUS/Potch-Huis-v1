import React, { useState } from "react";
import { TextField, Button, Box, Typography, Grid, Paper } from "@mui/material";
import NewRequestItemForm from "./NewRequestItemForm";
import { useLocation } from "react-router-dom";

function NewRequestForm() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const propValue = searchParams.get("confirmed");
  const [requestData, setRequestData] = useState({
    memberNumber: "",
  });

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
        <Grid container spacing={2}>
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
          <Grid item xs={12}>
            <NewRequestItemForm
              memberNumber={requestData.memberNumber}
              confirmed={propValue}
            />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default NewRequestForm;
