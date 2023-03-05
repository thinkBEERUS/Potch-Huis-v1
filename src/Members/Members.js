import * as React from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { useMode, tokens } from "../theme";
import MemberCard from "./Card";
import { useState } from "react";
import { useEffect } from "react";

const Members = () => {
  const [members, setMembers] = useState([]);
  const [theme] = useMode();
  const colors = tokens(theme.palette.mode);
  const url = "https://smalltanphone68.conveyor.cloud/Members";

  async function fetchMembers() {
    const response = await fetch(url);
    const members = await response.json();
    return members;
  }

  useEffect(() => {
    fetchMembers().then((members) => {
      setMembers(members);
    });
  }, []);

  console.log(members);

  return (
    <Box m={"10"}>
      <Typography variant="h1" fontWeight="600" color={colors.grey[100]} m="1%">
        Members
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {members.map((members) => (
          <MemberCard
            membernumber={members.memberNumber}
            firstname={members.firstname}
            lastname={members.lastname}
            email={members.email}
            cell={members.cell}
            address={members.streetAddress}
            suburb={members.suburb}
            city={members.city}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Members;
