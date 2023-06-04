import {
  Box,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
} from "@mui/material";
import { tokens } from "../theme";
import StockTable from "../Stock/StockTable";
import MemberTable from "../Members/MemberTable";
import StatBox from "../ed-roh/components/StatBox";
import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DonationTable from "../Donations/DonationTable";
import UnconfirmedTable from "../Donations/UnconfirmedTable";
import ConfirmedRequests from "../Requests/ConfirmedRequests";
import UnconfirmedRequests from "../Requests/UnconfirmedRequests";
import {
  CircleNotificationsOutlined,
  DeliveryDining,
  ExpandCircleDown,
  HeartBroken,
  OnlinePredictionRounded,
  Person2,
  PersonAddAlt,
  PersonAddAlt1Outlined,
} from "@mui/icons-material";
import {
  DonutLarge,
  Favorite,
  ImportantDevices,
  MonetizationOn,
  Star,
} from "@material-ui/icons";

const Dashboard_Admin = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box display="flex" justifyContent="space-evenly" flexWrap={"wrap"}>
      <Box
        backgroundColor={colors.backgroundColor}
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexGrow="1"
        height={"15vh"}
        margin={"1vw"}
      >
        <StatBox
          title="41"
          subtitle="Donations Received"
          progress="0.75"
          increase="+14%"
          icon={<MonetizationOn sx={{ fontSize: "26px" }} />}
        />
      </Box>
      <Box
        backgroundColor={colors.backgroundColor}
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexGrow="1"
        height={"15vh"}
        margin={"1vw"}
      >
        <StatBox
          title="20"
          subtitle="Requests Received"
          progress="1"
          increase="+21%"
          icon={<OnlinePredictionRounded sx={{ fontSize: "26px" }} />}
        />
      </Box>
      <Box
        backgroundColor={colors.backgroundColor}
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexGrow="1"
        height={"15vh"}
        margin={"1vw"}
      >
        <StatBox
          title="4"
          subtitle="New Members"
          progress="0.90"
          increase="+5%"
          icon={<PersonAddAlt sx={{ fontSize: "26px" }} />}
        />
      </Box>
      <Box
        backgroundColor={colors.backgroundColor}
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexGrow="1"
        height={"15vh"}
        margin={"1vw"}
      >
        <StatBox
          title="17/20"
          subtitle="Deliveries Made"
          progress="0.70"
          increase="+13%"
          icon={<DeliveryDining sx={{ fontSize: "26px" }} />}
        />
      </Box>

      <Box
        backgroundColor={colors.backgroundColor}
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexGrow="1"
        height={"15vh"}
        margin={"1vw"}
      >
        <StatBox
          title="Frequent Flier"
          subtitle="PH00001ADM"
          progress="-0.75"
          increase="-14%"
          icon={<ImportantDevices sx={{ fontSize: "26px" }} />}
        />
      </Box>
      <Box
        backgroundColor={colors.backgroundColor}
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexGrow="1"
        height={"15vh"}
        margin={"1vw"}
      >
        <StatBox
          title="Big Spender"
          subtitle="PH00001ADM"
          progress="0.7"
          increase="+45%"
          icon={<Star sx={{ fontSize: "26px" }} />}
        />
      </Box>
      <Box
        backgroundColor={colors.backgroundColor}
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexGrow="1"
        height={"15vh"}
        margin={"1vw"}
      >
        <StatBox
          title="Least Popular"
          subtitle="Banana Apple"
          progress="-0.75"
          increase="-14%"
          icon={<HeartBroken sx={{ fontSize: "26px" }} />}
        />
      </Box>
      <Box
        backgroundColor={colors.backgroundColor}
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexGrow="1"
        height={"15vh"}
        margin={"1vw"}
      >
        <StatBox
          title="Most Popular"
          subtitle="Outdoor"
          progress="0.7"
          increase="+45%"
          icon={<Favorite sx={{ fontSize: "26px" }} />}
        />
      </Box>
    </Box>
  );
};

export default Dashboard_Admin;
