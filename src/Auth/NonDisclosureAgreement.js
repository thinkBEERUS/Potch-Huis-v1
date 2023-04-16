import React, { useState } from "react";
import { Checkbox, Box, Typography } from "@mui/material";

const NonDisclosureAgreement = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      // Call API endpoint or perform any necessary operations here
      // await myApi.post("/waiver-indemnity", formData);
      setLoading(false);
      alert("Agreement successfully submitted!");
      setAgreed(true);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error occurred while submitting the agreement</div>;
  }

  if (agreed) {
    return <div>You have agreed to the Non Disclosure Agreement.</div>;
  }

  return (
    <div>
      <h1>Non Disclosure Agreement</h1>
      <p>Please read the following agreement carefully.</p>
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
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <button type="submit" disabled={!isChecked}>
            Agree
          </button>
        </Box>
      </form>
    </div>
  );
};

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
        the indemnified party; and
        <br />
        1.2. _________________________________________________________
        indemnifying party, the effect of this agreement is that the
        indemnifying party may have limited or no recourse against the
        Indemnified Party in the circumstances referred to herein.
        <br />
        <br />
        <strong>2. WAIVER AND INDEMNITY</strong>
        <br />
        2.1. I hereby state that I have chosen to take part in the activity
        being offered by the Indemnified Party the Activity of my own free will.
        <br />
        2.2. I indemnify the indemnified party, its members, directors and
        employees against all claims, losses, liabilities, damages and expenses,
        including legal fees and costs of any kind whatsoever, arising from my
        participation in the Activity, including but not limited to any injury,
        illness or death or damage to property, regardless of whether such
        claims, losses, liabilities, damages and expenses are caused by the
        negligence of the Indemnified Party or otherwise.
        <br />
        2.3. I waive and abandon any claim which I may have at any time against
        the Indemnified Party for any loss, damage, injury or liability of
        whatsoever nature and howsoever arising, including consequential loss or
        damage which I may suffer or sustain as a result of my participation in
        the Activity.
        <br />
        2.4. This indemnity shall be binding upon my heirs, executors,
        administrators and assigns.
        <br />
        <br />
        <strong>3. SEVERABILITY</strong>
        <br />
        3.1. If any provision of this agreement is held to be invalid or
        unenforceable, then such provision shall be severed from this agreement
        and the remainder of this agreement shall continue in full force and
        effect.
        <br />
        <br />
        <strong>4. APPLICABLE LAW</strong>
        <br />
        4.1. This agreement shall be governed and interpreted in accordance with
        the laws of the Republic of South Africa.
      </p>

      <p>
        <strong>Introduction</strong>
        <br />
        1. The parties wish to record the terms and conditions upon which each
        shall disclose confidential information to the other, which terms and
        conditions shall constitute a binding and enforceable agreement between
        the parties. 2. This agreement shall also bind the parties,
        notwithstanding the date of signature hereof, in the event that either
        party shall have disclosed any confidential information to the other
        party prior to date of signature hereof. 3. For the purposes of this
        agreement the party which discloses confidential information shall be
        referred to as the Disclosing Party and the party which receives
        confidential information shall be referred to as the Receiving Party.
      </p>
      <br />
      <p>
        <strong>Definitions</strong>
        <br />
        4. In this agreement, unless the context indicates otherwise:
        <br />
        4.1 "Confidential Information" shall mean any information, whether
        written or oral, of a confidential nature which is disclosed by the
        Disclosing Party to the Receiving Party;
        <br />
        4.2 "Intellectual Property" shall mean all intellectual property rights,
        including patents, trademarks, copyrights, designs, trade secrets and
        any other proprietary rights;
        <br />
        4.3 "Purpose" shall mean the purpose for which the Confidential
        Information is disclosed;
        <br />
        4.4 "Representatives" shall mean the employees, agents, advisors,
        attorneys, accountants and any other person acting on behalf of the
        Receiving Party.
        <br />
        <strong>Confidentiality Obligations</strong>
        <br />
        5. The Receiving Party shall:
        <br />
        5.1 maintain the Confidential Information in strict confidence and not
        disclose or permit the disclosure of any of the Confidential Information
        to any person or entity, except to the extent necessary to achieve the
        Purpose;
        <br />
        5.2 use the Confidential Information solely for the Purpose and for no
        other purpose whatsoever;
        <br />
        5.3 take all reasonable steps to prevent unauthorized access to or use
        of the Confidential Information;
        <br />
        5.4 ensure that its Representatives are aware of the confidential nature
        of the Confidential Information and comply with the provisions of this
        agreement;
        <br />
        5.5 promptly notify the Disclosing Party if it becomes aware of any
        unauthorized disclosure, use or access of the Confidential Information;
        and
        <br />
        5.6 upon written request from the Disclosing Party, promptly return or
        destroy all documents and materials containing or embodying the
        Confidential Information, together with all copies, notes and extracts
        thereof, and confirm such return or destruction in writing.
        <br />
        <strong>Intellectual Property Rights</strong>
        <br />
        6. Nothing in this agreement shall be construed as conferring any rights
        or licenses to the Receiving Party, whether express or implied, in
        respect of any Intellectual Property of the Disclosing Party.
        <br />
        <br />
        <strong>Term and Termination</strong>
        <br />
        7. This agreement shall remain in effect for a period of insert duration
        from the date hereof, unless terminated earlier by either party giving
        written notice to the other.
        <br />
        8. The obligations of confidentiality and non-disclosure contained
        herein shall survive the termination of this agreement for a period of
        insert duration.
        <br />
        <br />
        <strong>General</strong>
        <br />
        9. This agreement constitutes the entire agreement between the parties
        and supersedes all prior negotiations, understandings and agreements
        between the parties, whether oral or written.
        <br />
        10. This agreement may only be amended in writing and signed by both
        parties.
        <br />
        11. This agreement shall be binding upon and enure to the benefit of the
        parties hereto and their respective successors and assigns.
        <br />
        12. This agreement shall be governed by and construed in accordance with
        the laws of insert governing law and the parties hereto submit to the
        exclusive jurisdiction of the courts of insert jurisdiction.
        <strong>Dispute Resolution</strong>
        <br />
        13. Any dispute, controversy or claim arising out of or in connection
        with this agreement, or the breach, termination or invalidity thereof,
        shall be settled through amicable negotiation between the parties
        hereto. If such dispute cannot be resolved within 30 days after the date
        on which either party gives written notice to the other party requesting
        the commencement of negotiations, then either party may refer the
        dispute to mediation. If the dispute is not resolved by mediation within
        60 days of the commencement of such mediation, then either party may
        initiate legal proceedings in accordance with clause 12.
        <br />
        <br />
        <strong>Notices</strong>
        <br />
        14. Any notice or other communication required or permitted to be given
        hereunder shall be in writing and shall be deemed to have been duly
        given and received when delivered personally, or by electronic mail, or
        by registered or certified mail, postage prepaid, addressed to the
        respective parties at the addresses set forth below:
        <br />
        If to the Disclosing Party: insert address and email
        <br />
        If to the Receiving Party: insert address and email
        <br />
        <br />
        <strong>Counterparts</strong>
        <br />
        15. This agreement may be executed in counterparts, each of which shall
        be deemed an original, but all of which together shall constitute one
        and the same instrument.
        <br />
        <br />
        <strong>Signature</strong>
        <br />
        IN WITNESS WHEREOF, the parties hereto have executed this Agreement as
        of the date first written above.
        <br />
        <br />
        Insert signature block for both parties
        <strong>Severability</strong>
        <br />
        If any provision of this agreement is held to be invalid or
        unenforceable, such provision shall be severed from this agreement, and
        the remaining provisions shall remain in full force and effect.
        <br />
        <br />
        <strong>Waiver</strong>
        <br />
        17. No failure or delay by either party in exercising any right, power
        or privilege hereunder shall operate as a waiver thereof, nor shall any
        single or partial exercise thereof preclude any other or further
        exercise thereof or the exercise of any other right, power or privilege.
        <br />
        <br />
        <strong>Headings</strong>
        <br />
        18. The headings contained in this agreement are for convenience of
        reference only and shall not affect the interpretation of this
        agreement.
        <br />
        <br />
        <strong>Assignment</strong>
        <br />
        19. This agreement shall not be assignable by either party without the
        prior written consent of the other party.
        <br />
        <br />
        <strong>Entire Understanding</strong>
        <br />
        20. This agreement represents the entire understanding between the
        parties relating to the subject matter hereof and supersedes all prior
        or contemporaneous negotiations, agreements, representations and
        understandings, whether written or oral, relating to such subject
        matter.
        <br />
        <br />
        <strong>Execution in Counterparts</strong>
        <br />
        21. This agreement may be executed in counterparts, and facsimile or
        electronic signatures shall have the same legal effect as original
        signatures.
        <br />
        <br />
        <strong>Amendment</strong>
        <br />
        22. This agreement may not be amended or modified except by an
        instrument in writing signed by both parties.
        <br />
        <br />
        <strong>Authority to Execute</strong>
        <br />
        23. The undersigned signatories hereby represent and warrant that they
        have full authority to enter into this agreement on behalf of their
        respective parties and that they have taken all necessary action to
        authorize the execution and delivery of this agreement.
        <br />
        <br />
        <strong>IN WITNESS WHEREOF</strong>, the parties have executed this
        agreement as of the date first written above.
        <br />
        <br />
        Insert signature block for both parties
        <strong>Governing Law and Jurisdiction</strong>
        <br />
        This agreement shall be governed by and construed in accordance with the
        laws of insert governing law, without giving effect to any choice of law
        or conflict of law provisions. Any legal action or proceeding arising
        out of or relating to this agreement shall be brought exclusively in the
        courts of insert jurisdiction. Each party hereby irrevocably submits to
        the jurisdiction of such courts and waives any objection it may now or
        hereafter have to the venue or convenience of any such court proceeding.
        <br />
        <br />
        <strong>Counterparts</strong>
        <br />
        25. This agreement may be executed in any number of counterparts, each
        of which shall be deemed an original, but all of which together shall
        constitute one and the same instrument. Delivery of an executed
        counterpart of this agreement by facsimile, email or other electronic
        means shall be as effective as delivery of a manually executed
        counterpart hereof.
        <br />
        <br />
        <strong>Electronic Signature</strong>
        <br />
        26. The parties agree that the electronic signatures, whether digital or
        encrypted, of the parties included in this agreement are intended to
        authenticate this writing and to have the same force and effect as
        manual signatures.
        <br />
        <br />
        <strong>Entire Agreement</strong>
        <br />
        27. This agreement constitutes the entire agreement between the parties
        and supersedes all prior agreements and understandings, whether written
        or oral, relating to the subject matter of this agreement. This
        agreement may not be amended except in writing executed by both parties.
        <br />
        <br />
        <strong>Survival of Terms</strong>
        <br />
        28. The provisions of this agreement that by their nature are intended
        to survive termination or expiration of this agreement, including
        without limitation the provisions concerning confidentiality,
        intellectual property, dispute resolution, governing law and
        jurisdiction, shall survive any such termination or expiration.
        <br />
        <br />
        <strong>Authority to Execute</strong>
        <br />
        29. The undersigned signatories represent and warrant that they have the
        authority to execute this agreement on behalf of their respective
        parties and that they have taken all necessary action to authorize the
        execution and delivery of this agreement.
        <br />
        <br />
        <strong>IN WITNESS WHEREOF</strong>, the parties have executed this
        agreement as of the date first written above.
        <br />
        <br />
        Insert signature block for both parties
        <strong>Notices</strong>
        <br />
        Any notice, request, demand or other communication required or permitted
        under this agreement shall be in writing and shall be deemed to have
        been duly given if delivered personally, sent by registered mail, or
        sent by email, to the following addresses: insert party 1's address
        insert party 2's address Either party may change its address for notices
        by giving written notice to the other party in accordance with this
        section.
        <br />
        <br />
        <strong>Third-Party Beneficiaries</strong>
        <br />
        This agreement is for the sole benefit of the parties hereto and their
        respective successors and permitted assigns and nothing herein, express
        or implied, is intended to or shall confer upon any other person or
        entity any legal or equitable right, benefit or remedy of any nature
        whatsoever under or by reason of this agreement.
        <br />
        <br />
        <strong>Relationship of the Parties</strong>
        <br />
        32. The relationship between the parties is that of independent
        contractors. Nothing contained in this agreement shall be construed as
        creating any agency, partnership, joint venture or other form of joint
        enterprise, employment or fiduciary relationship between the parties,
        and neither party shall have any authority to bind the other in any
        respect.
        <br />
        <br />
        <strong>Force Majeure</strong>
        <br />
        33. Neither party shall be liable for any failure or delay in performing
        its obligations hereunder if such failure or delay is due to
        circumstances beyond its reasonable control, including, without
        limitation, acts of God, war, riot, embargoes, acts of civil or military
        authorities, fire, floods, accidents, strikes or shortages of
        transportation, facilities, fuel, energy, labor or materials a "Force
        Majeure Event". The affected party shall promptly notify the other party
        in writing of the Force Majeure Event and its expected duration and
        shall use reasonable efforts to mitigate the effects of the Force
        Majeure Event.
        <br />
        <br />
        <strong>Execution in Counterparts</strong>
        <br />
        34. This agreement may be executed in counterparts, each of which shall
        be deemed an original, but all of which together shall constitute one
        and the same instrument. Delivery of an executed counterpart of this
        agreement by facsimile, email or other electronic means shall be as
        effective as delivery of a manually executed counterpart hereof.
        <br />
        <br />
        <strong>Amendment</strong>
        <br />
        35. This agreement may not be amended or modified except by a writing
        executed by both parties.
        <br />
        <br />
        <strong>IN WITNESS WHEREOF</strong>, the parties have executed this
        agreement as of the date first written above.
        <br />
        <br />
        Insert signature block for both partie
      </p>
    </Box>
  );
}
export default NonDisclosureAgreement;
