import { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const ItemModal = ({ item, requestNumber }) => {
  const [open, setOpen] = useState(true);
  const [actualQuantity, setActualQuantity] = useState(item.actualQuantity);

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = () => {
    // Code to update the actual quantity in the backend
    // Assuming the update is successful, close the modal
    setOpen(false);
  };

  const handleActualQuantityChange = (event) => {
    setActualQuantity(event.target.value);
  };

  return (
    <>
      {item && (
        <Modal open={open} onClose={handleClose}>
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
            <Typography variant="h5" component="h2">
              {item.name}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Request Number: {item.requestNumber}
            </Typography>
            <Typography variant="body1">
              Stock Number: {item.stockNumber}
            </Typography>
            <Typography variant="body1">
              Requested Item Number: {item.requestedItemNumber}
            </Typography>
            <Typography variant="body1">
              Quantity: {item.quantity.trim()}
            </Typography>
            <TextField
              label="Actual Quantity"
              value={actualQuantity}
              onChange={handleActualQuantityChange}
              fullWidth
              sx={{ mt: 2 }}
            />
            <Button variant="contained" onClick={handleUpdate} sx={{ mt: 2 }}>
              Update
            </Button>
            <Button variant="contained" onClick={handleClose} sx={{ mt: 2 }}>
              Close
            </Button>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default ItemModal;
