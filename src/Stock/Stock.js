import React, { useState, useEffect } from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import { Box, Button, Switch, TextField } from "@mui/material";
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

function Stock() {
  const [stock, setStock] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stockToAdd, setStockToAdd] = useState(null);
  const [stockToUpdate, setStockToUpdate] = useState({
    name: "",
    description: "",
    quantity: "",
    value: "",
    lastUpdated: "",
    active: "off",
    stockNumber: "",
  });
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
  // const putURL = "https://newmintshed67.conveyor.cloud/Stock";
  // const fetchURL = "https://newmintshed67.conveyor.cloud/AllStock";
  const putURL = "https://rightgreenwave11.conveyor.cloud/Stock";
  const fetchURL = "https://rightgreenwave11.conveyor.cloud/AllStock";

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
      stockNumber: "",
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

  // const handleUpdateStockActive = (event) => {
  //   setStockToUpdate({
  //     ...stockToUpdate,
  //     [event.target.name]: event.target.checked,
  //   });
  // };

  const handleAddStockSubmit = (event) => {
    event.preventDefault();
    addStock();
    handleCloseModal();
  };

  const handleUpdateStockSubmit = (event) => {
    event.preventDefault();
    console.log(stockToUpdate.toString());

    updateStock();
  };

  const handleDeleteStockSubmit = (event) => {
    event.preventDefault();
    deleteStock();
    setStockToUpdate(null);
    setStockToDelete(null);
    handleCloseModal();
  };

  useEffect(() => {
    fetchStock();
  }, []);

  const fetchStock = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(fetchURL);
      setStock(response.data);
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
        console.log(updatedStock);
        setStock(updatedStock);
        setStockToUpdate(null);
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsUpdatingStock(false);
    }
  };

  const deleteStock = async () => {
    setIsDeletingStock(true);
    await axios
      .delete(putURL + `?name=${stockToDelete.name}`)
      .then((response) => {
        if (response.status === 200) {
          const updatedStock = stock.filter(
            (stock) => stock.name !== stockToDelete.name
          );
          setStock(updatedStock);
        }
      })
      .catch((error) => setError(error))
      .finally(() => {
        setIsDeletingStock(false);
        setStockToDelete(null);
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
                        type="number"
                        label="Value Number"
                        onBlur={handleBlur}
                        onChange={handleAddStockChange}
                        value={stockToAdd.value}
                        name="value"
                        error={!!touched.value && !!errors.value}
                        helperText={touched.value && errors.value}
                        sx={{ gridColumn: "span 1" }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Active on Menu"
                        onBlur={handleBlur}
                        onChange={handleAddStockChange}
                        value={stockToAdd.active}
                        name="active"
                        error={!!touched.active && !!errors.active}
                        helperText={touched.active && errors.active}
                        sx={{ gridColumn: "span 1" }}
                      />
                      {/* <Box
                        sx={{
                          gridColumn: "span 4",
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-around",
                          alignItems: "center",
                        }}
                      >
                        <Typography variant="h4" color="text.primary">
                          Active on Menu
                        </Typography>
                        <Switch
                          checked={stockToAdd.active}
                          onChange={handleAddStockChange}
                          name="active"
                          sx={{
                            "& .css-16mtyb-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked":
                              {
                                background: `${colors.typographyColor} !important`,
                              },
                            "& .css-16mtyb-MuiButtonBase-root-MuiSwitch-switchBase .MuiSwitch-input:checked":
                              {
                                color: `${colors.typographyColor} !important`,
                              },
                          }}
                        />
                      </Box> */}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-start",
                        }}
                      >
                        <Button
                          sx={{
                            backgroundColor: colors.itemColor,
                            color: colors.typographyColor,
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                          }}
                          type="submit"
                        >
                          {isAddingStock ? "Saving..." : "Save Stock"}
                          <AppRegistrationIcon sx={{ ml: "10px" }} />
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
                        type="number"
                        label="Value Number"
                        onBlur={handleBlur}
                        onChange={handleUpdateStockChange}
                        value={stockToUpdate.value}
                        name="value"
                        error={!!touched.value && !!errors.value}
                        helperText={touched.value && errors.value}
                        sx={{ gridColumn: "span 1" }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Active on Menu"
                        onBlur={handleBlur}
                        onChange={handleUpdateStockChange}
                        value={stockToUpdate.active}
                        name="active"
                        error={!!touched.active && !!errors.active}
                        helperText={touched.active && errors.active}
                        sx={{ gridColumn: "span 1" }}
                      />
                      {/* <Box
                        sx={{
                          gridColumn: "span 4",
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-around",
                          alignItems: "center",
                        }}
                      >
                        <Typography variant="h4" color="text.primary">
                          Active on Menu
                        </Typography>
                        <Switch
                          //defaultChecked={stockToUpdate.active}
                          checked={stockToUpdate.active}
                          // onClick={() =>
                          //   handleUpdateStockChange({
                          //     target: {
                          //       name: "active",
                          //       checked: !stockToUpdate.active,
                          //     },
                          //   })
                          // }
                          onChange={handleUpdateStockChange}
                          name="active"
                        />
                      </Box> */}
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
                        {isUpdatingStock ? "Saving..." : "Save Stock"}
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
                        {isDeletingStock ? "Deleting..." : "Delete Stock"}
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
                    type="submit"
                    onClick={handleDeleteStockSubmit}
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

  const renderStock = () => {
    return (
      <Box m={"10"}>
        <Box
          style={{
            margin: "1%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Header title="Stock" subtitle="Easily manage your stock" />

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
            <PersonAddOutlinedIcon sx={{ mr: "10px" }} />
            New Stock
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {stock.map((stock, index) => (
            <Box key={index} sx={{ width: 300, height: 200, margin: "1%" }}>
              <StockCard
                key={stock.name}
                stocknumber={stock.stockNumber}
                name={stock.name}
                description={stock.description}
                quantity={stock.quantity}
                value={stock.value}
                lastUpdated={stock.lastUpdated}
                active={stock.active}
                activeChange={() => handleUpdateStockChange}
                update={() => {
                  setStockToUpdate(stock);
                  setStockToDelete(null);
                  setStockToAdd(null);
                  handleOpenModal();
                }}
                stockNumber={stock.stockNumber}
              />
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
        renderStock()
      )}

      {renderModal()}
    </React.Fragment>
  );
}

export default Stock;
