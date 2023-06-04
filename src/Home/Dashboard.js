import React from "react";
import { AppState } from "../AppState";
import { useContext } from "react";
import { Typography, Grid, Container, Box } from "@mui/material";
import { AccountCircle, DateRange } from "@mui/icons-material";
import Dashboard_Admin from "./Dashboard-admin";
import DashboardUser from "./Dashboard-user";

function Dashboard() {
  const { appState } = useContext(AppState);
  const memberNumber = appState.memberNumber;
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-GB");

  const isAdmin = memberNumber.endsWith("ADM");
  return <>{isAdmin ? <Dashboard_Admin /> : <DashboardUser />}</>;
}

export default Dashboard;
