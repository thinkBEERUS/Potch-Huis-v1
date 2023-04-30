import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import InsertChartOutlinedRoundedIcon from "@mui/icons-material/InsertChartOutlinedRounded";
import Replay5Icon from "@mui/icons-material/Replay5";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useContext } from "react";
import { AppState } from "../AppState";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Modal,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CardActionArea,
  CardActions,
  CardMedia,
  Divider,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { useMode, tokens } from "../theme";
import { HideSourceOutlined, RequestQuote } from "@mui/icons-material";

function MenuCard(props) {
  const { appState, setAppState } = useContext(AppState);
  const [theme] = useMode();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [totalRows, setTotalRows] = useState(10);

  const fetchRows = async () => {
    await fetch(`${process.env.REACT_APP_API_URL}/Requests/Rows`)
      .then((response) => response.json())
      .then((data) => setTotalRows(data[0]));
  };
  useEffect(() => {
    fetchRows();
  }, []);

  return (
    <React.Fragment>
      <Card
        color="primary.main"
        sx={{
          display: "flex",
          flexGrow: 1,
          flexDirection: "column",
          padding: "5px",
        }}
      >
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
            onClick={() => console.log("Add Chart")}
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
              console.log("Add Last 5 Requests by member.");
            }}
          >
            <Replay5Icon />
          </Button>
        </CardActions>
        <Box sx={{ padding: "0.5vw" }}>
          <CardMedia
            onClick={() => console.log("Image clicked.")}
            component="img"
            sx={{
              display: "flex",
              flexGrow: 1,
              minHeight: "150px",
              minWidth: "100px",
              border: 1,
              borderColor: "black",
            }}
            image="/static/images/cards/paella.jpg"
            alt="Menu Photo Unavailable"
          />
        </Box>
        <CardActionArea>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Typography
                sx={{ display: "flex", padding: "5px" }}
                variant="h3"
                color="text.primary"
                fontWeight="bold"
              >
                {props.name}
              </Typography>
              <Divider />
              <Typography
                sx={{
                  padding: "5px",
                  display: "flex",
                }}
                variant="subtitle1"
                color="text.secondary"
              >
                {props.description}
              </Typography>
              <Divider />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                padding: "5px",
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
                padding: "5px",
              }}
            >
              <Typography variant="p" color="text.primary">
                Club Points
              </Typography>
              <Typography variant="p" color="text.primary">
                {props.value}/g
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
        <CardActions></CardActions>
      </Card>
    </React.Fragment>
  );
}

export default MenuCard;
