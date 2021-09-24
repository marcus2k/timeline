import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import BottomNavBar from "./layout/BottomNavBar";
import Loading from "./Loading";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={(props) =>
        auth.loading ? (
          <Loading />
        ) : auth.isAuthenticated ? (
          <>
            {/* <TopNavBar /> */}
            <Component {...props} />
            <BottomNavBar />
          </>
        ) : (
          <Redirect to="/signin" />
        )
      }
    />
  );
};

export default PrivateRoute;
