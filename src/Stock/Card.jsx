import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InsertChartOutlinedRoundedIcon from "@mui/icons-material/InsertChartOutlinedRounded";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import BarChart from "./BarChart";
import { format } from "date-fns";

import {
  Button,
  CardActionArea,
  CardActions,
  Box,
  Switch,
} from "@mui/material";
import { useMode, tokens } from "../theme";

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

function StockCard(props) {
  const [theme] = useMode();
  const colors = tokens(theme.palette.mode);
  const [chartData, setChartData] = useState([]);
  const [showChart, setShowChart] = useState(false);

  const handleChartShow = () => {
    setShowChart(true);
  };

  const handleModalClose = () => {
    setShowChart(false);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL +
          `/Reporting/Requests/Monthly?name=${props.name}&months=12`
      );
      const data = await response.json();
      setChartData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Card color="primary.main">
        <CardActions
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Button
            sx={{
              backgroundColor: colors.itemColor,
              color: colors.typographyColor,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              margin: "1%",
            }}
            onClick={handleChartShow}
          >
            <InsertChartOutlinedRoundedIcon />
          </Button>
          <Button
            sx={{
              backgroundColor: colors.itemColor,
              color: colors.typographyColor,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              margin: "1%",
            }}
            onClick={() => {
              props.update();
            }}
          >
            {props.stockNumber}
          </Button>
        </CardActions>
        <CardActionArea onClick={() => props.update()}>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Typography
                sx={{ display: "flex" }}
                variant="h3"
                color="text.primary"
              >
                {props.name}
              </Typography>
              <Typography
                sx={{ paddingTop: "2%", paddingBottom: "2%", display: "flex" }}
                variant="h6"
                color="text.primary"
              >
                {props.description}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="p" color="text.primary">
                Available
              </Typography>
              <Typography variant="p" color="text.primary">
                {props.quantity} g
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="p" color="text.primary">
                Club Points
              </Typography>
              <Typography variant="p" color="text.primary">
                {props.value}/g
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="p" color="text.primary">
                Updated
              </Typography>
              <Typography variant="p" color="text.primary">
                {format(new Date(props.lastUpdated), "dd/MMM/yyyy")}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="p" color="text.primary">
                Menu Status
              </Typography>
              <Typography variant="p" color="text.primary">
                {props.active === true ? "Active" : "Inactive"}
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
      {showChart && (
        <Modal open={showChart} onClose={handleModalClose}>
          <Box sx={styleModal}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                sx={{
                  backgroundColor: colors.itemColor,
                  color: colors.typographyColor,
                }}
                onClick={handleModalClose}
              >
                <HighlightOffOutlinedIcon />
              </Button>
            </Box>
            <BarChart data={chartData} stockName={props.name} />
          </Box>
        </Modal>
      )}
    </React.Fragment>
  );
}

export default StockCard;
