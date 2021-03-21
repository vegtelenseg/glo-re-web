import { Route } from "react-router-dom";

const routes = [
  {
    name: "rewards",
    path: "/rewards",
  },
  {
    name: "purchases",
    path: "/purchases",
  },
  {
    name: "profile",
    path: "/profile",
  },
];
export const Routes = () => {
  return routes.map((route) => (
    <Route path={route.path} exact>
      <div>{route.name}</div>
    </Route>
  ));
};
