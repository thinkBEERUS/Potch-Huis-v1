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

function MenuCard(props) {
  const [theme] = useMode();
  const colors = tokens(theme.palette.mode);
  return (
    <Card>
      <CardActionArea>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="body2" color="text.primary">
              {props.name}
            </Typography>
            <Typography variant="body2" color="text.primary">
              {props.description}
            </Typography>
            <Typography variant="body2" color="text.primary">
              {props.quantity} g Available
            </Typography>
            <Typography variant="body2" color="text.primary">
              {props.quantity < 200 ? "Stock is Low" : "Stock is sufficient"}
            </Typography>
            <Typography variant="body2" color="text.primary">
              {props.value} /g
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
          Request
          <VolunteerActivismOutlinedIcon sx={{ ml: "10px" }} />
        </Button>
      </CardActions>
    </Card>
  );
}

export default MenuCard;
