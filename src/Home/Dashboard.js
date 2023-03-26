import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { mockTransactions } from "../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../ed-roh/components/Header";
import StatBox from "../ed-roh/components/StatBox";
import { ResponsivePie } from "@nivo/pie";

const data = [
  {
    id: "Edibles",
    label: "Edibles",
    value: 45,
    color: "hsl(173, 70%, 50%)",
  },
  {
    id: "Jays",
    label: "Jays",
    value: 533,
    color: "hsl(129, 70%, 50%)",
  },
  {
    id: "Buds",
    label: "Buds",
    value: 329,
    color: "hsl(229, 70%, 50%)",
  },
  {
    id: "In-House",
    label: "In-House",
    value: 339,
    color: "hsl(185, 70%, 50%)",
  },
  {
    id: "Snacks etc.",
    label: "Snacks etc.",
    value: 166,
    color: "hsl(153, 70%, 50%)",
  },
];

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        <Box>
          <Button
            sx={{
              backgroundColor: colors.backgroundColor,
              color: colors.typographyColor,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="50px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.backgroundColor}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="41"
            subtitle="Emails Sent"
            progress="0.75"
            increase="+14%"
            icon={<EmailIcon sx={{ fontSize: "26px" }} />}
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.backgroundColor}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="20"
            subtitle="Requests Received"
            progress="1"
            increase="+21%"
            icon={<PointOfSaleIcon sx={{ fontSize: "26px" }} />}
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.backgroundColor}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="4"
            subtitle="New Members"
            progress="0.90"
            increase="+5%"
            icon={<PersonAddIcon sx={{ fontSize: "26px" }} />}
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.backgroundColor}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="17/20"
            subtitle="Deliveries Made"
            progress="0.70"
            increase="+13%"
            icon={<TrafficIcon sx={{ fontSize: "26px" }} />}
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 3"
          backgroundColor={colors.backgroundColor}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.typographyColor}
              >
                Revenue Generated
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.backgroundColor}
              >
                R9 113.00
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.backgroundColor }}
                />
              </IconButton>
            </Box>
          </Box>
          <div style={{ height: "80%" }}>
            <ResponsivePie
              data={data}
              margin={{ top: 100, right: 100, bottom: 100, left: 100 }}
              padding={150}
              innerRadius={0.5}
              padAngle={0.7}
              cornerRadius={3}
              activeOuterRadiusOffset={8}
              borderWidth={1}
              itemHeight="80%"
              borderColor={{
                from: "color",
                modifiers: [["darker", 0.2]],
              }}
              arcLinkLabelsSkipAngle={10}
              arcLinkLabelsTextColor={"white"}
              arcLinkLabelsThickness={2}
              arcLinkLabelsColor={"white"}
              arcLabelsSkipAngle={10}
              arcLabelsTextColor={"white"}
              defs={[
                {
                  id: "dots",
                  type: "patternDots",
                  background: "inherit",
                  color: "rgba(255, 255, 255, 0.3)",
                  size: 4,
                  padding: 1,
                  stagger: true,
                },
                {
                  id: "lines",
                  type: "patternLines",
                  background: "inherit",
                  color: "rgba(255, 255, 255, 0.3)",
                  rotation: -45,
                  lineWidth: 6,
                  spacing: 10,
                },
              ]}
              fill={[
                {
                  match: {
                    id: "ruby",
                  },
                  id: "dots",
                },
                {
                  match: {
                    id: "c",
                  },
                  id: "dots",
                },
                {
                  match: {
                    id: "go",
                  },
                  id: "dots",
                },
                {
                  match: {
                    id: "python",
                  },
                  id: "dots",
                },
                {
                  match: {
                    id: "scala",
                  },
                  id: "lines",
                },
                {
                  match: {
                    id: "lisp",
                  },
                  id: "lines",
                },
                {
                  match: {
                    id: "elixir",
                  },
                  id: "lines",
                },
                {
                  match: {
                    id: "Budsscript",
                  },
                  id: "lines",
                },
              ]}
              legends={[
                {
                  anchor: "bottom",
                  direction: "row",
                  justify: false,
                  translateX: 0,
                  translateY: 56,
                  itemsSpacing: 0,
                  itemWidth: 100,
                  itemHeight: 18,
                  itemTextColor: "#999",
                  itemDirection: "left-to-right",
                  itemOpacity: 1,
                  symbolSize: 18,
                  symbolShape: "circle",
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemTextColor: "#000",
                      },
                    },
                  ],
                },
              ]}
            />
          </div>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={colors.backgroundColor}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.backgroundColor}`}
            colors={colors.typographyColor}
            p="15px"
          >
            <Typography
              color={colors.typographyColor}
              variant="h5"
              fontWeight="600"
            >
              Recent Transactions
            </Typography>
          </Box>
          {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.backgroundColor}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.backgroundColor}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.txId}
                </Typography>
                <Typography color={colors.typographyColor}>
                  {transaction.user}
                </Typography>
              </Box>
              <Box color={colors.typographyColor}>{transaction.date}</Box>
              <Box
                backgroundColor={colors.backgroundColor}
                p="5px 10px"
                borderRadius="4px"
              >
                R{transaction.cost}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
