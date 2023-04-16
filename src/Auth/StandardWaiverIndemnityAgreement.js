import { Checkbox, Box, Typography } from "@mui/material";
import { useState } from "react";

function StandardWaiverIndemnityAgreement() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      // Call API endpoint or perform any necessary operations here
      // await myApi.post("/waiver-indemnity", formData);
      setIsLoading(false);
      alert("Agreement successfully submitted!");
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(!isChecked);
  };

  return (
    <div>
      <h2>Standard Waiver and Indemnity Agreement</h2>

      <form onSubmit={handleSubmit}>
        <WaiverText />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Checkbox
            checked={isChecked}
            onChange={handleCheckboxChange}
            name="agreement"
            color="primary"
            required
          />
          <Typography
            variant="h5"
            onClick={handleCheckboxChange}
            htmlFor="agreement"
          >
            I have read and agree to the terms
          </Typography>
        </Box>
      </form>
    </div>
  );
}

function WaiverText() {
  return (
    <Box sx={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)", p: "20px" }}>
      <p>
        <strong>STANDARD WAIVER AND INDEMNITY AGREEMENT</strong>
        <br />
        <br />
        <strong>1. EFFECT OF THIS DOCUMENT</strong>
        <br />
        1.1. The provisions of this agreement are drawn to the attention of the
        Indemnifying Party where the Consumer Protection Act 68 of 2008 applies
        to the relationship between Potch Huis 420 NPC and its Club Executives
        (the indemnified party); and
        <br />
        1.2. The "Member" referred to in this document, further as the
        indemnifying party, acknowledges that the effect of this agreement is
        that the indemnifying party may have limited or no recourse against the
        Indemnified Party in the circumstances referred to herein.
        <br />
        <br />
        <strong>2. WAIVER AND INDEMNITY</strong>
        <br />
        2.1. I hereby state that I have chosen to take part in the activity
        being offered by the Indemnified Party (the Activity) of my own free
        will.
        <br />
        2.2. I indemnify the Indemnified Party, its members, directors, and
        employees against all claims, losses, demands, actions, damages, and
        causes of action whatsoever arising directly or indirectly out of my
        acts connected with or arising out of the Activity, whether suffered by
        me or any other third party, and I hold the Indemnified Party harmless
        therefrom.
        <br />
        2.3. I understand that the Activity may be inherently dangerous and may
        create certain risks to persons that can result in property damage and
        serious physical injury. I further understand that the Indemnified
        Party, its Club Executives, and staff will not be responsible for any
        injuries, property damage, or liability that may arise from my
        participation in the Activity. I assume full responsibility for the
        decision, and the consequences thereof, to take part in the Activity.
        <br />
        2.4. I do hereby release, agree to indemnify and hold the Indemnified
        Party, its Club Executives, and staff free and harmless from any and all
        costs, losses, expenses, damages (direct, indirect, consequential, or
        otherwise), claims, suits, causes of action or any other liability or
        responsibility whatsoever, including attorney’s fees and related costs,
        resulting from any injury to any person(s) or damage to property arising
        out of, or which may in any manner be connected with, said Activity as
        provided herein.
        <br />
        <br />
        <strong>3. MINORS</strong>
        <br />
        3.1. The Activity is strictly prohibited for minors (persons under the
        age of 18 and school children in high school and lower).
        <br />
        3.2. Where the Indemnifying Party is a minor (younger than 18 (eighteen)
        years), the Indemnifying Party agrees to be and has been assisted by a
        parent/guardian in agreeing to this agreement, and such parent/guardian
        has consented to the Indemnifying Party participating in the Activity.
        <br />
        3.3. I, the parent/guardian of the Indemnifying Party, understand that
        the Activity is inherently dangerous and may create certain risks to
        persons that can result in property damage and serious physical injury.
        I further understand that the Indemnified Party, its Club Executives,
        and staff will not be responsible for any injuries, property damage, or
        liability that may arise from the participation of the Indemnifying
        Party in the Activity. I assume full responsibility for the decision,
        and the consequences thereof, to allow the Indemnifying Party to take
        part in the Activity.
        <br />
        <strong>4. SEVERABILITY</strong>
        <br />
        4.1. If any provision of this agreement is found to be invalid,
        unenforceable or illegal, such provision shall be severable from the
        remainder of this agreement, which shall remain in full force and
        effect.
        <br />
        <br />
        <strong>5. GOVERNING LAW AND JURISDICTION</strong>
        <br />
        5.1. This agreement shall be governed by and construed in accordance
        with the laws of the Republic of South Africa.
        <br />
        5.2. The parties consent to the exclusive jurisdiction of the courts of
        the Republic of South Africa.
      </p>
    </Box>
  );
}

export default StandardWaiverIndemnityAgreement;
