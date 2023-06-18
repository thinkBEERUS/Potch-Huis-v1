import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { AccessTime } from "@mui/icons-material";

const ComingSoonPage = () => {
  const [countdown, setCountdown] = useState("");
  const releaseDate = new Date("2023-07-01");

  useEffect(() => {
    const calculateCountdown = () => {
      const currentTime = new Date().getTime();
      const distance = releaseDate - currentTime;

      if (distance < 0) {
        setCountdown("0d 0h 0m 0s");
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    };

    const countdownInterval = setInterval(calculateCountdown, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  return (
    <Box
      sx={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AccessTime sx={{ fontSize: 64 }} />
      <br />
      <Typography variant="h4" component="h1" gutterBottom>
        Coming Soon!
      </Typography>
      <br />
      <Box
        sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
      >
        <Typography variant="h5" component="p">
          We are working hard to bring you something awesome!
        </Typography>
        <br />
        <Typography variant="h6" component="p">
          {countdown}
        </Typography>
      </Box>
    </Box>
  );
};

export default ComingSoonPage;
