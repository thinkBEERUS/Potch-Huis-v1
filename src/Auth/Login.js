import {
  Alert,
  Box,
  Button,
  TextField,
  Slide,
  Typography,
  Paper,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Field, Formik, Form, ErrorMessage } from "formik";
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
import Logo from "../assets/logo.jpg";

const Login = () => {
  const { appState, setAppState } = useContext(AppState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
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
    }, 2000);
  };

  const handleFormSubmit = async (values) => {
    setIsLoading(true);

    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL +
          "/Members/Auth?memberNumber=" +
          values.memberNumber +
          "&password=" +
          values.password,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

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
    } catch (error) {
      setError(error);
    }
  };

  const renderLogin = () => {
    const checkoutSchema = yup.object().shape({
      memberNumber: yup.string().required("Please enter your member number"),
      password: yup.string().required("Please enter your password"),
    });

    return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bgcolor={colors.backgroundColor}
          >
            <Paper
              elevation={3}
              sx={{ padding: 4, maxWidth: 800, width: "80%" }}
            >
              <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="center"
              >
                <Grid item xs={2}>
                  <Box display="flex" justifyContent="center">
                    <img
                      src={Logo}
                      alt="Logo"
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                        borderRadius: 10,
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    color={colors.typographyColor}
                    align="center"
                  >
                    Good times & Lekker People
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={{
                      memberNumber: "",
                      password: "",
                    }}
                    validationSchema={checkoutSchema}
                  >
                    {({ errors, touched, handleBlur, handleChange }) => (
                      <Form>
                        <Box
                          display="grid"
                          mb={4}
                          sx={{
                            "& > div": {
                              gridColumn: { xs: "span 4", md: "span 2" },
                            },
                          }}
                        >
                          <Field
                            as={TextField}
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Member Number"
                            name="memberNumber"
                            error={
                              touched.memberNumber && !!errors.memberNumber
                            }
                            helperText={<ErrorMessage name="memberNumber" />}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <Field
                            as={TextField}
                            fullWidth
                            variant="filled"
                            type="password"
                            label="Password"
                            name="password"
                            error={touched.password && !!errors.password}
                            helperText={<ErrorMessage name="password" />}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <br />
                          <br />
                          <br />
                          <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                          >
                            <Button
                              variant="contained"
                              color="primary"
                              type="submit"
                              style={{
                                maxWidth: "100%",
                                height: "auto",
                                borderRadius: 10,
                              }}
                            >
                              <LoginIcon sx={{ mr: 1 }} />
                              Login
                            </Button>
                          </Box>

                          <Slide direction="right" in={checked}>
                            <Box mt={2}>
                              <Alert severity="info">
                                Password reset, please check your email.
                              </Alert>
                            </Box>
                          </Slide>

                          <Box
                            display="flex"
                            flexDirection="column-reverse"
                            width="100%"
                            alignItems="center"
                            mt={2}
                          >
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={handleRegister}
                              style={{
                                minWidth: "10vw",
                                height: "auto",
                                borderRadius: 10,
                              }}
                            >
                              <AppRegistrationIcon sx={{ mr: 1 }} />
                              Register
                            </Button>
                            <br />
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={handleForgotPassword}
                              style={{
                                minWidth: "10vw",
                                height: "auto",
                                borderRadius: 10,
                              }}
                            >
                              <LockResetIcon sx={{ mr: 1 }} />
                              Forgot Password
                            </Button>
                          </Box>
                        </Box>
                      </Form>
                    )}
                  </Formik>
                </Grid>
              </Grid>
            </Paper>
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
