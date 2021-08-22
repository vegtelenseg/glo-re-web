import React from "react";
import { NavigationBar } from "./components/NavigationBar";
import { Login } from "./components/Login";
import { createBrowserHistory } from "history";

import { AuthContext } from "./contexts/auth/AuthController";
import { Switch, Route, Redirect } from "react-router-dom";
import { Router } from "react-router";

function App() {
  const { auth } = React.useContext(AuthContext);
  const history = createBrowserHistory();
  return (
    <Router history={history}>
      <Switch>
        <Route
          path='/'
          exact
          component={
            auth.authenticated
              ? NavigationBar
              : () => (
                  <Redirect
                    to={{
                      pathname: "/login",
                    }}
                  />
                )
          }
        />
        <Route path='/login' exact component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
