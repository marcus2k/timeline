import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { COLORS } from "../../utils/colors";
import Info from "./Info";
import ProfileImage from "./ProfileImage";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(5, 0, 10, 0),
  },
  userName: {
    letterSpacing: theme.spacing(0.5),
    fontSize: "25px",
  },
  editProfileButton: {
    color: COLORS.WHITE,
    backgroundColor: COLORS.BLUE,
  },
}));

const Profile = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.auth.user);
  return (
    <>
      <Box className={classes.root}>
        <Grid container spacing={0} align="center" justifyContent="center">
          <Grid item xs={12}>
            <Box paddingBottom={2}>
              <ProfileImage />
            </Box>
            <Box paddingBottom={1}>
              <Typography align="center" className={classes.userName}>
                {user.name && user.name}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Info />
      </Box>
    </>
  );
};

export default Profile;
