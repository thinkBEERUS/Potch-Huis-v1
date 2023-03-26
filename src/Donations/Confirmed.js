import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import { Button, Box, Typography, Modal, TextField } from "@mui/material";
import { Formik } from "formik";
import DoDisturbAltOutlinedIcon from "@mui/icons-material/DoDisturbAltOutlined";
import SaveAsOutlinedIcon from "@mui/icons-material/SaveAsOutlined";
import { useMode, tokens } from "../theme";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as yup from "yup";
import Header from "../ed-roh/components/Header";

const Confirmed = () => {
  const [confirmed, setConfirmed] = useState([]);
  const [isAddingConfirmed, setIsAddingConfirmed] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [newConfirmed, setNewConfirmed] = useState(null);
  const [theme] = useMode();
  const colors = tokens(theme.palette.mode);
  const handleNewConfirmed = () => {
    setNewConfirmed({
      received: "2023-03-16T00:00:00",
      confirmed: "2023-03-16T00:00:00",
      confirmedBy: "PH00000ADM",
      memberNumber: "PH00001ADM",
      donationNumber: "#",
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
      .get("https://rightgreenwave11.conveyor.cloud/Donations/Confirmed")
      .then((res) => {
        setConfirmed(res.data);
      });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewConfirmed((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddConfirmed = () => {
    setIsAddingConfirmed(true);
    axios
      .post(
        "https://rightgreenwave11.conveyor.cloud/Donations/Confirmed",
        newConfirmed
      )
      .then((res) => {
        setConfirmed([...confirmed, res.data]);
        setNewConfirmed({
          received: "",
          confirmed: "",
          confirmedBy: "",
          memberNumber: "",
          donationNumber: "",
        });
        handleCloseModal();
      });
  };

  const handleEditConfirmed = (id) => {
    const updatedConfirmed = confirmed.find((d) => d.id === id);
    axios
      .put(
        `https://rightgreenwave11.conveyor.cloud/Donations/Confirmed/${id}`,
        updatedConfirmed
      )
      .then((res) => {
        const index = confirmed.findIndex((d) => d.id === id);
        const updatedConfirmed = [...confirmed];
        updatedConfirmed[index] = res.data;
        setConfirmed(updatedConfirmed);
      });
  };

  const handleDeleteConfirmed = (id) => {
    axios
      .delete(
        `https://rightgreenwave11.conveyor.cloud/Donations/Confirmed?memberNumber=${id}`
      )
      .then(() => {
        const updatedConfirmed = confirmed.filter((d) => d.id !== id);
        setConfirmed(updatedConfirmed);
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
        <Header
          title="Confirmed Donations"
          subtitle="Easily view your confirmed donations"
        />
        <Table>
          <thead>
            <tr>
              <td>Received</td>
              <td>Confirmed</td>
              <td>Confirmed By</td>
              <td>Member Number</td>
              <td>Donation Number</td>
            </tr>
          </thead>
          <tbody
            style={{
              backgroundColor: colors.backgroundColor,
              color: colors.typographyColor,
            }}
          >
            {confirmed.map((confirmed) => (
              <tr key={confirmed.received} onClick={handleNewConfirmed}>
                <td>{confirmed.received}</td>
                <td>{confirmed.confirmed}</td>
                <td>{confirmed.confirmedBy}</td>
                <td>{confirmed.memberNumber}</td>
                <td>{confirmed.donationNumber}</td>
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
          onClick={handleNewConfirmed}
        >
          Confirmed Donation
        </Button>
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styleModal}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Confirmed are very much appreciated
            </Typography>
            <Formik
              onSubmit={handleAddConfirmed}
              initialValues={newConfirmed}
              validationSchema={checkoutSchema}
            >
              {({ errors, touched, handleBlur }) => (
                <form onSubmit={handleAddConfirmed}>
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
                      value={newConfirmed.type}
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
                      value={newConfirmed.amount}
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
                      value={newConfirmed.description}
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
                      value={newConfirmed.purpose}
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
                      value={newConfirmed.memberNumber}
                      name="memberNumber"
                      error={!!touched.memberNumber && !!errors.memberNumber}
                      helperText={touched.memberNumber && errors.memberNumber}
                      sx={{ gridColumn: "span 2" }}
                    />
                    <label
                      value={newConfirmed.confirmedNumber}
                      name="confirmedNumber"
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
                      {isAddingConfirmed ? "Confirming..." : "Confirm"}
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
                        setNewConfirmed(null);
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

export default Confirmed;
