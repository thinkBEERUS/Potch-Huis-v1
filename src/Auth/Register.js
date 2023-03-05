import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode, tokens } from "../theme";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

const Register = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const url = "https://smalltanphone68.conveyor.cloud/Members";

  async function postMemberData(values) {
    const memberNumber = "hardcoded";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: values.firstName,
          lastname: values.lastName,
          email: values.email,
          cellphone: values.cell,
          streetAddress: values.streetAddress,
          suburb: values.suburb,
          city: values.city,
          memberNumber: memberNumber,
        }),
      });
      const data = await response;
      console.log(data);
      navigate("/DocumentList");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box m="50px">
          <Box
            sx={{
              gridColumn: "span 4",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h1"
              fontWeight="600"
              color={colors.grey[100]}
              m="5px"
            >
              Potch Huis
            </Typography>
            <Typography
              variant="h3"
              fontWeight="600"
              color={colors.grey[200]}
              m="5px"
            >
              Good times & Lekker People
            </Typography>
          </Box>
          <Formik
            onSubmit={postMemberData}
            initialValues={initialValues}
            validationSchema={checkoutSchema}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
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
                    label="First Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                    name="firstName"
                    error={!!touched.firstName && !!errors.firstName}
                    helperText={touched.firstName && errors.firstName}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Last Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName}
                    name="lastName"
                    error={!!touched.lastName && !!errors.lastName}
                    helperText={touched.lastName && errors.lastName}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Cellphone Number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.cell}
                    name="cell"
                    error={!!touched.cell && !!errors.cell}
                    helperText={touched.cell && errors.cell}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Street Address"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.streetAddress}
                    name="streetAddress"
                    error={!!touched.streetAddress && !!errors.streetAddress}
                    helperText={touched.streetAddress && errors.streetAddress}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Suburb"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.suburb}
                    name="suburb"
                    error={!!touched.suburb && !!errors.suburb}
                    helperText={touched.suburb && errors.suburb}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="City"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.city}
                    name="city"
                    error={!!touched.city && !!errors.city}
                    helperText={touched.city && errors.city}
                    sx={{ gridColumn: "span 2" }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    sx={{
                      backgroundColor: colors.blueAccent[700],
                      color: colors.grey[100],
                      fontSize: "14px",
                      fontWeight: "bold",
                      padding: "10px 20px",
                      margin: "30px",
                    }}
                    type="submit"
                  >
                    <AppRegistrationIcon sx={{ mr: "10px" }} />
                    Register
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("This is a required field!"),
  lastName: yup.string().required("This is a required field!"),
  email: yup
    .string()
    .email("Please enter a valid email address!")
    .required("This is a required field!"),
  cell: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("This is a required field!"),
  streetAddress: yup.string().required("This is a required field!"),
  suburb: yup.string().required("This is a required field!"),
  city: yup.string().required("This is a required field!"),
});
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  cell: "",
  streetAddress: "",
  suburb: "",
  city: "",
};

export default Register;
