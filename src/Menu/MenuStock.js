import * as React from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Header from "../ed-roh/components/Header";
import {
  Box,
  Button,
  Select,
  InputLabel,
  MenuItem,
  TextField,
  FormControl,
} from "@mui/material";
import { useMode, tokens } from "../theme";
import MenuCard from "./MenuCard";
import { useState } from "react";
import { useEffect } from "react";
import SimpleBackdrop from "../Layout/Backdrop";
import MemberCard from "../Members/Card";

const Menu = () => {
  const [stock, setStock] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [theme] = useMode();
  const colors = tokens(theme.palette.mode);
  const url = process.env.REACT_APP_API_URL + "/ActiveStock";

  const fetchStock = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(url);
      setStock(response.data);
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchStock();
  }, []);

  const renderMenu = () => {
    return (
      <Box m={"10"}>
        <Box
          sx={{
            margin: "1%",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignContent: "bottom",
            width: "inherit",
          }}
        >
          <Box sx={{ flexGrow: 1, margin: "0.1vw" }}>
            <Header
              title="Menu"
              subtitle="View the menu the way your members will see it"
            />
          </Box>

          <FormControl variant="filled" sx={{ flexGrow: 1, margin: "0.1vw" }}>
            <InputLabel id="menu-select-label">Inactive Stock</InputLabel>
            <Select
              labelId="menu-select-label"
              id="menu-stock-select"
              name="stockSelect"
              onChange={() => console.log("Stock Selected: ")}
            >
              <MenuItem value={1}>Stock 1</MenuItem>
              <MenuItem value={2}>Stock 2</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {stock.map((stock) => (
            <Box
              key={stock.name}
              sx={{
                display: "flex",
                flexGrow: 1,
                margin: "1vw",
                padding: "1vw",
              }}
            >
              <MenuCard
                key={stock.name + stock.value.toString()}
                name={stock.name}
                description={stock.description}
                quantity={stock.quantity}
                value={stock.value}
                // update={() => {
                //   setStockToUpdate(stock);
                //   setStockToDelete(null);
                //   setStockToAdd(null);
                //   handleOpenModal();
                // }}
              />
            </Box>
          ))}
        </Box>
      </Box>
    );
  };

  return (
    <React.Fragment>
      {isLoading ? (
        <SimpleBackdrop />
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        renderMenu()
      )}

      {/* {renderModal()} */}
    </React.Fragment>
  );
};

export default Menu;
