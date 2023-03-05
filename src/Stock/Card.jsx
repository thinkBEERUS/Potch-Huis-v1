import React from 'react';
import images from "../Assets/potch-huis-logo.jpg";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
//import { useMode, tokens } from "../theme";
import { CardActionArea } from "@mui/material";
import Switch from '@mui/material/Switch';

function StockCard(props) {
    //const [theme] = useMode();
    //const colors = tokens(theme.palette.mode);
  return (
    <Card sx={{ width: 350, margin: "1%" }}>
      <CardActionArea>
        <CardMedia component="img" height="250" src={images} alt="x" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            <strong>{props.name}</strong>
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {props.description}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {props.quantity}g Available
          </Typography>
          <Typography variant="body1" color="text.secondary">
            R{props.value}/g (Estimated Value)
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Last updated on {props.lastupdated}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Show on Menu <Switch checked={props.active} />
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default StockCard;
