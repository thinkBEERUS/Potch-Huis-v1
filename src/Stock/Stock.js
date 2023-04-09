import React, { useState, useEffect } from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import {
  Box,
  Button,
  Select,
  InputLabel,
  MenuItem,
  TextField,
  FormControl,
} from "@mui/material";
import { useMode, tokens } from "../theme";
import StockCard from "./Card";
import Modal from "@mui/material/Modal";
import Header from "../ed-roh/components/Header";
import useMediaQuery from "@mui/material/useMediaQuery";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import DoDisturbAltOutlinedIcon from "@mui/icons-material/DoDisturbAltOutlined";
import SaveAsOutlinedIcon from "@mui/icons-material/SaveAsOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import SimpleBackdrop from "../Layout/Backdrop";
import StockTable from "./StockTable";

function Stock() {
  const [stock, setStock] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stockToAdd, setStockToAdd] = useState(null);
  const [stockToUpdate, setStockToUpdate] = useState(null);
  const [stockToDelete, setStockToDelete] = useState(null);
  const [isAddingStock, setIsAddingStock] = useState(false);
  const [isUpdatingStock, setIsUpdatingStock] = useState(false);
  const [isDeletingStock, setIsDeletingStock] = useState(false);
  const [theme] = useMode();
  const colors = tokens(theme.palette.mode);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const putURL = process.env.REACT_APP_API_URL + "/Stock";
  //const fetchURL = process.env.REACT_APP_API_URL + "/AllStock";
  const [stockRows, setStockRows] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        process.env.REACT_APP_API_URL + "/Stock/Rows"
      );
      const jsonData = await response.json();
      setStockRows(jsonData);
    }
    fetchData();
  }, []);

  const handleAddStockChange = (event) => {
    if (event.target.name === "active") {
      if (stockToAdd.active.toString() === "on" || stockToAdd.active === true) {
        setStockToAdd({
          ...stockToAdd,
          [event.target.name]: false,
        });
      } else if (
        stockToAdd.active.toString() === "off" ||
        stockToAdd.active === false
      ) {
        setStockToAdd({
          ...stockToAdd,
          [event.target.name]: true,
        });
      }
    } else {
      setStockToAdd({
        ...stockToAdd,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleAddStock = () => {
    const date = new Date();
    setStockToAdd({
      name: "",
      description: "",
      quantity: "",
      value: "",
      lastUpdated: date,
      active: false,
      stockNumber: "#" + stockRows,
    });
  };

  const handleUpdateStockChange = (event) => {
    if (event.target.name === "active") {
      if (
        stockToUpdate.active.toString() === "on" ||
        stockToUpdate.active === true
      ) {
        setStockToUpdate({
          ...stockToUpdate,
          [event.target.name]: false,
        });
      } else if (
        stockToUpdate.active.toString() === "off" ||
        stockToUpdate.active === false
      ) {
        setStockToUpdate({
          ...stockToUpdate,
          [event.target.name]: true,
        });
      }
    } else {
      setStockToUpdate({
        ...stockToUpdate,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleAddStockSubmit = (event) => {
    event.preventDefault();
    addStock();
    handleCloseModal();
  };

  const handleUpdateStockSubmit = (event) => {
    event.preventDefault();

    updateStock();
    handleCloseModal();
  };

  const handleDeleteStockSubmit = () => {
    deleteStock(stockToDelete.stockNumber);
    handleCloseModal();
  };

  useEffect(() => {
    fetchStock();
  }, []);

  const fetchStock = async () => {
    setIsLoading(true);
    try {
      await fetch(
        `${process.env.REACT_APP_API_URL}/AllStock?pageNumber=1&pageSize=15`
      )
        .then((response) => response.json())
        .then((data) => setStock(data));
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  };

  const addStock = async () => {
    setIsAddingStock(true);

    await axios
      .post(putURL, {
        name: stockToAdd.name,
        description: stockToAdd.description,
        quantity: stockToAdd.quantity,
        value: stockToAdd.value,
        lastUpdated: stockToAdd.lastUpdated,
        active: stockToAdd.active,
        stockNumber: stockToAdd.stockNumber,
      })
      .then((response) => {
        let date = new Date();
        setStockToAdd({
          name: null,
          description: "",
          quantity: "",
          value: "",
          lastUpdated: date,
          active: false,
          stockNumber: "",
        });
        setStock(response.data);
      })
      .catch((error) => setError(error))
      .finally(() => {
        setIsAddingStock(false);
        fetchStock();
      });
  };

  const updateStock = async () => {
    setIsUpdatingStock(true);
    try {
      const response = await axios.put(putURL, {
        name: stockToUpdate.name,
        description: stockToUpdate.description,
        quantity: stockToUpdate.quantity,
        value: stockToUpdate.value,
        lastUpdated: stockToUpdate.lastUpdated,
        active: stockToUpdate.active,
        stockNumber: stockToUpdate.stockNumber,
      });
      if (response.status === 200) {
        const updatedStock = response.data;
        setStock(updatedStock);
        setStockToUpdate(null);
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsUpdatingStock(false);
      fetchStock();
    }
  };

  const deleteStock = async (stockNum) => {
    const encodedStockNum = encodeURIComponent(stockNum.replace("#", ""));
    setIsDeletingStock(true);
    await axios
      .delete(putURL + `?stockNumber=%23${encodedStockNum}`)
      .then((response) => {
        if (response.status === 200) {
          const updatedStock = stock.filter(
            (stock) => stock.stockNumber !== stockNum
          );
          setStock(updatedStock);
        }
      })
      .catch((error) => setError(error))
      .finally(() => {
        setIsDeletingStock(false);
        setStockToDelete(null);
        fetchStock();
      });
  };

  const styleModal = {
    position: "relative",
    marginLeft: "5%",
    marginRight: "5%",
    marginTop: "5%",
    bgcolor: "primary.main",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const renderModal = () => {
    //TODO: fix this
    const checkoutSchema = yup.object().shape({
      name: yup.string().required("This is a required field!"),
      description: yup.string().required("This is a required field!"),
      quantity: yup.string().required("This is a required field!"),
      value: yup.string().required("This is a required field!"),
      lastUpdated: yup.date().required("This is a required field!"),
      active: yup.bool().required("This is a required field!"),
    });

    return (
      <Box>
        {stockToAdd && (
          <Modal open={openModal} onClose={handleCloseModal}>
            <Box sx={styleModal}>
              <Formik
                onSubmit={handleAddStockSubmit}
                initialValues={stockToAdd}
                validationSchema={checkoutSchema}
              >
                {({ errors, touched, handleBlur }) => (
                  <form onSubmit={handleAddStockSubmit}>
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
                        label="Name"
                        onBlur={handleBlur}
                        onChange={handleAddStockChange}
                        value={stockToAdd.name}
                        name="name"
                        error={!!touched.name && !!errors.name}
                        helperText={touched.name && errors.name}
                        sx={{ gridColumn: "span 4" }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        multiline
                        rows={4}
                        label="Description"
                        onBlur={handleBlur}
                        onChange={handleAddStockChange}
                        value={stockToAdd.description}
                        name="description"
                        error={!!touched.description && !!errors.description}
                        helperText={touched.description && errors.description}
                        sx={{ gridColumn: "span 4" }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Stock Number"
                        onBlur={handleBlur}
                        onChange={handleAddStockChange}
                        value={stockToAdd.stockNumber}
                        name="stockNumber"
                        error={!!touched.stockNumber && !!errors.stockNumber}
                        helperText={touched.stockNumber && errors.stockNumber}
                        sx={{ gridColumn: "span 4" }}
                        disabled
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Quantity"
                        onBlur={handleBlur}
                        onChange={handleAddStockChange}
                        value={stockToAdd.quantity}
                        name="quantity"
                        error={!!touched.quantity && !!errors.quantity}
                        helperText={touched.quantity && errors.quantity}
                        sx={{ gridColumn: "span 2" }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Value (Club Points)"
                        onBlur={handleBlur}
                        onChange={handleAddStockChange}
                        value={stockToAdd.value}
                        name="value"
                        error={!!touched.value && !!errors.value}
                        helperText={touched.value && errors.value}
                        sx={{ gridColumn: "span 1" }}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-around",
                          gridColumn: "span 1",
                        }}
                      >
                        <FormControl variant="filled" fullWidth>
                          <InputLabel id="menu-select-label">
                            Menu Status
                          </InputLabel>
                          <Select
                            labelId="menu-select-label"
                            id="menu-simple-select"
                            value={stockToAdd.active}
                            name="active"
                            onChange={handleAddStockChange}
                          >
                            <MenuItem value={true}>Active</MenuItem>
                            <MenuItem value={false}>Inactive</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-evenly",
                          gridColumn: "span 4",
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
                          type="submit"
                        >
                          {isAddingStock ? "Saving..." : "Save"}
                          <AppRegistrationIcon sx={{ ml: "10px" }} />
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
                          onClick={() => setStockToAdd(null)}
                        >
                          Cancel
                          <DoDisturbAltOutlinedIcon sx={{ ml: "10px" }} />
                        </Button>
                      </Box>
                    </Box>
                  </form>
                )}
              </Formik>
            </Box>
          </Modal>
        )}

        {stockToUpdate && (
          <Modal open={openModal} onClose={handleCloseModal}>
            <Box sx={styleModal}>
              <Formik
                onSubmit={handleUpdateStockSubmit}
                initialValues={stockToUpdate}
                validationSchema={checkoutSchema}
              >
                {({ errors, touched, handleBlur }) => (
                  <form onSubmit={handleUpdateStockSubmit}>
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
                        label="Name"
                        onBlur={handleBlur}
                        onChange={handleUpdateStockChange}
                        value={stockToUpdate.name}
                        name="name"
                        error={!!touched.name && !!errors.name}
                        helperText={touched.name && errors.name}
                        sx={{ gridColumn: "span 4" }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        multiline={true}
                        rows={4}
                        label="Description"
                        onBlur={handleBlur}
                        onChange={handleUpdateStockChange}
                        value={stockToUpdate.description}
                        name="description"
                        error={!!touched.description && !!errors.description}
                        helperText={touched.description && errors.description}
                        sx={{ gridColumn: "span 4" }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Stock Number"
                        onBlur={handleBlur}
                        onChange={handleUpdateStockChange}
                        value={stockToUpdate.stockNumber}
                        name="stockNumber"
                        error={!!touched.stockNumber && !!errors.stockNumber}
                        helperText={touched.stockNumber && errors.stockNumber}
                        sx={{ gridColumn: "span 4" }}
                        disabled
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Quantity"
                        onBlur={handleBlur}
                        onChange={handleUpdateStockChange}
                        value={stockToUpdate.quantity}
                        name="quantity"
                        error={!!touched.quantity && !!errors.quantity}
                        helperText={touched.quantity && errors.quantity}
                        sx={{ gridColumn: "span 2" }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Value (Club Points)"
                        onBlur={handleBlur}
                        onChange={handleUpdateStockChange}
                        value={stockToUpdate.value}
                        name="value"
                        error={!!touched.value && !!errors.value}
                        helperText={touched.value && errors.value}
                        sx={{ gridColumn: "span 1" }}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-around",
                          gridColumn: "span 1",
                        }}
                      >
                        <FormControl variant="filled" fullWidth>
                          <InputLabel id="menu-select-label">
                            Menu Status
                          </InputLabel>
                          <Select
                            labelId="menu-select-label"
                            id="menu-simple-select"
                            value={stockToUpdate.active}
                            name="active"
                            onChange={handleUpdateStockChange}
                          >
                            <MenuItem value={true}>Active</MenuItem>
                            <MenuItem value={false}>Inactive</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
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
                        type="submit"
                      >
                        {isUpdatingStock ? "Saving..." : "Save"}
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
                        onClick={() => setStockToUpdate(null)}
                      >
                        Cancel
                        <DoDisturbAltOutlinedIcon sx={{ ml: "10px" }} />
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
                          setStockToDelete(stockToUpdate);
                          handleOpenModal();
                        }}
                      >
                        {isDeletingStock ? "Deleting..." : "Delete"}
                        <DeleteForeverOutlinedIcon sx={{ ml: "10px" }} />
                      </Button>
                    </Box>
                  </form>
                )}
              </Formik>
            </Box>
          </Modal>
        )}

        {stockToDelete && (
          <Modal open={openModal} onClose={handleCloseModal}>
            <Box sx={styleModal}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography variant="h3" color="text.primary">
                  Are you sure you want to delete this stock?
                </Typography>
                <strong color="text.primary" style={{ marginTop: "30px" }}>
                  {stockToDelete.stockNumber}: {stockToDelete.name}{" "}
                  {stockToDelete.description}
                </strong>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  <Button
                    onClick={() => handleDeleteStockSubmit()}
                    sx={{
                      backgroundColor: colors.itemColor,
                      color: colors.typographyColor,
                      fontSize: "14px",
                      fontWeight: "bold",
                      padding: "10px 20px",
                      margin: "30px",
                    }}
                  >
                    Continue
                    <DeleteForeverOutlinedIcon sx={{ ml: "10px" }} />
                  </Button>
                  <Button
                    onClick={() => setStockToDelete(null)}
                    sx={{
                      backgroundColor: colors.itemColor,
                      color: colors.typographyColor,
                      fontSize: "14px",
                      fontWeight: "bold",
                      padding: "10px 20px",
                      margin: "30px",
                    }}
                  >
                    Cancel
                    <DoDisturbAltOutlinedIcon sx={{ ml: "10px" }} />
                  </Button>
                </Box>
                <Typography variant="h4" color="text.primary">
                  THIS ACTION CANNOT BE UNDONE!
                </Typography>
              </Box>
            </Box>
          </Modal>
        )}
      </Box>
    );
  };

  const editRow = (Id) => {
    const row = stock.find((r) => r.id === Id);
    const date = new Date();
    setStockToUpdate({
      name: row.name,
      description: row.description,
      quantity: row.quantity,
      value: row.value,
      lastUpdated: date,
      active: row.active,
      stockNumber: row.stockNumber,
      id: row.id,
    });

    handleOpenModal();
  };

  const deleteRow = (Id) => {
    const row = stock.find((r) => r.id === Id);
    const date = new Date();
    setStockToDelete({
      name: row.name,
      description: row.description,
      quantity: row.quantity,
      value: row.value,
      lastUpdated: date,
      active: row.active,
      stockNumber: row.stockNumber,
      id: row.id,
    });

    handleOpenModal();
  };

  const renderStock = () => {
    return (
      <Box m={"10"}>
        <Box
          style={{
            margin: "1%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Header title="Stock" subtitle="Easily manage your inventory" />
          <Button
            sx={{
              backgroundColor: colors.itemColor,
              color: colors.typographyColor,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={() => {
              handleAddStock();
              setStockToDelete(null);
              setStockToUpdate(null);
              handleOpenModal();
            }}
          >
            <AddCircleOutlineOutlinedIcon />
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          <StockTable editStock={editRow} removeStock={deleteRow} />
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
        renderStock()
      )}

      {renderModal()}
    </React.Fragment>
  );
}

export default Stock;
