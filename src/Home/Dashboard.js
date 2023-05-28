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

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [expandedAccordion, setExpandedAccordion] = useState(null);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedAccordion(isExpanded ? panel : false);
  };

  return (
    <Box>
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

      <Box display={"flex"} flexDirection={"column"} margin={"1vw"}>
        {/* Accordion 1 */}
        <Accordion
          expanded={expandedAccordion === "donations"}
          onChange={handleAccordionChange("donations")}
        >
          <AccordionSummary
            expandIcon={<ExpandCircleDown />}
            aria-controls="donations-panel"
            id="donations-header"
          >
            <h3>Confirmed Donations</h3>
          </AccordionSummary>
          <AccordionDetails>
            <DonationTable />
          </AccordionDetails>
        </Accordion>

        {/* Accordion 2 */}
        <Accordion
          expanded={expandedAccordion === "unconfirmed-donations"}
          onChange={handleAccordionChange("unconfirmed-donations")}
        >
          <AccordionSummary
            expandIcon={<ExpandCircleDown />}
            aria-controls="unconfirmed-donations-panel"
            id="unconfirmed-donations-header"
          >
            <h3>Unconfirmed Donations</h3>
          </AccordionSummary>
          <AccordionDetails>
            <UnconfirmedTable />
          </AccordionDetails>
        </Accordion>

        {/* Accordion 3 */}
        <Accordion
          expanded={expandedAccordion === "requests"}
          onChange={handleAccordionChange("requests")}
        >
          <AccordionSummary
            expandIcon={<ExpandCircleDown />}
            aria-controls="requests-panel"
            id="requests-header"
          >
            <h3>Confirmed Requests</h3>
          </AccordionSummary>
          <AccordionDetails>
            <ConfirmedRequests />
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expandedAccordion === "unconfirmed-requests"}
          onChange={handleAccordionChange("unconfirmed-requests")}
        >
          <AccordionSummary
            expandIcon={<ExpandCircleDown />}
            aria-controls="unconfirmed-requests-panel"
            id="unconfirmed-requests-header"
          >
            <h3>Unconfirmed Requests</h3>
          </AccordionSummary>
          <AccordionDetails>
            <UnconfirmedRequests />
          </AccordionDetails>
        </Accordion>

        {/* Accordion 4 */}
        <Accordion
          expanded={expandedAccordion === "stock"}
          onChange={handleAccordionChange("stock")}
        >
          <AccordionSummary
            expandIcon={<ExpandCircleDown />}
            aria-controls="stock-panel"
            id="stock-header"
          >
            <h3>Stock</h3>
          </AccordionSummary>
          <AccordionDetails>
            <StockTable />
          </AccordionDetails>
        </Accordion>

        {/* Accordion 5 */}
        <Accordion
          expanded={expandedAccordion === "members"}
          onChange={handleAccordionChange("members")}
        >
          <AccordionSummary
            expandIcon={<ExpandCircleDown />}
            aria-controls="members-panel"
            id="members-header"
          >
            <h3>Members</h3>
          </AccordionSummary>
          <AccordionDetails>
            <MemberTable />
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};

export default Dashboard;
