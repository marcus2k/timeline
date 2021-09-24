import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { COLORS } from "../../utils/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  authHeader: {
    fontSize: "25pt",
    textTransform: "uppercase",
    letterSpacing: "1.5px",
    color: COLORS.PRIMARY_PURPLE,
    fontWeight: 600,
    textAlign: "center",
  },
}));

const PrivatePageHeader = ({ text, icon }) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        {icon && <div className={classes.icon}>{icon}</div>}
        <Typography className={classes.authHeader}>{text}</Typography>
      </div>
    </>
  );
};

export default PrivatePageHeader;
