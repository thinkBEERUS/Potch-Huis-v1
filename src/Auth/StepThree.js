import React from "react";
import {
  Typography,
  FormControlLabel,
  Checkbox,
  Link,
  Box,
  Paper,
  Alert,
  Button,
} from "@mui/material";
import { PagesOutlined } from "@mui/icons-material";

const StepThree = () => {
  const [acceptTerms, setAcceptTerms] = React.useState(false);

  const handleAcceptTermsChange = (event) => {
    setAcceptTerms(event.target.checked);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "90vw",
      }}
    >
      <Typography variant="h3" textAlign={"center"}>
        Terms and Conditions
      </Typography>
      <br />
      <Alert severity="info">
        <strong>
          Attached below are links to the current Cannabis Bill, as well as the
          Constitutional Court ruling of 2018. By clicking Accept, you agree
          that you have read through these documents and understand their
          purpose in regards to being a member of a Dagga Private Club. The
          following is brought to your attention in regard to the Bill and
          Ruling:
        </strong>
      </Alert>
      <ul>
        <li>To consume cannabis, you must be 18 years or older.</li>
        <li>
          Cannabis may be consumed by an adult in a private space, whether that
          is in the comfort of their own home or within the space that a dagga
          private club provides that is not open to the public or minors.
        </li>
        <li>
          An adult may share up to 100 grams of cannabis with another adult; the
          club may share its cannabis with its members in the same regard. Any
          cannabis a member receives at the club is considered free and shared
          freely.
        </li>
        <li>
          The club is run by the non-profit company Potch Huis 420 NPC with
          registration number 2021/657829/08, and any funds received from
          members of the club are considered donations. The club will use these
          donations to cover the running costs of the club, including but not
          limited to wages, rent, electricity, and water.
        </li>
        <li>
          An adult may possess up to 600 grams of dried cannabis, 1.2kg for
          households of 2 or more; 4 flowering plants, 8 for households of 2 or
          more, and an infinite amount of seedlings. If a club member grows more
          than is legal to possess, he or she may donate their extra cannabis to
          the club to be shared amongst the club membership. There are no legal
          guidelines yet for how much cannabis a cannabis club may possess.
        </li>
        <li>It is illegal to buy or sell cannabis.</li>
        <li>
          Members who choose to donate are given Club Points which may be
          redeemed at the club for various services offered at the club.
        </li>
        <li>
          The club is closed on Saturdays and remains private property at all
          times whether open or not, right of admission fully reserved.
        </li>
        <li>
          There still remains a risk in running and belonging to a Dagga Private
          Club.
        </li>
      </ul>
      <Alert severity="warning">
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "70vw",
          }}
        >
          <Typography variant="subtitle1">
            Constitutional Court Ruling of 2018:
          </Typography>
          <Button
            href="http://www.saflii.org/za/cases/ZACC/2018/30.html"
            target="_blank"
            rel="noopener"
            variant="contained"
            color="primary"
            endIcon={<PagesOutlined />}
          >
            Court Ruling
          </Button>
        </Box>
      </Alert>
      <Alert severity="warning">
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "70vw",
          }}
        >
          <Typography variant="subtitle1">
            Cannabis for Private Purposes Bill:
          </Typography>
          <Button
            href="https://www.parliament.gov.za/storage/app/media/Bills/2020/B19_2020_Cannabis_for_Private_Purpos"
            target="_blank"
            rel="noopener"
            variant="contained"
            color="primary"
            endIcon={<PagesOutlined />}
          >
            Cannabis Bill
          </Button>
        </Box>
      </Alert>
      <br />
      <FormControlLabel
        control={
          <Checkbox
            checked={acceptTerms}
            onChange={handleAcceptTermsChange}
            color="primary"
            name="acceptTerms"
          />
        }
        label="I have read and understood the terms and conditions."
      />
    </Box>
  );
};

export default StepThree;
