import * as React from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { useMode, tokens } from "../theme";
import MenuCard from "./MenuCard";
import { useState } from "react";
import { useEffect } from "react";

const Menu = () => {
  const [Stock, setStock] = useState([]);
  const [theme] = useMode();
  const colors = tokens(theme.palette.mode);
  const url = "https://lostaquabike57.conveyor.cloud/AllStock";

  async function fetchStock() {
    const response = await fetch(url);
    const Stock = await response.json();
    return Stock;
  }

  useEffect(() => {
    fetchStock().then((Stock) => {
      setStock(Stock);
    });
  }, []);

  return (
    <Box m={"10"}>
      <Typography variant="h1" fontWeight="600" color={colors.grey[100]} m="1%">
        Stock
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {Stock.map(
          (Stock) =>
            Stock.active === true && (
              <MenuCard
                name={Stock.name}
                description={Stock.description}
                value={Stock.value}
              />
            )
        )}
      </Box>
    </Box>
  );
};

export default Menu;
