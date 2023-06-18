import React from "react";
import {
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Paper,
  Alert,
} from "@mui/material";
import { CheckCircleOutline } from "@material-ui/icons";

const StepOne = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "90vw",
      }}
    >
      <Typography variant="h3" textAlign={"center"} gutterBottom>
        Cannabis Consumption
      </Typography>
      <br />
      <Alert severity="info">
        Just some information to help us get you up and going at the Club.
      </Alert>
      <br />
      <Paper elevation={3} sx={{ padding: 1, margin: 1 }}>
        <Typography variant="subtitle1">
          How frequently do you consume cannabis?
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup>
            <Box sx={{ flexDirection: "row" }}>
              <FormControlLabel
                value="daily"
                control={<Radio />}
                label="Daily"
              />
              <FormControlLabel
                value="weekly"
                control={<Radio />}
                label="Weekly"
              />
              <FormControlLabel
                value="monthly"
                control={<Radio />}
                label="Monthly"
              />
              <FormControlLabel
                value="yearly"
                control={<Radio />}
                label="Yearly"
              />
            </Box>
          </RadioGroup>
        </FormControl>
      </Paper>
      <Paper elevation={3} sx={{ padding: 1, margin: 1 }}>
        <FormControl component="fieldset">
          <Typography variant="subtitle1">
            How many grams of cannabis do you consume per week?
          </Typography>
          <RadioGroup>
            <Box sx={{ flexDirection: "row" }}>
              <FormControlLabel value="<1g" control={<Radio />} label="<1g" />
              <FormControlLabel value="1g" control={<Radio />} label="1g" />
              <FormControlLabel value="2g" control={<Radio />} label="2g" />
              <FormControlLabel value="3g" control={<Radio />} label="3g" />
              <FormControlLabel value="4g" control={<Radio />} label="4g" />
              <FormControlLabel value="5g" control={<Radio />} label="5g" />
              <FormControlLabel value=">5g" control={<Radio />} label=">5g" />
              <FormControlLabel value=">10g" control={<Radio />} label=">10g" />
              <FormControlLabel value=">15g" control={<Radio />} label=">15g" />
              <FormControlLabel value=">20g" control={<Radio />} label=">20g" />
            </Box>
          </RadioGroup>
        </FormControl>
      </Paper>
      <Paper elevation={3} sx={{ padding: 1, margin: 1 }}>
        <FormControl component="fieldset">
          <Typography variant="subtitle1">
            How would you rate your tolerance?
          </Typography>
          <RadioGroup>
            <Box sx={{ flexDirection: "row" }}>
              <FormControlLabel value="none" control={<Radio />} label="None" />
              <FormControlLabel value="low" control={<Radio />} label="Low" />
              <FormControlLabel
                value="moderate"
                control={<Radio />}
                label="Moderate"
              />
              <FormControlLabel value="high" control={<Radio />} label="High" />
            </Box>
          </RadioGroup>
        </FormControl>
      </Paper>
      <Paper elevation={3} sx={{ padding: 1, margin: 1 }}>
        <FormControl component="fieldset">
          <Typography variant="subtitle1">
            What is your preferred method of consuming your cannabis?
          </Typography>
          <RadioGroup>
            <Box sx={{ flexDirection: "row" }}>
              <FormControlLabel value="vape" control={<Radio />} label="Vape" />
              <FormControlLabel value="bong" control={<Radio />} label="Bong" />
              <FormControlLabel value="pipe" control={<Radio />} label="Pipe" />
              <FormControlLabel
                value="dabRig"
                control={<Radio />}
                label="Dab Rig"
              />
              <FormControlLabel
                value="joints"
                control={<Radio />}
                label="Joints"
              />
              <FormControlLabel
                value="edibles"
                control={<Radio />}
                label="Edibles"
              />
              <FormControlLabel
                value="blunts"
                control={<Radio />}
                label="Blunts"
              />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
              <FormControlLabel value="all" control={<Radio />} label="All" />
            </Box>
          </RadioGroup>
        </FormControl>
      </Paper>
      <Paper elevation={3} sx={{ padding: 1, margin: 1 }}>
        <FormControl component="fieldset">
          <Typography variant="subtitle1">
            How would you rate your understanding of the cannabis plant?
          </Typography>
          <RadioGroup>
            <Box sx={{ flexDirection: "row" }}>
              <FormControlLabel value="none" control={<Radio />} label="None" />
              <FormControlLabel
                value="moderate"
                control={<Radio />}
                label="Moderate"
              />
              <FormControlLabel
                value="extensive"
                control={<Radio />}
                label="Extensive"
              />
            </Box>
          </RadioGroup>
        </FormControl>
      </Paper>
      <Paper elevation={3} sx={{ padding: 1, margin: 1 }}>
        <FormControl component="fieldset">
          <Typography variant="subtitle1">
            Have you ever grown your own cannabis plants?
          </Typography>
          <RadioGroup>
            <Box sx={{ flexDirection: "row" }}>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </Box>
          </RadioGroup>
        </FormControl>
      </Paper>
    </Box>
  );
};

export default StepOne;
