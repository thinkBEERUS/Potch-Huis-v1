import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import { Button, Box, Typography, Modal, TextField } from "@mui/material";
import { Formik } from "formik";
import DoDisturbAltOutlinedIcon from "@mui/icons-material/DoDisturbAltOutlined";
import SaveAsOutlinedIcon from "@mui/icons-material/SaveAsOutlined";
import { useMode, tokens } from "../theme";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../ed-roh/components/Header";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import * as yup from "yup";

const Donations = () => {
  const [donations, setDonations] = useState([]);
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
      donationNumber: "",
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
  useEffect(() => {
    axios
      .get("https://rightgreenwave11.conveyor.cloud/Donations")
      .then((res) => {
        setDonations(res.data);
      });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewDonation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddDonation = () => {
    setIsAddingDonation(true);
    axios
      .post("https://rightgreenwave11.conveyor.cloud/Donations", newDonation)
      .then((res) => {
        setDonations([...donations, res.data]);
        setNewDonation({
          type: "",
          amount: "",
          description: "",
          purpose: "",
          memberNumber: "",
          donationNumber: "",
        });
        handleCloseModal();
      });
  };

  // const handleEditDonation = (id) => {
  //   const updatedDonation = donations.find((d) => d.id === id);
  //   axios
  //     .put(`https://rightgreenwave11.conveyor.cloud/Donations/${id}`, updatedDonation)
  //     .then((res) => {
  //       const index = donations.findIndex((d) => d.id === id);
  //       const updatedDonations = [...donations];
  //       updatedDonations[index] = res.data;
  //       setDonations(updatedDonations);
  //     });
  // };

  const handleDeleteDonation = (id) => {
    axios
      .delete(
        `https://rightgreenwave11.conveyor.cloud/Donations?memberNumber=${id}`
      )
      .then(() => {
        const updatedDonations = donations.filter((d) => d.id !== id);
        setDonations(updatedDonations);
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
        <Header title="Donations" subtitle="Easily view your donations" />
        <Table className="table striped bordered hover">
          <thead style={{ alignItems: "flex-start" }}>
            <tr>
              <td>Type</td>
              <td>Amount</td>
              <td>Description</td>
              <td>Purpose</td>
              <td>Member Number</td>
              <td>Donation Number</td>
              {/* <td style={{ textAlign: "center" }}>Actions</td> */}
            </tr>
          </thead>
          <tbody
            style={{
              backgroundColor: colors.backgroundColor,
              borderColor: colors.itemColor,
              color: colors.typographyColor,
            }}
          >
            {donations.map((donation) => (
              <tr key={donation.type}>
                <td>{donation.type}</td>
                <td>{donation.amount}</td>
                <td>{donation.description}</td>
                <td>{donation.purpose}</td>
                <td>{donation.memberNumber}</td>
                <td>{donation.donationNumber}</td>
                {/* <td style={{ textAlign: "center" }}>
                  <DeleteOutlineIcon
                    onClick={() => handleDeleteDonation(donation.memberNumber)}
                  />
                </td> */}
              </tr>
            ))}
          </tbody>
        </Table>

        <Button
          sx={{
            backgroundColor: colors.itemColor,
            color: colors.typographyColor,
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
            margin: "30px",
          }}
          onClick={handleNewDonation}
        >
          Donation
        </Button>
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
                      value={newDonation.purpose}
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
                      value={newDonation.memberNumber}
                      name="memberNumber"
                      error={!!touched.memberNumber && !!errors.memberNumber}
                      helperText={touched.memberNumber && errors.memberNumber}
                      sx={{ gridColumn: "span 2" }}
                    />
                    <label
                      value={newDonation.donationNumber}
                      name="donationNumber"
                      hidden
                    ></label>
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
