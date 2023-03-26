import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import VolunteerActivismOutlinedIcon from "@mui/icons-material/VolunteerActivismOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import { Button, CardActionArea, CardActions, Box } from "@mui/material";
import { useMode, tokens } from "../theme";
import { Link, useNavigate } from "react-router-dom";

function MemberCard(props) {
  const [theme] = useMode();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  return (
    <Card>
      <CardActionArea onClick={() => props.update()}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography gutterBottom variant="h5" component="div">
              {props.membernumber}
            </Typography>
            <Typography variant="body2" color="text.primary">
              {props.firstname} {props.lastname}
            </Typography>
            <Typography variant="body2" color="text.primary">
              {props.email}
            </Typography>
            <Typography variant="body2" color="text.primary">
              {props.cell}
            </Typography>
            <Typography variant="body2" color="text.primary">
              {props.address} {props.suburb} {props.city}
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
          onClick={() => {
            navigate("/Donations");
          }}
        >
          Donations
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

export default MemberCard;
