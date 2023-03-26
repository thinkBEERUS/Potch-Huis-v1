import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import VolunteerActivismOutlinedIcon from "@mui/icons-material/VolunteerActivismOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import {
  Button,
  CardActionArea,
  CardActions,
  Box,
  Switch,
} from "@mui/material";
import { useMode, tokens } from "../theme";

function StockCard(props) {
  const [theme] = useMode();
  const colors = tokens(theme.palette.mode);
  return (
    <Card color="primary.main">
      <CardActionArea onClick={() => props.update()}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography gutterBottom variant="h5" color="text.primary">
              {props.name}
            </Typography>
            <Typography variant="body2" color="text.primary">
              {props.stocknumber}
            </Typography>
            <Typography variant="body2" color="text.primary">
              {props.description}
            </Typography>
            <Typography variant="body2" color="text.primary">
              {props.quantity}g Available
            </Typography>
            <Typography variant="body2" color="text.primary">
              {props.value}/g
            </Typography>
            <Typography variant="body2" color="text.primary">
              Updated on {props.lastUpdated}
            </Typography>
            <Typography variant="body2" color="text.primary">
              Active on Menu {props.active === true ? "Yes" : "No"}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
      <CardActions
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
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
          tooltip={
            "The inventory replenishment report displays information such as your closing inventory, items sold, items sold per day, days cover, and average cost. This report can help you get an idea of how fast certain products are moving so you can order stock accordingly."
          }
          // onClick={() => {
          //   props.update();
          // }}
        >
          Report
          <VolunteerActivismOutlinedIcon sx={{ ml: "10px" }} />
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
          Update
          <ManageAccountsOutlinedIcon sx={{ ml: "10px" }} />
        </Button>
      </CardActions>
    </Card>
  );
}

export default StockCard;
