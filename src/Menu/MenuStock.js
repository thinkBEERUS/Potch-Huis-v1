import * as React from "react";
import axios from "axios";
import Header from "../ed-roh/components/Header";
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
  Autocomplete,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { useMode, tokens } from "../theme";
import {
  HideSourceOutlined,
  RequestQuote,
  ShoppingBagTwoTone,
} from "@mui/icons-material";
import MenuCard from "./MenuCard";
import { useState } from "react";
import { useEffect } from "react";
import SimpleBackdrop from "../Layout/Backdrop";

// import Select from "react-select";

const Menu = () => {
  const [stock, setStock] = useState([]);
  const [allStock, setAllStock] = useState([]);
  const [selectedStock, setSelectedStock] = useState("");
  const [request, setRequest] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [theme] = useMode();
  const colors = tokens(theme.palette.mode);
  const url = process.env.REACT_APP_API_URL + "/ActiveStock";
  const urlAll =
    process.env.REACT_APP_API_URL + "/AllStock?pageNumber=1&pageSize=1000";
  const [showItems, setShowItems] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectOptions = allStock.map((item) => ({
    value: item.stockNumber,
    label: item.name,
  }));

  const [requestItems, setRequestItems] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  const [currentItem, setCurrentItem] = useState({
    name: "",
    quantity: "",
    value: "",
    requestNumber: "",
    stockNumber: "",
    requestedItemNumber: "",
    actualQuantity: "",
    id: 0,
  });

  useEffect(() => {
    setCurrentItem((prevState) => ({
      ...prevState,
      id:
        requestItems.length > 0
          ? requestItems[requestItems.length - 1].id + 1
          : 0,
    }));
  }, [requestItems]);

  const handleOpenModal = (stock) => {
    setCurrentItem({
      name: stock.name,
      quantity: "",
      value: stock.value,
      requestNumber: "",
      stockNumber: stock.stockNumber,
      requestedItemNumber: "",
      actualQuantity: "N/A",
      id: requestItems.length + 1,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddItem = () => {
    console.log(requestItems);
    setRequestItems((prevState) => [...prevState, currentItem]);
    handleCloseModal();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("https://localhost:7287/Requests/Items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestItems),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
    handleCloseModal();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentItem((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    const calculateTotalValue = () => {
      let total = 0;
      requestItems.forEach((item) => {
        const value = parseFloat(item.value);
        const quantity = parseInt(item.quantity);
        if (!isNaN(value) && !isNaN(quantity)) {
          total += value * quantity;
        }
      });
      setTotalValue(total);
    };
    calculateTotalValue();
  }, [requestItems]);

  const handleSelectChange = (selectedOption) => {
    const stock = allStock.find(
      (item) => item.name === selectedOption.target.innerText
    );
    const updatedStock = { ...stock, active: !stock.active };
    axios
      .put(`https://localhost:7287/Stock`, updatedStock)
      .then((response) => console.log(response.data))
      .catch((error) => console.error(error));
    setSelectedStock(selectedOption);
  };

  const fetchStock = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(url);
      setStock(response.data);
      const responseAll = await axios.get(urlAll);
      setAllStock(responseAll.data);
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchStock();
  }, [selectedStock]);

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
          <Autocomplete
            filled
            sx={{ flexGrow: 1, margin: "0.1vw" }}
            options={selectOptions}
            onChange={handleSelectChange}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField {...params} label="Menu Manager" variant="filled" />
            )}
          />
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
                flexDirection: "column",
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
              />
              <Button
                variant="filled"
                onClick={() => handleOpenModal(stock)}
                startIcon={<SaveIcon />}
                sx={{
                  backgroundColor: colors.itemColor,
                  color: colors.typographyColor,
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                Request
              </Button>
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

      <Box m={"10"} sx={{ display: "flex", justifyContent: "center" }}>
        <Modal open={isModalOpen} onClose={handleCloseModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant="h6" align="center" gutterBottom>
              Add New Item
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Item Name"
                    name="name"
                    value={currentItem.name}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Quantity"
                    name="quantity"
                    type="number"
                    value={currentItem.quantity}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Value"
                    name="value"
                    type="number"
                    value={currentItem.value}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Request Number"
                    name="requestNumber"
                    value={currentItem.requestNumber}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Stock Number"
                    name="stockNumber"
                    value={currentItem.stockNumber}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Requested Item Number"
                    name="requestedItemNumber"
                    value={currentItem.requestedItemNumber}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Actual Quantity"
                    name="actualQuantity"
                    value={currentItem.actualQuantity}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleAddItem}
                    disabled={
                      currentItem.name === "" ||
                      currentItem.quantity === "" ||
                      currentItem.value === "" ||
                      currentItem.requestNumber === "" ||
                      currentItem.stockNumber === "" ||
                      currentItem.requestedItemNumber === "" ||
                      currentItem.actualQuantity === ""
                    }
                  >
                    Add Item
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Modal>
      </Box>
      {requestItems.length > 0 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            position: "fixed",
            top: "90%",
            left: "90%",
            transform: "translate(-90%, -90%)",
            zIndex: 999,
            padding: "10px",
          }}
        >
          <Button
            sx={{
              backgroundColor: colors.backgroundColor,
              color: colors.typographyColor,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              margin: "1%",
            }}
            onClick={() => setShowItems(!showItems)}
          >
            <ShoppingBagTwoTone />
          </Button>
        </Box>
      )}
      {showItems === true && (
        <Box
          sx={{
            position: "fixed",
            top: "1%",
            left: "50%",
            transform: "translate(-50%, -1%)",
            zIndex: 999,
            backgroundColor: colors.backgroundColor,
            padding: "10px",
            width: "25vw",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Requested Items
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {requestItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.quantity}g</TableCell>
                    <TableCell>{item.value} Club Points /g</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              margin: "10px",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Total CP: {totalValue.toFixed(2)}
            </Typography>
            <Button
              sx={{
                backgroundColor: colors.itemColor,
                color: colors.typographyColor,
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
                margin: "1%",
              }}
              onClick={() => console.log(requestItems)}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      )}
    </React.Fragment>
  );
};

export default Menu;
