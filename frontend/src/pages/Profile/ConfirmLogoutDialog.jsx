import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Button, Fade, makeStyles } from "@material-ui/core";
import { COLORS } from "../../utils/colors";
import { useDispatch } from "react-redux";
import { setAlert } from "../../actions/alert";
import { logout } from "../../actions/auth";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(() => ({
  cancelButton: {
    color: COLORS.WHITE,
    backgroundColor: COLORS.CANCEL_BUTTON,
  },
  logoutButton: {
    color: COLORS.WHITE,
    backgroundColor: COLORS.SUCCESS_BUTTON,
  },
}));

const ConfirmLogoutDialog = ({
  displayLogoutDialog = false,
  setDisplayLogoutDialog,
  setLoading,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogoutButtonClicked = async () => {
    try {
      setLoading(true);
      dispatch(logout());
      history.push("/signin");
    } catch (err) {
      dispatch(setAlert(err.message, "error"));
    } finally {
      setDisplayLogoutDialog(false);
      setLoading(false);
    }
  };

  return (
    <>
      <Fade in={displayLogoutDialog}>
        <Dialog
          open={displayLogoutDialog}
          keepMounted
          onClose={() => setDisplayLogoutDialog(false)}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            Are you sure you want to logout?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              If you are currently not connected to the internet, you will lose
              your line drafts too.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setDisplayLogoutDialog(false)}
              color="primary"
              className={classes.cancelButton}
            >
              No
            </Button>
            <Button
              onClick={onLogoutButtonClicked}
              color="primary"
              className={classes.logoutButton}
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Fade>
    </>
  );
};

export default ConfirmLogoutDialog;
