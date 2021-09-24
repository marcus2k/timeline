import { Grid, makeStyles, Typography, Box, Button } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import FadeIn from "react-fade-in";
import { googleAnalytics } from "../../services/firebase";
import { Redirect, useHistory } from "react-router-dom";
import aroundTheWorldImage from "../../assets/around-the-world.png";
import friendshipImage from "../../assets/friendship.png";
import momentsImage from "../../assets/moments.png";
import AppLogo from "../../components/layout/AppLogo";
import { logEvent } from "@firebase/analytics";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    fontFamily: "Lato",
  },
  header: {
    fontSize: "30pt",
    letterSpacing: "8px",
    textAlign: "center",
    margin: "15px 0",
    fontWeight: 500,
  },
  subContent: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
  },
  featureHeader: {
    textAlign: "center",
  },
  logoImage: {
    width: "75%",
    height: "auto",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
  image: {
    width: "80%",
    height: "auto",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

const Landing = () => {
  const classes = useStyles();
  const history = useHistory();
  const auth = useSelector((state) => state.auth);

  if (auth.isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <FadeIn transitionDuration={1500}>
        <Box className={classes.heroContent}>
          <AppLogo />
          <Box className={classes.subContent}>
            <Typography variant="h5" align="center">
              An app to save your memories with your closed ones.
            </Typography>
          </Box>
          <Button
            onClick={() => {
              logEvent(googleAnalytics, "visit_landing_page");
              history.push("/signin");
            }}
            color="primary"
            variant="contained"
          >
            USE IT NOW
          </Button>
          <div>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <img
                  className={classes.image}
                  src={aroundTheWorldImage}
                  alt="around the world"
                />
                <h2 className={classes.featureHeader}>Feature 1</h2>
                <Typography variant="h6" align="center">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Repudiandae iusto unde quibusdam, iste dolorem consequuntur
                  enim
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <div>
                  <img
                    className={classes.image}
                    src={momentsImage}
                    alt="moments"
                  />
                </div>
                <h2 className={classes.featureHeader}>Feature 2</h2>
                <Typography variant="h6" align="center">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Repudiandae iusto unde quibusdam, iste dolorem consequuntur
                  enim
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <div>
                  <img
                    className={classes.image}
                    src={friendshipImage}
                    alt="friendship"
                  />
                </div>
                <h2 className={classes.featureHeader}>Feature 3</h2>
                <Typography variant="h6" align="center">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Repudiandae iusto unde quibusdam, iste dolorem consequuntur
                  enim
                </Typography>
              </Grid>
            </Grid>
          </div>
        </Box>
      </FadeIn>
    </>
  );
};

export default Landing;
