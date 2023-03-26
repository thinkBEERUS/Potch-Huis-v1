import * as React from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Header from "../ed-roh/components/Header";
import { Box, Button } from "@mui/material";
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
  const url = "https://rightgreenwave11.conveyor.cloud/ActiveStock";

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
          style={{
            margin: "1%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Header
            title="Menu"
            subtitle="View the menu the way your members will see it"
          />
          <Button
            sx={{
              backgroundColor: colors.itemColor,
              color: colors.typographyColor,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            // onClick={() => {
            //   handleAddMember();
            //   setMemberToDelete(null);
            //   setMemberToUpdate(null);
            //   handleOpenModal();
            // }}
          >
            {/* <PersonAddOutlinedIcon sx={{ mr: "10px" }} /> */}
            New Request
          </Button>
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
              sx={{ width: 300, height: 200, margin: "1%" }}
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
