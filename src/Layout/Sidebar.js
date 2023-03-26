import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import RequestPageOutlinedIcon from "@mui/icons-material/RequestPageOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.itemColor,
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const memberName = document.cookie
  .split("; ")
  .find((row) => row.startsWith("username="))
  ?.split("=")[1];

const memberNumber = document.cookie
  .split("; ")
  .find((row) => row.startsWith("membernumber="))
  ?.split("=")[1];

function Sidebar({ show }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  if (show) {
    return (
      <Box
        id="sidebar"
        sx={{
          "& .pro-sidebar-inner": {
            background: `${colors.backgroundColor} !important`,
          },
          "& .pro-icon-wrapper": {
            backgroundColor: "transparent !important",
          },
          "& .pro-inner-item": {
            padding: "5px 35px 5px 20px !important",
          },
          "& .pro-inner-item:hover": {
            color: `${colors.typographyColor} !important`,
          },
          "& .pro-menu-item.active": {
            color: `${colors.typographyColor} !important`,
          },
        }}
      >
        <ProSidebar
          collapsed={isCollapsed}
          // style={{
          //   height: "auto",
          // }}
        >
          <Menu iconShape="square">
            {/* LOGO AND MENU ICON */}
            <MenuItem
              onClick={() => setIsCollapsed(!isCollapsed)}
              icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
              style={{
                margin: "10px 0 20px 0",
                color: colors.typographyColor,
              }}
            >
              {!isCollapsed && (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  ml="15px"
                >
                  <Typography variant="h3" color={colors.typographyColor}>
                    Potch Huis
                  </Typography>
                  <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                    <MenuOutlinedIcon />
                  </IconButton>
                </Box>
              )}
            </MenuItem>

            {!isCollapsed && (
              <Box mb="25px">
                <Box display="flex" justifyContent="center" alignItems="center">
                  <PersonOutlinedIcon
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50px",
                    }}
                  />
                  {/* <img
                    alt="profile-user"
                    width="100px"
                    height="100px"
                    src={`../../assets/user.png`}
                    style={{ cursor: "pointer", borderRadius: "50%" }}
                  /> */}
                </Box>
                <Box textAlign="center">
                  <Typography
                    variant="h2"
                    color={colors.typographyColor}
                    sx={{ m: "10px 0 0 0" }}
                  >
                    {memberName}
                  </Typography>
                  <Typography variant="h5" color={colors.typographyColor}>
                    {memberNumber}
                  </Typography>
                </Box>
              </Box>
            )}

            <Box paddingLeft={isCollapsed ? undefined : "10%"}>
              <Item
                title="Dashboard"
                to="/Dashboard"
                icon={<HomeOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Stock"
                to="/Stock"
                icon={<InventoryOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Members"
                to="/Members"
                icon={<PeopleOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Menu"
                to="/Menu"
                icon={<MenuBookOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Donations"
                to="/Donations"
                icon={<MonetizationOnOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Confirmed Donations"
                to="/Confirmed"
                icon={<MonetizationOnOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Member Donations"
                to="/MemberDonations"
                icon={<RequestPageOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="FAQ Page"
                to="/faq"
                icon={<HelpOutlineOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </Box>
          </Menu>
        </ProSidebar>
      </Box>
    );
  }
}

export default Sidebar;
