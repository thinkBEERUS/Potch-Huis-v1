import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useMode, tokens } from "../theme";

function RequestItems({ items }) {
  const [open, setOpen] = useState(true);
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-GB");
  const [theme] = useMode();
  const colors = tokens(theme.palette.mode);
  const [requestItems, setRequestItems] = useState([]);
  const [oldItems, setOldItems] = useState([]);
  const [stock, setStock] = useState([]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event, name) => {
    const { value } = event.target;
    const oldItem = oldItems.find((item) => item.name === name) || null;
    let tempItem = {
      name: oldItem.name,
      quantity: oldItem.quantity,
      value: oldItem.value,
      requestNumber: oldItem.requestNumber,
      stockNumber: oldItem.stockNumber,
      requestedItemNumber: oldItem.requestedItemNumber,
      actualQuantity: value,
      id: 0,
    };
    setRequestItems((prevState) => [...prevState, tempItem]);
  };

  useEffect(() => {
    setOldItems(items);
    const fetchStock = async () => {
      try {
        const response = await axios.get("https://localhost:7287/ActiveStock");
        setStock(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStock();
  }, [items]);

  const getStockItemByName = (itemName) => {
    return stock.find((item) => item.name === itemName) || null;
  };

  const handleSave = () => {
    oldItems.forEach((oldItem) => {
      const newItem =
        requestItems.find((item) => item.name === oldItem.name) || null;
      if (newItem.actualQuantity !== oldItem.actualQuantity) {
        if (newItem.actualQuantity > oldItem.actualQuantity) {
          //Update Stock Item
          const oldStock = getStockItemByName(oldItem.name);
          const newQuantity =
            parseInt(oldStock.quantity) -
            (parseInt(newItem.actualQuantity) -
              parseInt(oldItem.actualQuantity));
          const data = {
            name: oldStock.name,
            description: oldStock.description,
            quantity: newQuantity.toString(),
            value: oldStock.value,
            lastUpdated: formattedDate,
            active: oldStock.active,
            stockNumber: oldStock.stockNumber,
            id: oldStock.id,
          };

          fetch(process.env.REACT_APP_API_URL + "/Stock", {
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
      }
    });
    //Move Request from unconfirmed -> Confirmed
    const tempItem = oldItems[0] || null;
    fetch(
      "https://localhost:7287/Requests/Request?requestNumber=" +
        tempItem.requestNumber
    )
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data here
        const newRequest = {
          requestNumber: data[0].requestNumber,
          memberNumber: data[0].memberNumber,
          value: data[0].value,
          received: data[0].received,
          confirmed: formattedDate,
          id: 0,
        };

        try {
          fetch("https://localhost:7287/Requests/Update", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Accept: "*/*",
            },
            body: JSON.stringify(newRequest),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
            });
        } catch (error) {
          console.error("There was an error!", error);
        }
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error("Error:", error);
      });
  };

  // const handleAddItem = (item) => {
  //   setRequestItems((prevState) => [...prevState, item]);
  // };

  // useEffect(() => {
  // items.forEach((item) => {
  //   handleAddItem(item);
  // });
  // }, [items]);

  const styleModal = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    backgroundColor: colors.backgroundColor,
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <div style={styleModal}>
          <Typography variant="h4" align="center" gutterBottom>
            Items
          </Typography>
          <List>
            {items.map((item) => (
              <ListItem key={item.id}>
                <ListItemText
                  primary={item.name}
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body1"
                        style={{ color: colors.itemColor }}
                      >
                        Quantity: {item.quantity.trim()} g
                      </Typography>
                      <br />
                      <Typography
                        component="span"
                        variant="body1"
                        style={{ color: colors.itemColor }}
                      >
                        Value: {item.value.trim()} CP
                      </Typography>
                      <br />
                      <Typography
                        component="span"
                        variant="body1"
                        style={{ color: colors.itemColor }}
                      >
                        Request Number: {item.requestNumber}
                      </Typography>
                      <br />
                      <Typography
                        component="span"
                        variant="body1"
                        style={{ color: colors.itemColor }}
                      >
                        Stock Number: {item.stockNumber}
                      </Typography>
                      <br />
                      <Typography
                        component="span"
                        variant="body1"
                        style={{ color: colors.itemColor }}
                      >
                        Requested Item Number: {item.requestedItemNumber}
                      </Typography>
                    </>
                  }
                />
                <br />
                <TextField
                  required
                  fullWidth
                  label="Actual Quantity"
                  name="actualQuantity"
                  type="text"
                  onChange={(event) => handleInputChange(event, item.name)}
                />
              </ListItem>
            ))}
          </List>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSave}
            // disabled={
            //   item.actualQuantity === "" || item.actualQuantity === "N/A"
            // }
          >
            Confirm Request
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default RequestItems;
