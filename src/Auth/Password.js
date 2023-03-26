import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode, tokens } from "../theme";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { useState } from "react";

const Password = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const [test, setTest] = useState("");

  async function get() {
    // const memNumUrl = "https://localhost:7287/Members/MemberNumber";
    const memNumUrl =
      "https://rightgreenwave11.conveyor.cloud/Members/MemberNumber";

    const response = await fetch(memNumUrl).then((response) => response.json());
    const memberNumber = `PH${response}`;
    setTest(memberNumber);
  }

  get();

  const url = "https://rightgreenwave11.conveyor.cloud/Members";
  //   const url = "https://localhost:7287/Members/Auth";

  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const handleConfirm = () => {
    navigate("/Login");
  };

  async function postMemberData(values) {
    const memNumUrl = "https://localhost:7287/Members/MemberNumber";
    const response = await fetch(memNumUrl).then((response) => response.json());
    const memberNumber = `PH${response}`;
    const postValues = `?password=${values.password}&memberNumber=${memberNumber}`;
    try {
      const response = await fetch(url + postValues, {
        method: "POST",
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        },
      });
      handleConfirm();
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
              gridColumn: "span 3",
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
                  gridTemplateColumns="repeat(1, minmax(0, 1fr))"
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 1",
                    },
                  }}
                >
                  <Typography
                    variant="h4"
                    fontWeight="600"
                    color={colors.typographyColor}
                    mt="50px"
                  >
                    Your member number is {test}, please choose a password.
                  </Typography>
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
                    sx={{ gridColumn: "span 1" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="password"
                    label="Confirm Password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.confirmPassword}
                    name="confirmPassword"
                    error={
                      !!touched.confirmPassword && !!errors.confirmPassword
                    }
                    helperText={
                      touched.confirmPassword && errors.confirmPassword
                    }
                    sx={{ gridColumn: "span 1" }}
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
                      backgroundColor: colors.itemColor,
                      color: colors.typographyColor,
                      fontSize: "14px",
                      fontWeight: "bold",
                      padding: "10px 20px",
                      margin: "30px",
                    }}
                    type="submit"
                  >
                    <AppRegistrationIcon sx={{ mr: "10px" }} />
                    Save
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

const checkoutSchema = yup.object().shape({
  password: yup.string().required("This is a required field!"),
  confirmPassword: yup.string().required("This is a required field!"),
});

export default Password;
