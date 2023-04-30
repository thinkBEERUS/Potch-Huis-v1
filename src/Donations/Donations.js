import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Box, Typography, Modal, TextField } from "@mui/material";
import { Formik } from "formik";
import DoDisturbAltOutlinedIcon from "@mui/icons-material/DoDisturbAltOutlined";
import SaveAsOutlinedIcon from "@mui/icons-material/SaveAsOutlined";
import { useMode, tokens } from "../theme";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../ed-roh/components/Header";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import * as yup from "yup";
import DonationTable from "./DonationTable";
import { AppState } from "../AppState";
import { useContext } from "react";
const Donations = () => {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-GB");
  const { appState, setAppState } = useContext(AppState);
  const [refreshTable, setRefreshTable] = useState(false);
  const [isAddingDonation, setIsAddingDonation] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [newDonation, setNewDonation] = useState(null);

  const [theme] = useMode();
  const colors = tokens(theme.palette.mode);
  const handleNewDonation = () => {
    setNewDonation({
      type: "",
      amount: "",
      description: "",
      purpose: "",
      memberNumber: "",
      donationNumber: "DTest",
      confirmed: formattedDate,
      confirmedBy: appState.memberNumber,
      received: "",
    });
    handleOpenModal();
  };

  const styleModal = {
    position: "relative",
    marginLeft: "5%",
    marginRight: "5%",
    marginTop: "5%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const checkoutSchema = yup.object().shape({
    name: yup.string().required("This is a required field!"),
    description: yup.string().required("This is a required field!"),
    quantity: yup.string().required("This is a required field!"),
    value: yup.string().required("This is a required field!"),
    lastUpdated: yup.date().required("This is a required field!"),
    active: yup.bool().required("This is a required field!"),
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewDonation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddDonation = () => {
    setIsAddingDonation(true);
    fetch(process.env.REACT_APP_API_URL + "/Donations/Create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDonation),
    })
      .then((res) => res.json())
      .then((data) => {
        setNewDonation({
          type: "",
          amount: "",
          description: "",
          purpose: "",
          memberNumber: "",
          donationNumber: "",
          received: "",
        });
        setIsAddingDonation(false);
        handleCloseModal();
        setRefreshTable(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Box m={"10"}>
      <Box
        style={{
          margin: "1%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          style={{
            margin: "1%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Header
            title="Donations"
            subtitle="Easily view donations made to Potch Huis"
          />
          <Button
            sx={{
              backgroundColor: colors.itemColor,
              color: colors.typographyColor,
            }}
            onClick={handleNewDonation}
          >
            <AddCircleOutlineOutlinedIcon />
          </Button>
        </Box>

        <DonationTable refreshTable={refreshTable} />

        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styleModal}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Donations are very much appreciated
            </Typography>
            <Formik
              onSubmit={handleAddDonation}
              initialValues={newDonation}
              validationSchema={checkoutSchema}
            >
              {({ errors, touched, handleBlur }) => (
                <form onSubmit={handleAddDonation}>
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
                      value={newDonation.type}
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
                      value={newDonation.amount}
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
                      value={newDonation.description}
                      name="description"
                      error={!!touched.description && !!errors.description}
                      helperText={touched.description && errors.description}
                      sx={{ gridColumn: "span 2" }}
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
                      value={newDonation.purpose}
                      name="purpose"
                      error={!!touched.purpose && !!errors.purpose}
                      helperText={touched.purpose && errors.purpose}
                      sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Date Received"
                      onBlur={handleBlur}
                      onChange={handleInputChange}
                      value={newDonation.received}
                      name="received"
                      error={!!touched.received && !!errors.received}
                      helperText={touched.received && errors.received}
                      sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Member Number"
                      onBlur={handleBlur}
                      onChange={handleInputChange}
                      value={newDonation.memberNumber}
                      name="memberNumber"
                      error={!!touched.memberNumber && !!errors.memberNumber}
                      helperText={touched.memberNumber && errors.memberNumber}
                      sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Confirmed By"
                      onBlur={handleBlur}
                      onChange={handleInputChange}
                      value={appState.memberNumber}
                      name="confirmedBy"
                      error={!!touched.confirmedby && !!errors.confirmedby}
                      helperText={touched.confirmedby && errors.confirmedby}
                      sx={{ gridColumn: "span 2" }}
                      disabled
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Date Confirmed"
                      onBlur={handleBlur}
                      onChange={handleInputChange}
                      value={formattedDate}
                      name="confirmed"
                      error={!!touched.confirmed && !!errors.confirmed}
                      helperText={touched.confirmed && errors.confirmed}
                      sx={{ gridColumn: "span 2" }}
                      disabled
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Donation Number"
                      onBlur={handleBlur}
                      onChange={handleInputChange}
                      value={newDonation.donationNumber}
                      name="donationNumber"
                      error={
                        !!touched.donationNumber && !!errors.donationNumber
                      }
                      helperText={
                        touched.donationNumber && errors.donationNumber
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
                      onClick={handleAddDonation}
                    >
                      {isAddingDonation ? "Confirming..." : "Confirm"}
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
                        handleCloseModal();
                        setNewDonation(null);
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
      </Box>
    </Box>
  );
};

export default Donations;
