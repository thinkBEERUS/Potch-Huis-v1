import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import pdf from "../Assets/MembershipFiles/PH-Membership-Files.zip";
import { Alert, Box, Button, Slide, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode, tokens } from "../theme";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import useMediaQuery from "@mui/material/useMediaQuery";
import LockResetIcon from "@mui/icons-material/LockReset";
const fileTypes = ["PDF"];

const DocumentList = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);

  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };

  const handleSave = () => {
    setChecked(true);
    setTimeout(() => {
      setChecked(false);
    }, 2500);
    navigate("/Password");
  };

  function downloadPdfFiles() {
    const link = document.createElement("a");
    link.href = pdf;
    link.download = "PH-Membership-Files.zip";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box m="100px">
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": {
                gridColumn: isNonMobile ? undefined : "span 4",
              },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
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
              <Typography
                variant="h3"
                fontWeight="600"
                color={colors.typographyColor}
                m="5px"
              >
                Please download and complete the following documents:
                <ol>
                  <li>Confidentiality & NDA</li>
                  <li>Membership Form</li>
                  <li>Standard Waiver & Indemnity Agreement</li>
                  <li>Social Club Constitution</li>
                </ol>
              </Typography>
            </Box>

            <Button
              sx={{
                gridColumn: "span 4",
                backgroundColor: colors.itemColor,
                color: colors.typographyColor,
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
                margin: "0.5%",
              }}
              onClick={downloadPdfFiles}
            >
              <AppRegistrationIcon sx={{ mr: "10px" }} />
              Download Files
            </Button>
            <FileUploader
              handleChange={handleChange}
              name="file"
              types={fileTypes}
            />
            <Button
              sx={{
                gridColumn: "span 4",
                backgroundColor: colors.itemColor,
                color: colors.typographyColor,
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
                margin: "1%",
              }}
              onClick={handleSave}
            >
              <LockResetIcon sx={{ mr: "10px" }} />
              Save
            </Button>
            <Box
              sx={{ gridColumn: "span 2" }}
              style={{
                display: "flex",
                alignItems: "flex-start",
              }}
            >
              <Box sx={{ width: `calc(250px + 150px)` }}>
                <Slide direction="right" in={checked}>
                  <Alert>
                    Thank you, your files have been sent for review.
                  </Alert>
                </Slide>
              </Box>
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default DocumentList;
