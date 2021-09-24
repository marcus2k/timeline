import React from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import NoDataImage from "../assets/no_data.png";

const useStyles = makeStyles((theme) => ({
  image: {
    width: "60%",
    height: "auto",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

const NoneAvailable = ({ text }) => {
  const classes = useStyles();
  return (
    <>
      <Grid item xs={12}>
        <Box padding={3}>
          <img className={classes.image} src={NoDataImage} alt={text} />
        </Box>
        <Typography variant="h4" align="center">
          {text}
        </Typography>
      </Grid>
    </>
  );
};

export default NoneAvailable;
