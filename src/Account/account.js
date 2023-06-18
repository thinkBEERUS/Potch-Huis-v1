import React from "react";
import {
  Grid,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { ExpandMore, Update } from "@mui/icons-material";
// import qrCodeImage from "./qr-code-image.jpg";

const AccountPage = () => {
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    age: 30,
    address: "123 Main St, City",
  };

  const requests = [
    { id: 1, title: "Request 1", status: "Pending" },
    { id: 2, title: "Request 2", status: "Approved" },
    // Add more request items as needed
  ];

  const donations = [
    { id: 1, title: "Donation 1", amount: 100 },
    { id: 2, title: "Donation 2", amount: 50 },
    // Add more donation items as needed
  ];

  const columns = [
    { field: "title", headerName: "Title", width: 200 },
    { field: "status", headerName: "Status", width: 120 },
    { field: "amount", headerName: "Amount", width: 120 },
  ];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-evenly"
          p={2}
        >
          <Box display="flex" alignItems="center">
            <img src={""} alt="QR Code" width={120} height={120} />
          </Box>
          <Box>
            <Typography variant="h6">{user.name}</Typography>
            <Typography variant="body2">{user.email}</Typography>
            <Typography variant="body2">{user.age} years old</Typography>
            <Typography variant="body2">{user.address}</Typography>
          </Box>
          <Box>
            <Button>
              Update <Update />
            </Button>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6">Requests</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div style={{ height: 300, width: "100%" }}>
              <DataGrid rows={requests} columns={columns} pageSize={5} />
            </div>
          </AccordionDetails>
        </Accordion>
      </Grid>
      <Grid item xs={12}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6">Donations</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div style={{ height: 300, width: "100%" }}>
              <DataGrid rows={donations} columns={columns} pageSize={5} />
            </div>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  );
};

export default AccountPage;
