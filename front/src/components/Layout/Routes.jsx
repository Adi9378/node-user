import React from "react";
import { Switch, Route } from "react-router-dom";
import Account from "../../pages/Account";
import Home from "../../pages/Home";
import Login from "../../pages/Account/Login";
import PrivateRoute from "./PrivateRoute";
import Subscribe from "../../pages/Account/Subscribe";

const Routes = () => {
  return (
    <div>
      <Switch>
        <Route path="/subscribe" component={Subscribe} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/user">
          <Account />
        </PrivateRoute>
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  );
};

export default Routes;
