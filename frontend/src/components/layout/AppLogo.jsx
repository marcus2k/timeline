import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import secondaryLogo from "../../assets/logo.png";

const useStyles = makeStyles(() => ({
  logoImage: {
    width: "30%",
    height: "auto",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    "@media (max-width: 480px)": {
      width: "50%",
    },
  },
}));

const AppLogo = () => {
  const classes = useStyles();
  return <img className={classes.logoImage} src={secondaryLogo} alt="logo" />;
};

export default AppLogo;
