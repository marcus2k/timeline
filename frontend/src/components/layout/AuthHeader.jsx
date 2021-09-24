import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { COLORS } from "../../utils/colors";

const useStyles = makeStyles((theme) => ({
  authHeader: {
    marginBottom: theme.spacing(3),
    fontSize: "30pt",
    textTransform: "uppercase",
    letterSpacing: "5px",
    color: COLORS.PRIMARY_PURPLE,
    fontWeight: 600,
  },
}));

const AuthHeader = ({ text }) => {
  const classes = useStyles();
  return <Typography className={classes.authHeader}>{text}</Typography>;
};

export default AuthHeader;
