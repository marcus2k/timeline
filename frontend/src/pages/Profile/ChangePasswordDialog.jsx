import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Button, Fade, makeStyles, TextField } from "@material-ui/core";
import { COLORS } from "../../utils/colors";
import { useDispatch } from "react-redux";
import { setAlert } from "../../actions/alert";
import { userChangePassword } from "../../services/userService";

const useStyles = makeStyles(() => ({
  cancelButton: {
    color: COLORS.WHITE,
    backgroundColor: COLORS.CANCEL_BUTTON,
  },
  changePasswordButton: {
    color: COLORS.WHITE,
    backgroundColor: COLORS.SUCCESS_BUTTON,
  },
}));

const ChangePasswordDialog = ({
  displayChangePasswordDialog = false,
  setDisplayChangePasswordDialog,
  setLoading,
}) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const classes = useStyles();
  const dispatch = useDispatch();

  const changePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      dispatch(
        setAlert("New password and Confirm password do not match", "error")
      );
      return;
    }
    try {
      setLoading(true);
      await userChangePassword(oldPassword, newPassword);
      dispatch(setAlert("Successfully changed password!", "success"));
    } catch (err) {
      console.log(err.response);
      dispatch(setAlert(err.response.data.error, "error"));
    } finally {
      resetFields();
      setDisplayChangePasswordDialog(false);
      setLoading(false);
    }
  };

  const resetFields = () => {
    setOldPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  };

  return (
    <>
      <Fade in={displayChangePasswordDialog}>
        <Dialog
          open={displayChangePasswordDialog}
          keepMounted
          onClose={() => setDisplayChangePasswordDialog(false)}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            Please fill in your old and new password below.
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              variant="outlined"
              margin="normal"
              id="old password"
              label="Old Password"
              type="password"
              fullWidth
              name="Old Password"
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <TextField
              autoFocus
              variant="outlined"
              margin="normal"
              id="New password"
              label="New Password"
              type="password"
              fullWidth
              name="New Password"
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <TextField
              autoFocus
              variant="outlined"
              margin="normal"
              id="confirm new password"
              label="Confirm New Password"
              type="password"
              fullWidth
              name="Confirm New Password"
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                resetFields();
                setDisplayChangePasswordDialog(false);
              }}
              color="primary"
              className={classes.cancelButton}
            >
              No
            </Button>
            <Button
              onClick={changePassword}
              color="primary"
              className={classes.changePasswordButton}
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Fade>
    </>
  );
};

export default ChangePasswordDialog;
