import { Box, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import BottomNavBar from "../../components/layout/BottomNavBar";
import NotFoundImage from "../../assets/not-found.png";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: `${window.innerHeight}px`,
  },
  notFoundImage: {
    width: "50%",
    height: "auto",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    "@media (max-width: 480px)": {
      width: "90%",
    },
  },
}));

const NotFound = () => {
  const classes = useStyles();
  const auth = useSelector((state) => state.auth);
  if (auth.isAuthenticated) {
    return (
      <>
        <Box className={classes.root}>
          <img
            className={classes.notFoundImage}
            src={NotFoundImage}
            alt="Not Found"
          />
          <Box padding={2}>
            <Typography variant="h4" align="center">
              Sorry, we couldn&#x27;t find the page
            </Typography>
          </Box>
        </Box>
        <BottomNavBar />
      </>
    );
  } else {
    return <Redirect to="/signin" />;
  }
};

export default NotFound;
