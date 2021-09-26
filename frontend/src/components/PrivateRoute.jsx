import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import BottomNavBar from "./layout/BottomNavBar";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={(props) =>
        auth.isAuthenticated ? (
          <>
            <Component {...props} />
            <BottomNavBar />
          </>
        ) : (
          <Redirect to="/landing" />
        )
      }
    />
  );
};

export default PrivateRoute;
