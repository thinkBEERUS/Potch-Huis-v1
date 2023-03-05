import {
  Alert,
  Box,
  Button,
  TextField,
  Slide,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode, tokens } from "../theme";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import useMediaQuery from "@mui/material/useMediaQuery";
import LockResetIcon from "@mui/icons-material/LockReset";
import LoginIcon from "@mui/icons-material/Login";

const Login = () => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleRegister = () => {
    navigate("/Register");
  };

  const handleForgotPassword = () => {
    setChecked(true);

    setTimeout(() => {
      setChecked(false);
    }, 1500);
  };

  const handleFormSubmit = (values) => {
    const memNum = values.memberNumber;
    const password = values.password;
    const url =
      "https://lostaquabike57.conveyor.cloud/Members/Auth?memberNumber=" +
      memNum +
      "&password=" +
      password;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        document.cookie = "username=Austin;";
        document.cookie = "membernumber=PH00001ADM;";
        console.log(document.cookie);
        navigate("/Dashboard");
      })
      .catch((error) => console.error(error));
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box m="100px">
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
            onSubmit={handleFormSubmit}
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
                    label="Member Number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.memberNumber}
                    name="memberNumber"
                    error={!!touched.memberNumber && !!errors.memberNumber}
                    helperText={touched.memberNumber && errors.memberNumber}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="password"
                    label="Password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    error={!!touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                    sx={{ gridColumn: "span 2" }}
                  />

                  <Box
                    sx={{
                      gridColumn: "span 4",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      direction: "row",
                    }}
                  >
                    <Button
                      sx={{
                        gridColumn: "span 1",
                        backgroundColor: colors.blueAccent[700],
                        color: colors.grey[100],
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding: "10px 20px",
                        marginTop: "3%",
                      }}
                      onClick={handleFormSubmit}
                    >
                      <LoginIcon sx={{ mr: "10px" }} />
                      Login
                    </Button>
                  </Box>
                  <Button
                    sx={{
                      gridColumn: "span 4",
                      backgroundColor: colors.primary[600],
                      color: colors.grey[100],
                      fontSize: "14px",
                      fontWeight: "bold",
                      padding: "10px 20px",
                      margin: "1%",
                    }}
                    onClick={handleRegister}
                  >
                    <AppRegistrationIcon sx={{ mr: "10px" }} />
                    Register
                  </Button>
                  <Button
                    sx={{
                      gridColumn: "span 4",
                      backgroundColor: colors.primary[600],
                      color: colors.grey[100],
                      fontSize: "14px",
                      fontWeight: "bold",
                      padding: "10px 20px",
                      margin: "1%",
                    }}
                    onClick={handleForgotPassword}
                  >
                    <LockResetIcon sx={{ mr: "10px" }} />
                    Forgot Password
                  </Button>
                  <Box
                    sx={{ gridColumn: "span 2" }}
                    style={{
                      display: "flex",
                    }}
                  >
                    <Box sx={{ width: `calc(200px + 100px)` }}>
                      <Slide direction="right" in={checked}>
                        <Alert>Password reset, please check your email.</Alert>
                      </Slide>
                    </Box>
                  </Box>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

const checkoutSchema = yup.object().shape({
  memberNumber: yup.string().required("required"),
  Password: yup.string().required("required"),
});
const initialValues = {
  memberNumber: "",
  Password: "",
};

export default Login;
