import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import "./Backdrop.css";
import { Typography } from "@mui/material";

export default function SimpleBackdrop() {
  const [showBackdrop, setShowBackdrop] = React.useState(true);

  const handleHide = () => {
    setShowBackdrop(false);
  };
  const handleShow = () => {
    setShowBackdrop(true);
  };

  return (
    <React.Fragment>
      <Backdrop
        sx={{
          backgroundColor: "primary.main",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={showBackdrop}
      >
        <Typography color="text.primary" className="shrink-grow fixedLogo">
          Loading...
        </Typography>
        <Box sx={{ width: "40%" }}>
          <LinearProgress className="linearLogo" />
        </Box>
      </Backdrop>
    </React.Fragment>
  );
}
