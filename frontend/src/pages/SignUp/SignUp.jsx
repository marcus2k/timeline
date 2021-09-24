import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/auth";
import { Redirect, useHistory } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import AppLogo from "../../components/layout/AppLogo";
import AuthHeader from "../../components/layout/AuthHeader";
import Copyright from "../../components/layout/CopyRight";
import FadeIn from "react-fade-in/lib/FadeIn";
import Loading from "../../components/Loading";

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
}));

const SignUp = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassowrd] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const history = useHistory();

  const onRegisterClick = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      dispatch(
        setAlert(
          "Please make sure that Password and Confirm Password are the same",
          "error"
        )
      );
      return;
    }
    try {
      setLoading(true);
      dispatch(register(name, email, password));
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (auth.isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <FadeIn transitionDuration={1000}>
        <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <Grid item xs={12} component={Paper} elevation={6} square>
            <div className={classes.paper}>
              <AuthHeader text={"Sign Up"} />
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
                  id="name"
                  label="Name"
                  name="name"
                  autoFocus
                  onChange={(e) => setName(e.target.value)}
                >
                  {name}
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
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="current-password"
                  onChange={(e) => setConfirmPassowrd(e.target.value)}
                >
                  {confirmPassword}
                </TextField>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={(e) => onRegisterClick(e)}
                >
                  Sign Up
                </Button>
                <Grid container>
                  <Grid item>
                    <Link
                      component="button"
                      variant="body2"
                      onClick={() => history.push("/signin")}
                    >
                      Have an account? Log In
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

export default SignUp;
