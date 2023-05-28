import React from "react";
import { AppState } from "../AppState";
import { useContext } from "react";
import { Typography, Grid, Container, Box } from "@mui/material";
import { AccountCircle, DateRange } from "@mui/icons-material";
import DonationsAccordion from "./DonationsAccordion";
import RequestsAccordion from "./RequestsAccordion";

function Reporting() {
  const { appState } = useContext(AppState);
  const memberNumber = appState.memberNumber;
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-GB");

  const isAdmin = memberNumber.endsWith("ADM");
  return (
    <Container>
      <Box
        sx={{
          margin: "1vw",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">
          {isAdmin
            ? `${memberNumber}`
            : "You are not allowed to view this page!"}
        </Typography>
        <Typography variant="h6">{formattedDate}</Typography>
      </Box>

      {isAdmin ? (
        <Box>
          <Box>
            <DonationsAccordion />
          </Box>

          <Box>
            <RequestsAccordion />
          </Box>
        </Box>
      ) : (
        <Typography variant="body1" gutterBottom>
          You are not allowed to view this page!
        </Typography>
      )}
    </Container>
  );
}

export default Reporting;
