import React, { useState, useEffect } from "react";
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
  Autocomplete,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";
import { Add } from "@mui/icons-material";
import { AppState } from "../AppState";
import { useContext } from "react";

function NewRequestItemForm(props) {
  const currentDate = new Date();
  const { appState, setAppState } = useContext(AppState);

  const formattedDate = currentDate.toLocaleDateString("en-GB");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requestItems, setRequestItems] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [stock, setStock] = useState([]);

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

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddItem = () => {
    setRequestItems((prevState) => [...prevState, currentItem]);
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

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_API_URL + "/ActiveStock"
        );
        setStock(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStock();
  }, []);

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

  const options = stock.map((stockItem) => ({
    value: stockItem.value,
    label: stockItem.name,
  }));

  const handleSelectChange = (selectedOption) => {
    const selectedStock = stock.find(
      (item) => item.name === selectedOption.target.innerText
    );
    setCurrentItem({
      name: selectedStock.name,
      quantity: "",
      value: selectedStock.value + " /g",
      requestNumber: "",
      stockNumber: selectedStock.stockNumber,
      requestedItemNumber: "RI_" + requestItems.length,
      actualQuantity: "N/A",
      id: requestItems.length + 1,
    });
  };

  async function postRequest() {
    console.log(props.confirmed);
    const data = {
      requestNumber: "",
      memberNumber: props.memberNumber,
      value: totalValue.toFixed(2).toString(),
      received: formattedDate,
      confirmed: props.confirmed === "true" ? formattedDate : "01/01/2000",
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
    console.log(requestNumber);
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
    const newQuantity = parseInt(tempItem.quantity) - item.actualQuantity;
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
        type: "EFT",
        amount: totalValue.toFixed(2),
        description: "Donation",
        purpose: "Donation",
        memberNumber: props.memberNumber,
        donationNumber: "",
        received: formattedDate,
        confirmed: props.confirmed === "true" ? formattedDate : "01/01/2000",
        confirmedby: props.confirmed === "true" ? appState.memberNumber : "N/A",
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

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenModal}
        startIcon={<SaveIcon />}
      >
        New Item
      </Button>
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
                <Autocomplete
                  sx={{ flexGrow: 1, margin: "0.1vw" }}
                  options={options}
                  onChange={handleSelectChange}
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select an Item"
                      variant="filled"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Quantity"
                  name="quantity"
                  type="text"
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
                  type="text"
                  value={currentItem.value}
                  onChange={handleInputChange}
                  disabled
                  style={{ display: "none" }}
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
                    //currentItem.requestNumber === "" ||
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

      {requestItems.length > 0 && (
        <>
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
                  <TableCell>Request Number</TableCell>
                  <TableCell>Stock Number</TableCell>
                  <TableCell>Requested Item Number</TableCell>
                  <TableCell>Actual Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {requestItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.value}</TableCell>
                    <TableCell>{item.requestNumber}</TableCell>
                    <TableCell>{item.stockNumber}</TableCell>
                    <TableCell>{item.requestedItemNumber}</TableCell>
                    <TableCell>{item.actualQuantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography variant="h6" gutterBottom>
            Total Value: {totalValue.toFixed(2)}
          </Typography>
          <Button
            onClick={() => postRequestAndItems()}
            variant="contained"
            color="primary"
            startIcon={<Add />}
            sx={{ mt: "2%" }}
            disabled={props.memberNumber === "" || requestItems.length < 1}
          >
            Create Request
          </Button>
        </>
      )}
    </>
  );
}
export default NewRequestItemForm;
