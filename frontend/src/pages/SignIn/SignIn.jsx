import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, loginWithGoogle, loginWithFacebook } from "../../actions/auth";
import AppLogo from "../../components/layout/AppLogo";
import AuthHeader from "../../components/layout/AuthHeader";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import FacebookIcon from "@material-ui/icons/Facebook";
import Copyright from "../../components/layout/CopyRight";
import FadeIn from "react-fade-in/lib/FadeIn";
import Loading from "../../components/Loading";

const GOOGLE_API_TOKEN = process.env.REACT_APP_GOOGLE_KEY;
const FACEBOOK_API_TOKEN = process.env.REACT_APP_FACEBOOK_KEY;
const FACEBOOK_REDIRECT_URI = `https://cs3216-timeline.netlify.app/signin`;

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  facebookIcon: {
    margin: "5px 17px 10px 7px",
    color: "#4267B2",
  },
  facebookButton: {
    backgroundColor: theme === "dark" ? "rgb(66, 133, 244)" : "#fff",
    display: "inline-flex",
    alignItems: "center",
    color: theme === "dark" ? "#fff" : "rgba(0, 0, 0, .54)",
    boxShadow: "0 2px 2px 0 rgba(0, 0, 0, .24), 0 0 1px 0 rgba(0, 0, 0, .24)",
    padding: 0,
    borderRadius: 2,
    width: "100%",
    border: "1px solid transparent",
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Roboto, sans-serif",
    "&:hover": {
      cursor: "pointer",
      opacity: 0.9,
    },
    "&:active": {
      cursor: "pointer",
      backgroundColor: theme === "dark" ? "#3367D6" : "#eee",
      color: theme === "dark" ? "#fff" : "rgba(0, 0, 0, .54)",
      opacity: 1,
    },
  },
}));

const SignIn = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const history = useHistory();

  const loginUser = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      dispatch(login(email, password));
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const loginUserWithGoogle = async (googleData) => {
    dispatch(loginWithGoogle(googleData));
  };

  const loginUserWithFacebook = async (facebookData) => {
    dispatch(loginWithFacebook(facebookData));
  };

  if (auth.isAuthenticated) {
    return <Redirect to="/" />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <FadeIn transitionDuration={1000}>
        <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <Grid item xs={12} component={Paper} elevation={6} square>
            <div className={classes.paper}>
              <AuthHeader text={"Sign In"} />
              <AppLogo />
              <form className={classes.form} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={(e) => setEmail(e.target.value)}
                >
                  {email}
                </TextField>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                >
                  {password}
                </TextField>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={(e) => loginUser(e)}
                >
                  Sign In
                </Button>
                <Box
                  display="flex"
                  justifyContent="center"
                  flexDirection="column"
                >
                  <GoogleLogin
                    clientId={GOOGLE_API_TOKEN}
                    buttonText="SIGN IN WITH GOOGLE"
                    onSuccess={loginUserWithGoogle}
                    onFailure={loginUserWithGoogle} // TODO: change so that it just stays at the login page with some message
                    cookiePolicy={"single_host_origin"}
                    className="" // TODO: Style
                  />
                  <br />
                  <FacebookLogin
                    appId={FACEBOOK_API_TOKEN}
                    autoLoad={false}
                    fields="name,email,picture"
                    redirectUri={FACEBOOK_REDIRECT_URI}
                    callback={loginUserWithFacebook}
                    size="small"
                    textButton="SIGN IN WITH FACEBOOK"
                    icon={<FacebookIcon className={classes.facebookIcon} />}
                    cssClass={classes.facebookButton}
                  />
                  <br />
                </Box>
                <Grid container>
                  <Grid item>
                    <Link
                      component="button"
                      variant="body2"
                      onClick={() => history.push("/register")}
                    >
                      Don't have an account? Sign Up
                    </Link>
                  </Grid>
                </Grid>
                <Box mt={5}>
                  <Copyright />
                </Box>
              </form>
            </div>
          </Grid>
        </Grid>
      </FadeIn>
    </>
  );
};

export default SignIn;
