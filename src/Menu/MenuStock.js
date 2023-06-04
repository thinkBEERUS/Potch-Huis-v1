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
  Check,
  HideSourceOutlined,
  RequestQuote,
  RequestQuoteSharp,
  ShoppingBagTwoTone,
  TravelExplore,
} from "@mui/icons-material";
import MenuCard from "./MenuCard";
import { useState } from "react";
import { useEffect } from "react";
import SimpleBackdrop from "../Layout/Backdrop";
import { AppState } from "../AppState";
import { useContext } from "react";

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
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-GB");

  const selectOptions = allStock.map((item) => ({
    value: item.stockNumber,
    label: item.name,
  }));

  const [requestItems, setRequestItems] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [donationType, setDonaionType] = useState("");

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
    fetch(process.env.REACT_APP_API_URL + "/Requests/Items", {
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
      .put(process.env.REACT_APP_API_URL + "/Stock", updatedStock)
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

  const handleDonationChange = (selectedOption) => {
    setDonaionType(selectedOption.target.innerText);
  };

  useEffect(() => {
    fetchStock();
  }, [selectedStock]);

  const { appState } = useContext(AppState);
  const memberNumber = appState.memberNumber;
  const isAdmin = memberNumber.endsWith("ADM");

  async function postRequest() {
    const data = {
      requestNumber: "",
      memberNumber: appState.memberNumber,
      value: totalValue.toFixed(2).toString(),
      received: formattedDate,
      confirmed: "01/01/2000",
      id: 0,
    };

    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + "/Requests/Create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const jsonResponse = await response.json();
      return jsonResponse.message;
    } catch (error) {
      console.error("There was an error!", error);
    }
  }

  function postItem(
    name,
    quantity,
    value,
    requestNumber,
    stockNumber,
    requestedItemNumber,
    actualQuantity
  ) {
    const url = process.env.REACT_APP_API_URL + "/Requests/Items"; // replace with actual API endpoint
    const data = {
      name: name,
      quantity: quantity,
      value: value,
      requestNumber: requestNumber,
      stockNumber: stockNumber,
      requestedItemNumber: requestedItemNumber,
      actualQuantity: actualQuantity,
      id: 0,
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((json) => {
        console.log("API response:", json);
      })
      .catch((error) => {
        console.error("Error posting data:", error);
      });
  }

  const getStockItemByName = (itemName) => {
    return stock.find((item) => item.name === itemName) || null;
  };

  function updateStockItem(item) {
    const url = process.env.REACT_APP_API_URL + "/Stock"; // replace with actual API endpoint
    const tempItem = getStockItemByName(item.name);
    const newQuantity = parseInt(tempItem.quantity) - item.quantity;
    const data = {
      name: tempItem.name,
      description: tempItem.description,
      quantity: newQuantity.toString(),
      value: tempItem.value,
      lastUpdated: formattedDate,
      active: tempItem.active,
      stockNumber: tempItem.stockNumber,
      id: tempItem.id,
    };

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((json) => {
        console.log("API response:", json);
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  }

  function postRequestAndItems() {
    // Call the first POST function to create the request
    let requestNumber;

    postRequest()
      .then((value) => {
        requestNumber = value;
        //Call the second POST function for each item in the requestedItems array
        requestItems.forEach((item) => {
          postItem(
            item.name,
            item.quantity,
            item.value,
            requestNumber,
            item.stockNumber,
            item.requestedItemNumber,
            item.actualQuantity
          );

          // Update Stock
          updateStockItem(item);
        });
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });

    //Create Donation
    fetch(process.env.REACT_APP_API_URL + "/Donations/Create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: donationType,
        amount: totalValue.toFixed(2),
        description: "Donation",
        purpose: "Donation",
        memberNumber: appState.memberNumber,
        donationNumber: "",
        received: formattedDate,
        confirmed: "01/01/2000",
        confirmedby: "N/A",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const renderMenu = () => {
    return (
      <Box m={"10"}>
        {isAdmin && (
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
        )}

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
                startIcon={<TravelExplore />}
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

  const options = ["EFT", "Ewallet", "Cash"].map((item) => ({
    value: item,
    label: item,
  }));

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
                    disabled
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
                    disabled
                  />
                </Grid>
                <Grid item xs={12}>
                  <Autocomplete
                    sx={{ flexGrow: 1, margin: "0.1vw" }}
                    options={options}
                    onChange={handleDonationChange}
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select Donation Method"
                        variant="filled"
                      />
                    )}
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
                    disabled
                    style={{ display: "none" }}
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
                    disabled
                    style={{ display: "none" }}
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
                    disabled
                    style={{ display: "none" }}
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
                    disabled
                    style={{ display: "none" }}
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
                      currentItem.name === "" || currentItem.quantity === ""
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
              backgroundColor: colors.typographyColor,
              color: colors.itemColor,
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
              onClick={() => postRequestAndItems()}
              variant="contained"
              color="primary"
              startIcon={<Check />}
              sx={{ mt: "2%" }}
            >
              Create Request
            </Button>
          </Box>
        </Box>
      )}
    </React.Fragment>
  );
};

export default Menu;
