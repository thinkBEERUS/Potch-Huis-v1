import React, { useContext } from "react";
import { createTheme, useTheme } from "@mui/material/styles";
import { Grid, Typography } from "@material-ui/core";
import {
  Store as StoreIcon,
  ShoppingCart as CartIcon,
  LocalFlorist as FlowerIcon,
  LibraryBooks as BlogIcon,
  Person,
  Mail,
} from "@material-ui/icons";
import {
  ChatRounded,
  LogoutOutlined,
  QuestionAnswer,
  ShoppingBag,
} from "@mui/icons-material";
import { ColorModeContext, tokens } from "../theme";
import { AppState } from "../AppState";
import { useNavigate } from "react-router-dom";

const DashboardUser = () => {
  const { appState } = useContext(AppState);
  const memberNumber = appState.memberNumber;
  const theme = useTheme();
  const { toggleColorMode } = useContext(ColorModeContext);
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const handleCardClick = (route) => {
    navigate(route);
  };

  const renderCard = (icon, title, description, route) => {
    return (
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        lg={3}
        onClick={() => handleCardClick(route)}
        style={{
          backgroundColor: colors.backgroundColor,
          padding: "16px",
          textAlign: "center",
          border: `1px solid ${colors.itemColor}`,
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        <div style={{ marginBottom: "16px" }}>{icon}</div>
        <Typography variant="h6" style={{ marginBottom: "8px" }}>
          {title}
        </Typography>
        <Typography variant="body1">{description}</Typography>
      </Grid>
    );
  };

  return (
    <Grid style={{ padding: "5vw", width: "100%" }} container spacing={3}>
      <Grid item xs={12}>
        <Typography
          variant="h6"
          style={{ marginBottom: "24px", textAlign: "center" }}
        >
          Welcome back, {memberNumber}
        </Typography>
      </Grid>
      <Grid item container spacing={2}>
        {renderCard(
          <StoreIcon fontSize="large" />,
          "Bud Bar",
          "Browse and request some flower.",
          "/Menu"
        )}
        {renderCard(
          <FlowerIcon fontSize="large" />,
          "Flower Gallery",
          "Explore a collection of beautiful flowers and interesting facts.",
          "/shop"
        )}
        {renderCard(
          <ChatRounded fontSize="large" />,
          "Reports",
          "View reports generated specifically for you.",
          "/Reporting"
        )}
        {renderCard(
          <QuestionAnswer fontSize="large" />,
          "FAQ's",
          "View previously asked questions and ask some of your own.",
          "/faq"
        )}
        {renderCard(
          <BlogIcon fontSize="large" />,
          "News & Events",
          "Read our latest blog posts and RSVP for club events.",
          "/shop"
        )}
        {renderCard(
          <Person fontSize="large" />,
          "Account",
          "Manage your account settings.",
          "/shop"
        )}
        {renderCard(
          <Mail fontSize="large" />,
          "Contact",
          "Get in touch with our customer support.",
          "/shop"
        )}
        {renderCard(
          <LogoutOutlined fontSize="large" />,
          "Logout",
          "We hope to see you again soon.",
          "/Login"
        )}
      </Grid>
    </Grid>
  );
};

export default DashboardUser;
