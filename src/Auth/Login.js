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
import { useContext } from "react";
import { AppState } from "../AppState";
import * as React from "react";
import SimpleBackdrop from "../Layout/Backdrop";

const Login = () => {
  const { appState, setAppState } = useContext(AppState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [login, setNewLogin] = useState({
    memberNumber: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewLogin((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRegister = () => {
    navigate("/Register");
  };

  const handleForgotPassword = () => {
    setChecked(true);

    setTimeout(() => {
      setChecked(false);
    }, 2000);
  };

  const handleFormSubmit = async () => {
    setIsLoading(true);
    const memNum = login.memberNumber;
    const password = login.password;
    fetch(
      process.env.REACT_APP_API_URL +
        "/Members/Auth?memberNumber=" +
        memNum +
        "&password=" +
        password,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Member Authenticated") {
          setAppState({
            ...appState,
            memberNumber: data.memberNumber,
          });
          setIsLoading(false);
          navigate("/Dashboard");
        } else {
          console.log(data.error);
        }
      })
      .catch((error) => setError(error));
  };

  const renderLogin = () => {
    const checkoutSchema = yup.object().shape({
      memberNumber: yup.string().required("required"),
      password: yup.string().required("required"),
    });
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
                color={colors.typographyColor}
                m="5px"
              >
                Potch Huis
              </Typography>
              <Typography
                variant="h3"
                fontWeight="600"
                color={colors.typographyColor}
                m="5px"
              >
                Good times & Lekker People
              </Typography>
            </Box>
            <Formik
              onSubmit={handleFormSubmit}
              initialValues={login}
              // validationSchema={checkoutSchema}
            >
              {({ errors, touched, handleBlur }) => (
                <form>
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
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                          backgroundColor: colors.itemColor,
                          color: colors.typographyColor,
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
                    <Box
                      sx={{
                        gridColumn: "span 4",
                        margin: "1%",
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      <Button
                        sx={{
                          gridColumn: "span 1",
                          backgroundColor: colors.backgroundColor,
                          color: colors.typographyColor,
                          fontSize: "14px",
                          fontWeight: "bold",
                          padding: "10px 20px",
                        }}
                        onClick={handleRegister}
                      >
                        <AppRegistrationIcon sx={{ mr: "10px" }} />
                        Register
                      </Button>
                      <Button
                        sx={{
                          gridColumn: "span 1",
                          backgroundColor: colors.backgroundColor,
                          color: colors.typographyColor,
                          fontSize: "14px",
                          fontWeight: "bold",
                          padding: "10px 20px",
                        }}
                        onClick={handleForgotPassword}
                      >
                        <LockResetIcon sx={{ mr: "10px" }} />
                        Forgot Password
                      </Button>
                    </Box>
                    <Box
                      sx={{ gridColumn: "span 2" }}
                      style={{
                        display: "flex",
                      }}
                    >
                      <Box sx={{ width: `calc(200px + 100px)` }}>
                        <Slide direction="right" in={checked}>
                          <Alert>
                            Password reset, please check your email.
                          </Alert>
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

  return (
    <React.Fragment>
      {isLoading ? (
        <SimpleBackdrop />
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        renderLogin()
      )}

      {/* {renderModal()} */}
    </React.Fragment>
  );
};

export default Login;
