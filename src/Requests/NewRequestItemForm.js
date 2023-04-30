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
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { DataGrid } from "@mui/x-data-grid";

function NewRequestItemForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddItem = () => {
    setRequestItems((prevState) => [...prevState, currentItem]);
    setCurrentItem((prevState) => ({
      name: "",
      quantity: "",
      value: "",
      requestNumber: "",
      stockNumber: "",
      requestedItemNumber: "",
      actualQuantity: "",
      id: requestItems.length + 1,
    }));
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

  const columns = [
    { field: "name", headerName: "Item Name", flex: 1 },
    { field: "quantity", headerName: "Quantity", flex: 1 },
    { field: "value", headerName: "Value", flex: 1 },
    {
      field: "totalValue",
      headerName: "Total Value",
      flex: 1,
      valueGetter: (params) => {
        return (params.getValue("value") * params.getValue("quantity")).toFixed(
          2
        );
      },
    },
  ];

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
        </>
      )}
    </>
  );
}
export default NewRequestItemForm;
