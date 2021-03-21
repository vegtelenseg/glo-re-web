import { createMuiTheme, Theme } from "@material-ui/core/styles";

export const theme: Theme = createMuiTheme({
  palette: {
    primary: {
      main: "#3e98c7",
    },
    secondary: {
      light: "#d5e8f1",
      main: "#00e676",
    },
  },
  typography: {},
  props: {
    MuiButton: {},
    MuiAppBar: {
      color: "primary",
    },
    MuiTabs: {
      indicatorColor: "secondary",
    },
  },
});
