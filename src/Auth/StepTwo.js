import React from "react";
import {
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Box,
  Paper,
  Alert,
} from "@mui/material";
import { CheckCircleOutline } from "@material-ui/icons";

const StepTwo = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "90vw",
      }}
    >
      <Typography variant="h3" textAlign={"center"}>
        Cannabis Preferences
      </Typography>
      <br />
      <Paper elevation={3} sx={{ padding: 1, margin: 1 }}>
        <FormControl component="fieldset">
          <Typography variant="subtitle1">
            What form of cannabis do you prefer?
          </Typography>
          <RadioGroup>
            <Box sx={{ flexDirection: "row" }}>
              <FormControlLabel
                value="CBD flower"
                control={<Radio />}
                label="CBD Flower"
              />
              <FormControlLabel
                value="outdoor"
                control={<Radio />}
                label="Outdoor"
              />
              <FormControlLabel
                value="greenhouse"
                control={<Radio />}
                label="Greenhouse"
              />
              <FormControlLabel
                value="indoor"
                control={<Radio />}
                label="Indoor"
              />
              <FormControlLabel
                value="premium"
                control={<Radio />}
                label="Premium"
              />
              <FormControlLabel
                value="extracts"
                control={<Radio />}
                label="Extracts"
              />
              <FormControlLabel
                value="edibles"
                control={<Radio />}
                label="Edibles"
              />
              <FormControlLabel
                value="medicinal"
                control={<Radio />}
                label="Medicinal Products"
              />
              <FormControlLabel value="all" control={<Radio />} label="All" />
            </Box>
          </RadioGroup>
        </FormControl>
      </Paper>
      <Paper elevation={3} sx={{ padding: 1, margin: 1 }}>
        <FormControl component="fieldset">
          <Typography variant="subtitle1">
            Which strain do you prefer? (Type)
          </Typography>
          <RadioGroup>
            <Box sx={{ flexDirection: "row" }}>
              <FormControlLabel
                value="sativa"
                control={<Radio />}
                label="Sativa"
              />
              <FormControlLabel
                value="indica"
                control={<Radio />}
                label="Indica"
              />
              <FormControlLabel
                value="hybrid5050"
                control={<Radio />}
                label="Hybrid 50/50"
              />
              <FormControlLabel
                value="hybridSativa"
                control={<Radio />}
                label="Sativa Dominant Hybrid"
              />
              <FormControlLabel
                value="hybridIndica"
                control={<Radio />}
                label="Indica Dominant Hybrid"
              />
              <FormControlLabel
                value="allHybrids"
                control={<Radio />}
                label="All Hybrids"
              />
            </Box>
          </RadioGroup>
        </FormControl>
      </Paper>
      <Paper elevation={3} sx={{ padding: 1, margin: 1 }}>
        <FormControl component="fieldset">
          <Typography variant="subtitle1">
            Have you ever eaten edibles?
          </Typography>
          <RadioGroup>
            <Box sx={{ flexDirection: "row" }}>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
              <FormControlLabel
                value="doNotKnow"
                control={<Radio />}
                label="Do Not Know"
              />
            </Box>
          </RadioGroup>
        </FormControl>
      </Paper>
      <Paper elevation={3} sx={{ padding: 1, margin: 1 }}>
        <FormControl component="fieldset">
          <Typography variant="subtitle1">
            Do you have a medical condition you are currently treating with
            cannabis?
          </Typography>
          <RadioGroup>
            <Box sx={{ flexDirection: "row" }}>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </Box>
          </RadioGroup>
        </FormControl>
        <FormControl fullWidth>
          <Typography variant="subtitle1">If yes, please specify:</Typography>
          <TextField multiline rows={4} variant="outlined" />
        </FormControl>
      </Paper>
    </Box>
  );
};

export default StepTwo;
