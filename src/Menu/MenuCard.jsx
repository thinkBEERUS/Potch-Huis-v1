import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InsertChartOutlinedRoundedIcon from "@mui/icons-material/InsertChartOutlinedRounded";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import DoDisturbAltOutlinedIcon from "@mui/icons-material/DoDisturbAltOutlined";
import SaveAsOutlinedIcon from "@mui/icons-material/SaveAsOutlined";
import Replay5Icon from "@mui/icons-material/Replay5";
import BarChart from "./BarChart";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useContext } from "react";
import { AppState } from "../AppState";
import {
  Button,
  CardActionArea,
  CardActions,
  Box,
  TextField,
  CardMedia,
} from "@mui/material";
import { useMode, tokens } from "../theme";

const styleModal = {
  marginTop: "10vh",
  marginLeft: "10vw",
  width: "80vw",
  height: "80vh",
  bgcolor: "primary.main",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function MenuCard(props) {
  const { appState, setAppState } = useContext(AppState);
  const [theme] = useMode();
  const colors = tokens(theme.palette.mode);
  const [chartData, setChartData] = useState([]);
  const [showChart, setShowChart] = useState(false);
  const [newItem, setNewItem] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [newItemRequest, setNewItemRequest] = useState(false);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const fetchRows = async () => {
    await fetch(`${process.env.REACT_APP_API_URL}/Requests/Rows`)
      .then((response) => response.json())
      .then((data) => setTotalRows(data[0]));
  };

  useEffect(() => {
    fetchRows();
  }, []);

  const [newRequest, setNewRequest] = useState({
    requestNumber: totalRows,
    memberNumber: "",
    value: "",
    received: "",
    confirmed: "",
    id: "",
  });
  const [newRequestedItem, setNewRequestedItem] = useState({
    name: "",
    quantity: "",
    value: "",
    requestNumber: totalRows,
    stockNumber: "",
    requestedItemNumber: "",
    id: "0",
  });
  const [isAddingRequest, setIsAddingRequest] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewRequest((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleInputChangeItem = (event) => {
    const { name, value } = event.target;
    setNewRequestedItem((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleNewRequest = () => {
    if (appState.requestNumber === "0") {
      setNewRequest((prevState) => ({
        ...prevState,
        requestNumber: totalRows,
      }));
      setNewItem(true);
    } else {
      setNewItemRequest(true);
    }
  };

  const handleAddRequest = async () => {
    setIsAddingRequest(true);
    const date = new Date();
    if (appState.requestNumber === "0") {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestNumber: "#R" + newRequest.requestNumber,
          memberNumber: appState.memberNumber,
          value: newRequest.value,
          received: date,
          confirmed: "2000-01-01T00:00:00",
          id: 0,
        }),
      };
      await fetch(
        `${process.env.REACT_APP_API_URL}/Requests`,
        requestOptions
      ).then((response) =>
        setAppState({
          ...appState,
          requestNumber: newRequest.requestNumber,
        })
      );
    } else {
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        },
        body: JSON.stringify({
          name: newRequestedItem.name,
          quantity: newRequestedItem.quantity,
          value: newRequestedItem.value,
          requestNumber: "#R" + appState.requestNumber,
          stockNumber: newRequestedItem.stockNumber,
          requestedItemNumber: newRequestedItem.requestedItemNumber,
          id: newRequestedItem.id,
        }),
      };

      fetch(process.env.REACT_APP_API_URL + "/Requests/Items", requestOptions)
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
    }
    setIsAddingRequest(false);
    setNewItem(false);
    handleModalClose();
  };

  const checkoutSchema = yup.object().shape({
    name: yup.string().required("This is a required field!"),
    description: yup.string().required("This is a required field!"),
    quantity: yup.string().required("This is a required field!"),
    value: yup.string().required("This is a required field!"),
    lastUpdated: yup.date().required("This is a required field!"),
    active: yup.bool().required("This is a required field!"),
  });
  const handleChartShow = () => {
    setShowChart(true);
  };

  const handleModalClose = () => {
    setShowChart(false);
  };

  return (
    <React.Fragment>
      <Card
        color="primary.main"
        sx={{
          display: "flex",
          flexGrow: 1,
          flexDirection: "column",
        }}
      >
        <CardActions
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Button
            sx={{
              backgroundColor: colors.itemColor,
              color: colors.typographyColor,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              margin: "1%",
            }}
            onClick={handleChartShow}
          >
            <InsertChartOutlinedRoundedIcon />
          </Button>
          <Button
            sx={{
              backgroundColor: colors.itemColor,
              color: colors.typographyColor,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              margin: "1%",
            }}
            onClick={() => {
              props.update();
            }}
          >
            <Replay5Icon />
          </Button>
        </CardActions>
        <Box sx={{ padding: "0.5vw" }}>
          <CardMedia
            onClick={() => console.log("Image clicked.")}
            component="img"
            sx={{
              display: "flex",
              flexGrow: 1,
              minHeight: "150px",
              minWidth: "100px",
              border: 1,
              borderColor: "black",
            }}
            image="/static/images/cards/paella.jpg"
            alt="Menu Photo Unavailable"
          />
        </Box>
        <CardActionArea onClick={() => props.update()}>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Typography
                sx={{ display: "flex" }}
                variant="h3"
                color="text.primary"
              >
                {props.name}
              </Typography>
              <Typography
                sx={{ paddingTop: "2%", paddingBottom: "2%", display: "flex" }}
                variant="h6"
                color="text.primary"
              >
                {props.description}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="p" color="text.primary">
                Available
              </Typography>
              <Typography variant="p" color="text.primary">
                {props.quantity} g
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="p" color="text.primary">
                Club Points
              </Typography>
              <Typography variant="p" color="text.primary">
                {props.value}/g
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
        <CardActions
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <Button
            sx={{
              backgroundColor: colors.itemColor,
              color: colors.typographyColor,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              margin: "1%",
            }}
            onClick={handleNewRequest}
          >
            Request
          </Button>
        </CardActions>
      </Card>
      {showChart && (
        <Modal open={showChart} onClose={handleModalClose}>
          <Box sx={styleModal}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                sx={{
                  backgroundColor: colors.itemColor,
                  color: colors.typographyColor,
                }}
                onClick={handleModalClose}
              >
                <HighlightOffOutlinedIcon />
              </Button>
            </Box>
            <BarChart data={chartData} stockName={props.name} />
          </Box>
        </Modal>
      )}
      {newItem && (
        <Modal
          open={newItem}
          onClose={handleModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styleModal}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Requests are always welcome
            </Typography>
            <Formik
              onSubmit={handleAddRequest}
              initialValues={newRequest}
              validationSchema={checkoutSchema}
            >
              {({ errors, touched, handleBlur }) => (
                <form onSubmit={handleAddRequest}>
                  <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                      "& > div": {
                        gridColumn: isNonMobile ? undefined : "span 4",
                      },
                    }}
                  >
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Type"
                      onBlur={handleBlur}
                      onChange={handleInputChange}
                      value={newRequest.type}
                      name="type"
                      error={!!touched.type && !!errors.type}
                      helperText={touched.type && errors.type}
                      sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Amount"
                      onBlur={handleBlur}
                      onChange={handleInputChange}
                      value={newRequest.amount}
                      name="amount"
                      error={!!touched.amount && !!errors.amount}
                      helperText={touched.amount && errors.amount}
                      sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      multiline={true}
                      rows={3}
                      label="Description"
                      onBlur={handleBlur}
                      onChange={handleInputChange}
                      value={newRequest.description}
                      name="description"
                      error={!!touched.description && !!errors.description}
                      helperText={touched.description && errors.description}
                      sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      multiline={true}
                      rows={3}
                      label="Purpose"
                      onBlur={handleBlur}
                      onChange={handleInputChange}
                      value={newRequest.purpose}
                      name="purpose"
                      error={!!touched.purpose && !!errors.purpose}
                      helperText={touched.purpose && errors.purpose}
                      sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Member Number"
                      onBlur={handleBlur}
                      onChange={handleInputChange}
                      value={appState.memberNumber}
                      name="memberNumber"
                      error={!!touched.memberNumber && !!errors.memberNumber}
                      helperText={touched.memberNumber && errors.memberNumber}
                      sx={{ gridColumn: "span 2" }}
                      disabled
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Request Number"
                      onBlur={handleBlur}
                      onChange={handleInputChange}
                      value={"#R" + newRequest.requestNumber}
                      name="requestNumber"
                      error={!!touched.requestNumber && !!errors.requestNumber}
                      helperText={touched.requestNumber && errors.requestNumber}
                      sx={{ gridColumn: "span 2" }}
                      disabled
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <Button
                      sx={{
                        backgroundColor: colors.itemColor,
                        color: colors.typographyColor,
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding: "10px 20px",
                        margin: "30px",
                      }}
                      onClick={handleAddRequest}
                    >
                      {isAddingRequest ? "Confirming..." : "Confirm"}
                      <SaveAsOutlinedIcon sx={{ ml: "10px" }} />
                    </Button>
                    <Button
                      sx={{
                        backgroundColor: colors.itemColor,
                        color: colors.typographyColor,
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding: "10px 20px",
                        margin: "30px",
                      }}
                      onClick={() => {
                        setNewItem(false);
                        setNewRequest({
                          requestNumber: totalRows,
                          memberNumber: appState.memberNumber,
                          value: "",
                          received: "",
                          confirmed: "",
                          id: "0",
                        });
                      }}
                    >
                      Cancel
                      <DoDisturbAltOutlinedIcon sx={{ ml: "10px" }} />
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </Box>
        </Modal>
      )}
      {newItemRequest && (
        <Modal
          open={newItemRequest}
          onClose={handleModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styleModal}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Requests are always welcome
            </Typography>
            <Formik
              onSubmit={handleAddRequest}
              initialValues={newRequestedItem}
              validationSchema={checkoutSchema}
            >
              {({ errors, touched, handleBlur }) => (
                <form onSubmit={handleAddRequest}>
                  <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                      "& > div": {
                        gridColumn: isNonMobile ? undefined : "span 4",
                      },
                    }}
                  >
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Type"
                      onBlur={handleBlur}
                      onChange={handleInputChangeItem}
                      value={newRequestedItem.name}
                      name="name"
                      error={!!touched.name && !!errors.name}
                      helperText={touched.name && errors.name}
                      sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Qyantity"
                      onBlur={handleBlur}
                      onChange={handleInputChangeItem}
                      value={newRequest.quantity}
                      name="quantity"
                      error={!!touched.quantity && !!errors.quantity}
                      helperText={touched.quantity && errors.quantity}
                      sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Value"
                      onBlur={handleBlur}
                      onChange={handleInputChangeItem}
                      value={newRequest.value}
                      name="value"
                      error={!!touched.value && !!errors.value}
                      helperText={touched.value && errors.value}
                      sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Stock Number"
                      onBlur={handleBlur}
                      onChange={handleInputChangeItem}
                      value={newRequest.stockNumber}
                      name="stockNumber"
                      error={!!touched.stockNumber && !!errors.stockNumber}
                      helperText={touched.stockNumber && errors.stockNumber}
                      sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Requested Item Number"
                      onBlur={handleBlur}
                      onChange={handleInputChangeItem}
                      value={newRequest.requestedItemNumber}
                      name="requestedItemNumber"
                      error={
                        !!touched.requestedItemNumber &&
                        !!errors.requestedItemNumber
                      }
                      helperText={
                        touched.requestedItemNumber &&
                        errors.requestedItemNumber
                      }
                      sx={{ gridColumn: "span 2" }}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <Button
                      sx={{
                        backgroundColor: colors.itemColor,
                        color: colors.typographyColor,
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding: "10px 20px",
                        margin: "30px",
                      }}
                      onClick={handleAddRequest}
                    >
                      {isAddingRequest ? "Confirming..." : "Confirm"}
                      <SaveAsOutlinedIcon sx={{ ml: "10px" }} />
                    </Button>
                    <Button
                      sx={{
                        backgroundColor: colors.itemColor,
                        color: colors.typographyColor,
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding: "10px 20px",
                        margin: "30px",
                      }}
                      onClick={() => {
                        setNewItemRequest(false);
                        setNewRequestedItem({
                          name: "",
                          quantity: "",
                          value: "",
                          requestNumber: totalRows,
                          stockNumber: "",
                          requestedItemNumber: "",
                          id: "0",
                        });
                      }}
                    >
                      Cancel
                      <DoDisturbAltOutlinedIcon sx={{ ml: "10px" }} />
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </Box>
        </Modal>
      )}
    </React.Fragment>
  );
}

export default MenuCard;
