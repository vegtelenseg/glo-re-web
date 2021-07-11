import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import LoyaltyIcon from "@material-ui/icons/Loyalty";
import HistoryIcon from "@material-ui/icons/History";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Rewards } from "./Rewards";
import { Purchases } from "./Purchases";
import { AuthContext } from "../contexts/auth/AuthController";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `scrollable-prevent-tab-${index}`,
    "aria-controls": `scrollable-prevent-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export const NavigationBar = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const { auth } = React.useContext(AuthContext);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position='fixed' variant='elevation'>
        <Tabs
          value={value}
          onChange={handleChange}
          variant='fullWidth'
          scrollButtons='off'
          aria-label='scrollable prevent tabs example'
        >
          <Tab
            icon={<LoyaltyIcon />}
            aria-label='phone'
            {...a11yProps(0)}
            label='Points'
          />

          <Tab
            icon={<HistoryIcon />}
            aria-label='favorite'
            {...a11yProps(1)}
            label='Purchases'
          />
          <Tab
            icon={<AccountCircleIcon />}
            aria-label='person'
            {...a11yProps(2)}
            label='Profile'
          />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        <Rewards />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Purchases />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div>
          {auth.authenticated && auth.role === "ADMIN"
            ? "Hello Admin"
            : "Hello Customer"}
        </div>
      </TabPanel>
    </div>
  );
};
