import React, { useState, useEffect } from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import { Box, Button, TextField } from "@mui/material";
import { useMode, tokens } from "../theme";
import MemberCard from "./Card";
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

function Members() {
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [memberToAdd, setMemberToAdd] = useState(null);
  const [memberToUpdate, setMemberToUpdate] = useState(null);
  const [memberToDelete, setMemberToDelete] = useState(null);
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [isUpdatingMember, setIsUpdatingMember] = useState(false);
  const [isDeletingMember, setIsDeletingMember] = useState(false);
  const [theme] = useMode();
  const colors = tokens(theme.palette.mode);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleAddMemberChange = (event) => {
    setMemberToAdd({
      ...memberToAdd,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddMember = () => {
    setMemberToAdd({
      firstname: "",
      lastname: "",
      email: "",
      cellphone: "",
      streetAddress: "",
      suburb: "",
      city: "",
      memberNumber: "",
    });
  };

  const handleUpdateMemberChange = (event) => {
    setMemberToUpdate({
      ...memberToUpdate,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddMemberSubmit = (event) => {
    event.preventDefault();
    addMember();
    handleCloseModal();
  };

  const handleUpdateMemberSubmit = (event) => {
    event.preventDefault();
    updateMember();
  };

  const handleDeleteMemberSubmit = (event) => {
    event.preventDefault();
    deleteMember();
    setMemberToUpdate(null);
    setMemberToDelete(null);
    handleCloseModal();
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://rightgreenwave11.conveyor.cloud/Members"
      );
      setMembers(response.data);
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  };

  const addMember = async () => {
    setIsAddingMember(true);
    await axios
      .post("https://rightgreenwave11.conveyor.cloud/Members", memberToAdd)
      .then((response) => {
        setMemberToAdd({
          firstname: null,
          lastname: "",
          email: "",
          cellphone: "",
          streetAddress: "",
          suburb: "",
          city: "",
          memberNumber: "",
        });
        setMembers(response.data);
      })
      .catch((error) => setError(error))
      .finally(() => {
        setIsAddingMember(false);
      });
  };

  const updateMember = async () => {
    setIsUpdatingMember(true);
    try {
      const response = await axios.put(
        `https://rightgreenwave11.conveyor.cloud/Members`,
        memberToUpdate
      );
      if (response.status === 200) {
        const updatedMembers = response.data;
        console.log(updatedMembers);
        setMembers(updatedMembers);
        setMemberToUpdate(null);
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsUpdatingMember(false);
    }
  };

  const deleteMember = async () => {
    setIsDeletingMember(true);
    await axios
      .delete(
        `https://rightgreenwave11.conveyor.cloud/Members?memberNumber=${memberToDelete.memberNumber}`
      )
      .then((response) => {
        if (response.status === 200) {
          const updatedMembers = members.filter(
            (member) => member.memberNumber !== memberToDelete.memberNumber
          );
          setMembers(updatedMembers);
        }
      })
      .catch((error) => setError(error))
      .finally(() => {
        setIsDeletingMember(false);
        setMemberToDelete(null);
      });
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
        {memberToAdd && (
          <Modal open={openModal} onClose={handleCloseModal}>
            <Box sx={styleModal}>
              <Formik
                onSubmit={handleAddMemberSubmit}
                initialValues={memberToAdd}
                validationSchema={checkoutSchema}
              >
                {({ errors, touched, handleBlur }) => (
                  <form onSubmit={handleAddMemberSubmit}>
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
                        onChange={handleAddMemberChange}
                        value={memberToAdd.firstname}
                        name="firstname"
                        error={!!touched.firstname && !!errors.firstname}
                        helperText={touched.firstname && errors.firstname}
                        sx={{ gridColumn: "span 2" }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Last Name"
                        onBlur={handleBlur}
                        onChange={handleAddMemberChange}
                        value={memberToAdd.lastname}
                        name="lastname"
                        error={!!touched.lastname && !!errors.lastname}
                        helperText={touched.lastname && errors.lastname}
                        sx={{ gridColumn: "span 2" }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Email"
                        onBlur={handleBlur}
                        onChange={handleAddMemberChange}
                        value={memberToAdd.email}
                        name="email"
                        error={!!touched.email && !!errors.email}
                        helperText={touched.email && errors.email}
                        sx={{ gridColumn: "span 4" }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        label="Cellphone Number"
                        onBlur={handleBlur}
                        onChange={handleAddMemberChange}
                        value={memberToAdd.cellphone}
                        name="cellphone"
                        error={!!touched.cellphone && !!errors.cellphone}
                        helperText={touched.cellphone && errors.cellphone}
                        sx={{ gridColumn: "span 4" }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Street Address"
                        onBlur={handleBlur}
                        onChange={handleAddMemberChange}
                        value={memberToAdd.streetAddress}
                        name="streetAddress"
                        error={
                          !!touched.streetAddress && !!errors.streetAddress
                        }
                        helperText={
                          touched.streetAddress && errors.streetAddress
                        }
                        sx={{ gridColumn: "span 4" }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Suburb"
                        onBlur={handleBlur}
                        onChange={handleAddMemberChange}
                        value={memberToAdd.suburb}
                        name="suburb"
                        error={!!touched.suburb && !!errors.suburb}
                        helperText={touched.suburb && errors.suburb}
                        sx={{ gridColumn: "span 4" }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="City"
                        onBlur={handleBlur}
                        onChange={handleAddMemberChange}
                        value={memberToAdd.city}
                        name="city"
                        error={!!touched.city && !!errors.city}
                        helperText={touched.city && errors.city}
                        sx={{ gridColumn: "span 4" }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Member Number"
                        onBlur={handleBlur}
                        onChange={handleAddMemberChange}
                        value={memberToAdd.memberNumber}
                        name="memberNumber"
                        error={!!touched.memberNumber && !!errors.memberNumber}
                        helperText={touched.memberNumber && errors.memberNumber}
                        sx={{ gridColumn: "span 4" }}
                      />

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
                          {isAddingMember ? "Saving..." : "Save Member"}
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

        {memberToUpdate && (
          <Modal open={openModal} onClose={handleCloseModal}>
            <Box sx={styleModal}>
              <Formik
                onSubmit={handleUpdateMemberSubmit}
                initialValues={memberToUpdate}
                validationSchema={checkoutSchema}
              >
                {({ errors, touched, handleBlur }) => (
                  <form onSubmit={handleUpdateMemberSubmit}>
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
                        onChange={handleUpdateMemberChange}
                        value={memberToUpdate.firstname}
                        name="firstname"
                        error={!!touched.firstname && !!errors.firstname}
                        helperText={touched.firstname && errors.firstname}
                        sx={{ gridColumn: "span 2" }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Last Name"
                        onBlur={handleBlur}
                        onChange={handleUpdateMemberChange}
                        value={memberToUpdate.lastname}
                        name="lastname"
                        error={!!touched.lastname && !!errors.lastname}
                        helperText={touched.lastname && errors.lastname}
                        sx={{ gridColumn: "span 2" }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Email"
                        onBlur={handleBlur}
                        onChange={handleUpdateMemberChange}
                        value={memberToUpdate.email}
                        name="email"
                        error={!!touched.email && !!errors.email}
                        helperText={touched.email && errors.email}
                        sx={{ gridColumn: "span 4" }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        label="Cellphone Number"
                        onBlur={handleBlur}
                        onChange={handleUpdateMemberChange}
                        value={memberToUpdate.cellphone}
                        name="cellphone"
                        error={!!touched.cellphone && !!errors.cellphone}
                        helperText={touched.cellphone && errors.cellphone}
                        sx={{ gridColumn: "span 4" }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Street Address"
                        onBlur={handleBlur}
                        onChange={handleUpdateMemberChange}
                        value={memberToUpdate.streetAddress}
                        name="streetAddress"
                        error={
                          !!touched.streetAddress && !!errors.streetAddress
                        }
                        helperText={
                          touched.streetAddress && errors.streetAddress
                        }
                        sx={{ gridColumn: "span 4" }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Suburb"
                        onBlur={handleBlur}
                        onChange={handleUpdateMemberChange}
                        value={memberToUpdate.suburb}
                        name="suburb"
                        error={!!touched.suburb && !!errors.suburb}
                        helperText={touched.suburb && errors.suburb}
                        sx={{ gridColumn: "span 4" }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="City"
                        onBlur={handleBlur}
                        onChange={handleUpdateMemberChange}
                        value={memberToUpdate.city}
                        name="city"
                        error={!!touched.city && !!errors.city}
                        helperText={touched.city && errors.city}
                        sx={{ gridColumn: "span 4" }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Member Number"
                        onBlur={handleBlur}
                        onChange={handleUpdateMemberChange}
                        value={memberToUpdate.memberNumber}
                        name="memberNumber"
                        error={!!touched.memberNumber && !!errors.memberNumber}
                        helperText={touched.memberNumber && errors.memberNumber}
                        sx={{ gridColumn: "span 4" }}
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
                        type="submit"
                      >
                        {isUpdatingMember ? "Saving..." : "Save Member"}
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
                        onClick={() => setMemberToUpdate(null)}
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
                          setMemberToDelete(memberToUpdate);
                          handleOpenModal();
                        }}
                      >
                        {isDeletingMember ? "Deleting..." : "Delete Member"}
                        <DeleteForeverOutlinedIcon sx={{ ml: "10px" }} />
                      </Button>
                    </Box>
                  </form>
                )}
              </Formik>
            </Box>
          </Modal>
        )}

        {memberToDelete && (
          <Modal open={openModal} onClose={handleCloseModal}>
            <Box sx={styleModal}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography variant="h3" color="text.secondary">
                  Are you sure you want to delete this member?
                </Typography>
                <strong color="text.primary" style={{ marginTop: "30px" }}>
                  {memberToDelete.memberNumber}: {memberToDelete.firstname}{" "}
                  {memberToDelete.lastname}
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
                    onClick={handleDeleteMemberSubmit}
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
                    onClick={() => setMemberToDelete(null)}
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

  const renderMembers = () => {
    return (
      <Box m={"10"}>
        <Box
          style={{
            margin: "1%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Header title="Members" subtitle="Easily manage your members" />

          <Button
            sx={{
              backgroundColor: colors.itemColor,
              color: colors.typographyColor,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={() => {
              handleAddMember();
              setMemberToDelete(null);
              setMemberToUpdate(null);
              handleOpenModal();
            }}
          >
            <PersonAddOutlinedIcon sx={{ mr: "10px" }} />
            New Member
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {members.map((member) => (
            <Box
              key={member.memberNumber}
              sx={{ width: 300, height: 200, margin: "1%" }}
            >
              <MemberCard
                key={member.memberNumber}
                membernumber={member.memberNumber}
                firstname={member.firstname}
                lastname={member.lastname}
                email={member.email}
                cell={member.cellphone}
                address={member.streetAddress}
                suburb={member.suburb}
                city={member.city}
                update={() => {
                  setMemberToUpdate(member);
                  setMemberToDelete(null);
                  setMemberToAdd(null);
                  handleOpenModal();
                }}
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
        renderMembers()
      )}

      {renderModal()}
    </React.Fragment>
  );
}

export default Members;
