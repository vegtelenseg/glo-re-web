import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import LoyaltyIcon from "@material-ui/icons/Loyalty";
import HistoryIcon from "@material-ui/icons/History";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Rewards } from "./Rewards";
import { Purchases } from "./Purchases";
import { AuthContext } from "../contexts/auth/AuthController";
import { AddPurchaseForm } from "../forms/AddPurchaseForm";
import { Typography } from "@material-ui/core";
import { Profile } from "./Profile";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    height: "inherit",
  },
  tabContent: {
    "& + div": {
      display: "flex",
      alignItems: "center",
    },
  },
}));

export const NavigationBar = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const { auth } = React.useContext(AuthContext);
  const userRole = auth.authenticated ? auth.role : "";
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const getTabContent = (activeTab: number) => {
    switch (activeTab) {
      case 0:
        return userRole !== "Customer" ? <div>Hello</div> : <Rewards />;
      case 1:
        return <Purchases />;
      case 2:
        return userRole === "Admin" ? (
          <AddPurchaseForm />
        ) : (
          <Typography variant='h4' color='primary'>
            <Profile />
          </Typography>
        );
      default:
        return null;
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position='relative' variant='elevation'>
        <Tabs
          value={value}
          onChange={handleChange}
          variant='fullWidth'
          scrollButtons='off'
          aria-label='scrollable prevent tabs example'
        >
          <Tab icon={<LoyaltyIcon />} aria-label='phone' label='Points' />

          <Tab icon={<HistoryIcon />} aria-label='favorite' label='Purchases' />
          {userRole === "Admin" ? (
            <Tab
              icon={<AccountCircleIcon />}
              aria-label='person'
              label='Admin'
            />
          ) : (
            <Tab
              icon={<AccountCircleIcon />}
              aria-label='person'
              label='Profile'
            />
          )}
        </Tabs>
      </AppBar>

      {getTabContent(value)}
    </div>
  );
};
