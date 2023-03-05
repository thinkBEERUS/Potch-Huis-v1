import React from 'react';
import images from "../Assets/potch-huis-logo.jpg";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useMode, tokens } from "../theme";
import { CardActionArea, Button, CardActions } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

function StockCard(props) {
    const [theme] = useMode();
    const colors = tokens(theme.palette.mode);
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
            R{props.value}/g (Estimated Value)
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
          <AddShoppingCartIcon sx={{ mr: "10px" }} />
          Request
        </Button>
      </CardActions>
    </Card>
  );
}

export default StockCard;
