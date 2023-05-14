import React, { useState } from "react";
import {
  Button,
  Modal,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { useMode, tokens } from "../theme";

function RequestItems({ items }) {
  const [open, setOpen] = useState(true);
  const [theme] = useMode();
  const colors = tokens(theme.palette.mode);

  const handleClose = () => {
    setOpen(false);
  };

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
                      <br />
                      <Typography
                        component="span"
                        variant="body1"
                        style={{ color: colors.itemColor }}
                      >
                        Actual Quantity: {item.actualQuantity}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </div>
      </Modal>
    </div>
  );
}

export default RequestItems;
