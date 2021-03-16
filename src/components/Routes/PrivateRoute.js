import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.utils";

function PrivateRoute({ path, exact, children }) {
  const { user } = useAuth();
  // const prueba = JSON.parse(user)

  // const userObject = JSON.parse(JSON.stringify(user))
  // const userObject = JSON.parse(user)
  if (!user.isLogged) {
    console.log(user);
    return <Redirect to="/login" />;
  }

  return (
    <Route path={path} exact={exact}>
      {children}
    </Route>
  );
}

export default PrivateRoute;
