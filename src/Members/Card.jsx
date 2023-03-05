import React from 'react';
import images from "../Assets/potch-huis-logo.jpg";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import NoAccountsIcon from "@mui/icons-material/NoAccounts";
import {  Button, CardActionArea, CardActions } from "@mui/material";
import { useMode, tokens } from "../theme";

function MemberCard(props) {
    const [theme] = useMode();
    const colors = tokens(theme.palette.mode);
  return (
    <Card sx={{ width: 350, margin: "1%" }}>
      <CardActionArea>
        <CardMedia component="img" height="250" src={images} alt="x" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.membernumber}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.firstname} {props.lastname}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.cell}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.address} {props.suburb} {props.city}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          sx={{
            backgroundColor: colors.primary[600],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
            margin: "1%",
          }}
        >
          <NoAccountsIcon sx={{ mr: "10px" }} />
          Disable Member
        </Button>
      </CardActions>
    </Card>
  );
}

export default MemberCard;
