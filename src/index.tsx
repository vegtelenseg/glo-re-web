import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthController } from "./contexts/auth/AuthController";
import { ThemeProvider } from "@material-ui/core";
import { theme } from "./themes/theme";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apolloClient";

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider
      // @ts-ignore
      client={client}
    >
      <ThemeProvider theme={theme}>
        <AuthController>
          <App />
        </AuthController>
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
