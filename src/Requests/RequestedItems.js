import { useState, useEffect } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  Modal,
  Box,
} from "@mui/material";
import axios from "axios";
import DeleteForeverOutlined from "@mui/icons-material/DeleteForeverOutlined";
import { CheckOutlined } from "@mui/icons-material";
import { useContext } from "react";
import { AppState } from "../AppState";

const RequestedItems = ({ open, handleClose, requestNumber }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { appState, setAppState } = useContext(AppState);

  const styleModal = {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    width: "80vw",
    margin: "auto",
    marginTop: "10vh",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL +
          "/Requests/ItemRequest/%23" +
          appState.requestNumber
      );
      console.log(response.data);
      setCartItems(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const removeFromCart = (id) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCartItems);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + Number(item.value), 0);
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={styleModal}>
          <Typography variant="h4" textAlign={"center"}>
            Request Bag
          </Typography>
          {isLoading ? (
            <Typography>Loading...</Typography>
          ) : cartItems.length ? (
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <List>
                {cartItems.map((item) => (
                  <Box
                    sx={{
                      display: "flex",
                      flexGrow: 1,
                      flexDirection: "row",
                    }}
                  >
                    <ListItem
                      key={item.id}
                      sx={{
                        display: "flex",
                        flexGrow: 0.5,
                      }}
                    >
                      <ListItemText
                        primary={item.name}
                        secondary={`Quantity: ${item.quantity} - Value: ${item.value}`}
                        variant="h6"
                      />
                    </ListItem>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => removeFromCart(item.id)}
                      sx={{
                        display: "flex",
                        flexGrow: 0.5,
                      }}
                    >
                      <DeleteForeverOutlined />
                    </IconButton>
                  </Box>
                ))}
              </List>
              <Box
                sx={{
                  display: "flex",
                  flexGrow: 1,
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Typography>Total: {calculateTotal().toFixed(0)} CP</Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexGrow: 0.33,
                    justifyContent: "center",
                  }}
                >
                  <Button variant="contained" color="primary">
                    Request <CheckOutlined />
                  </Button>
                </Box>
              </Box>
            </Box>
          ) : (
            <Typography variant="h5">No items in Request Bag.</Typography>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default RequestedItems;
