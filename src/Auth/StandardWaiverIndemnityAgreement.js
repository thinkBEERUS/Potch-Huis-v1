import React, { useState } from "react";
import {
  Box,
  Typography,
  Dialog,
  DialogContent,
  Switch,
  FormControlLabel,
  Button,
  Icon,
  Alert,
  ListItemIcon,
  Paper,
} from "@mui/material";
import { InfoSharp, CheckCircleOutline } from "@mui/icons-material";
import {
  FormatListBulletedOutlined,
  InfoRounded,
  KeyboardArrowRightOutlined,
} from "@material-ui/icons";

const StandardWaiverIndemnityAgreement = () => {
  const [open, setOpen] = useState(true);
  const [switchChecked, setSwitchChecked] = useState(false);

  const handleClose = () => {
    if (switchChecked) {
      setOpen(false);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box
              sx={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                flexWrap: "nowrap",
              }}
            >
              <Alert severity="info">
                Disclaimer <br />
                <strong>
                  {" "}
                  Before continuing, please read and understand the following!
                </strong>
              </Alert>
            </Box>
            <br />
            <Box sx={{ flexDirection: "row" }}>
              <Typography variant="body2" gutterBottom>
                <Icon fontSize="medium">
                  <KeyboardArrowRightOutlined />
                </Icon>{" "}
                The <strong>dealing</strong> of cannabis remains{" "}
                <strong>illegal</strong>.
              </Typography>
              <br />
              <Typography variant="body2" gutterBottom>
                <Icon fontSize="medium">
                  <KeyboardArrowRightOutlined />
                </Icon>{" "}
                Running a Dagga Private Club and being a member carries{" "}
                <strong>certain risks</strong>.
              </Typography>
              <br />
              <Typography variant="body2" gutterBottom>
                <Icon fontSize="medium">
                  <KeyboardArrowRightOutlined />
                </Icon>{" "}
                <strong>
                  By proceeding with this membership, you acknowledge and accept
                  these risks
                </strong>
                .
              </Typography>
              <br />
              <Typography variant="body2" gutterBottom>
                <Icon fontSize="medium">
                  <KeyboardArrowRightOutlined />
                </Icon>{" "}
                All information shared here will be kept{" "}
                <strong>private</strong>.
              </Typography>
            </Box>
            <br />
            <FormControlLabel
              sx={{ justifyContent: "space-evenly" }}
              control={
                <Switch
                  checked={switchChecked}
                  onChange={(event) => [setSwitchChecked(event.target.checked)]}
                  color="primary"
                />
              }
              label="I have read and I understand this disclaimer"
            />
            <br />
            <Button
              variant="contained"
              color="primary"
              style={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: 10,
              }}
              onClick={handleClose}
              disabled={!switchChecked}
            >
              Continue
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h3" textAlign={"center"} gutterBottom>
          STANDARD WAIVER AND INDEMNITY AGREEMENT
        </Typography>
        <br />
        <Paper elevation={0} sx={{ padding: 1, margin: 1 }}>
          <Typography variant="h4" paragraph>
            1. EFFECT OF THIS DOCUMENT
          </Typography>
          <Typography variant="body2" paragraph>
            The provisions of this agreement are drawn to the attention of the
            Indemnifying Party where the Consumer Protection Act 68 of 2008
            applies to the relationship between Potch Huis 420 NPC and its Club
            Executives, staff, and fellow club members (the Indemnified Party);
            and the potential new member of the club (The Indemnifying Party),
            the effect of this agreement is that the Indemnifying Party may have
            limited or no recourse against the Indemnified Party in the
            circumstances referred to herein.
          </Typography>
        </Paper>
        <Paper elevation={0} sx={{ padding: 1, margin: 1 }}>
          <Typography variant="h4" paragraph>
            2. WAIVER AND INDEMNITY
          </Typography>
          <Typography variant="body2" paragraph>
            I (The Indemnifying Party) hereby state that I have chosen to take
            part in the activity being offered (hereafter referred to as The
            Activity) by Potch Huis 420 NPC of my own free will.
          </Typography>
          <Typography variant="body2" paragraph>
            I indemnify Potch Huis 420 NPC, its directors, executives, staff,
            and fellow members (hereafter referred to as the Indemnified Party),
            against all claims, losses, demands, actions, damages, and causes of
            action whatsoever arising directly or indirectly out of my acts
            connected with or arising out of partaking in The Activity, whether
            suffered by me or any other third party, and I hold the Indemnified
            Party harmless therefrom.
          </Typography>
          <Typography variant="body2" paragraph>
            I understand that the Activity may be inherently dangerous and may
            create certain risks to persons that can result in property damage
            and serious physical injury. I further understand that the
            Indemnified Party, its club executive and staff will not be
            responsible for any injuries, property damage, or liability that may
            arise from my participation in The Activity. I assume full
            responsibility for the decision and the consequences thereof to take
            part in The Activity.
          </Typography>
          <Typography variant="body2" paragraph>
            I do hereby release, agree to indemnify, and hold the Indemnified
            Party, its club executives and staff free and harmless from any and
            all costs, losses, expenses, damages (direct, indirect,
            consequential, or otherwise), claims, suits, causes of action, or
            any other liability or responsibility whatsoever, including
            attorney’s fees and related costs, resulting from any event, injury
            to any person(s), or damage to property arising out of, or which may
            in any manner be connected with, The Activity as provided herein.
          </Typography>
        </Paper>
        <Paper elevation={0} sx={{ padding: 1, margin: 1 }}>
          <Typography variant="h4" paragraph>
            3. MINORS
          </Typography>
          <Typography variant="body2" paragraph>
            The Activity is strictly prohibited for minors (persons under the
            age of 18 and school children in high school and lower).
          </Typography>
          <Typography variant="body2" paragraph>
            Where the Indemnifying Party is a minor (younger than 18 (eighteen)
            years), the Indemnifying Party agrees to be and has been assisted by
            a parent/guardian in agreeing to this agreement, and such
            parent/guardian has consented to the Indemnifying Party
            participating in the Activity.
          </Typography>
          <Typography variant="body2" paragraph>
            I, the parent/guardian of the Indemnifying Party, understand that
            the Activity is inherently dangerous and may create certain risks to
            persons that can result in property damage and serious physical
            injury. I further understand that the Indemnified Party, its club
            executives and staff, will not be responsible for any injuries,
            property damage, or liability that may arise from The Activity. I
            further assume full responsibility for the decision and the
            consequences thereof to allow my child/the minor (the Indemnifying
            Party) to take part in the Activity as set forth herein.
          </Typography>
          <Typography variant="body2" paragraph>
            I do hereby release, agree to indemnify, and hold the Indemnified
            Party, club executives and staff, free and harmless from any and all
            costs, losses, expenses, damages, claims, suits, causes of action,
            or any other liability or responsibility whatsoever, in law or in
            equity, including attorney’s fees and related costs, resulting from
            any event, injury to any person(s), or damage to property arising
            out of, or which may in any manner be connected with, The Activity
            and my child’s (the Indemnifying Party) participation therein.
          </Typography>
        </Paper>
        <Paper elevation={0} sx={{ padding: 1, margin: 1 }}>
          <Typography variant="h4" paragraph>
            4. ACCEPTANCE
          </Typography>
          <Typography variant="body2" paragraph>
            By clicking accept to this agreement, you confirm that you have read
            and understood the meaning and effect of this agreement and that you
            agree to be bound by it from the date of acceptance. If you do not
            understand the meaning or effect of any of the clauses contained in
            this agreement, you must request that it be explained to you before
            accepting and concluding this agreement, by contacting the club
            executives and staff.
          </Typography>
        </Paper>
        <Paper elevation={0} sx={{ padding: 1, margin: 1 }}>
          <Typography variant="h4" paragraph>
            5. GENERAL
          </Typography>
          <Typography variant="body2" paragraph>
            I agree that this agreement may be treated as a defense to any
            action or proceeding that may be brought, instituted or taken by
            anyone against the Indemnified Party, club executives and staff, for
            any event, injuries and/or damages sustained as a result of The
            Activity as described herein.
          </Typography>
          <Typography variant="body2" paragraph>
            I have read this agreement and understand all of its terms, and I
            have executed this instrument voluntarily and with full knowledge of
            its significance.
          </Typography>
          <Typography variant="body2" paragraph>
            I confirm that I fully appreciate the risks that I may be exposed to
            during my participation in The Activity and that I voluntarily
            accept such risks.
          </Typography>
        </Paper>
      </Box>
    </>
  );
};

export default StandardWaiverIndemnityAgreement;
