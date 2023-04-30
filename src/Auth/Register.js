import { Box, Button, Stepper, Step, StepLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode, tokens } from "../theme";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import RegistrationForm from "./RegistrationForm";
import NonDisclosureAgreement from "./NonDisclosureAgreement";
import StandardWaiverIndemnityAgreement from "./StandardWaiverIndemnityAgreement";
import { useState } from "react";

const Register = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const url = process.env.REACT_APP_API_URL + "/Members";

  const steps = ["Indemnity", "Non-Disclosure Agreement", "Registration Form"];
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box m="50px">
          <Stepper activeStep={activeStep}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === 0 && (
            <Box mt="30px" sx={{ display: "flex", flexDirection: "column" }}>
              <Box mt="30px" display="flex" justifyContent="center">
                <StandardWaiverIndemnityAgreement />
              </Box>
              <Box mt="30px" display="flex" justifyContent="flex-end">
                <Button variant="contained" onClick={handleNext}>
                  Next
                </Button>
              </Box>
            </Box>
          )}
          {activeStep === 1 && (
            <Box mt="30px" sx={{ display: "flex", flexDirection: "column" }}>
              <Box mt="30px" display="flex" justifyContent="center">
                <NonDisclosureAgreement />
              </Box>
              <Box mt="30px" display="flex" justifyContent="space-between">
                <Button variant="contained" onClick={handleBack}>
                  Back
                </Button>
                <Button variant="contained" onClick={handleNext}>
                  Next
                </Button>
              </Box>
            </Box>
          )}
          {activeStep === 2 && (
            <Box mt="30px" sx={{ display: "flex", justifyContent: "center" }}>
              <RegistrationForm />
            </Box>
          )}
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Register;
