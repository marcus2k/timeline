import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Button, Fade, makeStyles, TextField } from "@material-ui/core";
import { COLORS } from "../../utils/colors";
import { useDispatch } from "react-redux";
import { setAlert } from "../../actions/alert";
import { userChangeName } from "../../actions/auth";

const useStyles = makeStyles(() => ({
  cancelButton: {
    color: COLORS.WHITE,
    backgroundColor: COLORS.CANCEL_BUTTON,
  },
  changeNameButton: {
    color: COLORS.WHITE,
    backgroundColor: COLORS.SUCCESS_BUTTON,
  },
}));

const ChangeNameDialog = ({
  displayChangeNameDialog = false,
  setDisplayChangeNameDialog,
  setLoading,
}) => {
  const [newName, setNewName] = useState("");
  const classes = useStyles();
  const dispatch = useDispatch();

  const changeName = () => {
    if (newName.length === 0) {
      dispatch(setAlert("Please fill in your new name", "error"));
      return;
    }
    if (newName.length > 30) {
      dispatch(
        setAlert("Your name cannot be more than 30 characters", "error")
      );
      return;
    }
    try {
      setLoading(true);
      dispatch(userChangeName(newName));
      dispatch(setAlert("Successfully changed name!", "success"));
    } catch (err) {
      dispatch(setAlert(err.message, "error"));
    } finally {
      setNewName("");
      setDisplayChangeNameDialog(false);
      setLoading(false);
    }
  };

  return (
    <>
      <Fade in={displayChangeNameDialog}>
        <Dialog
          open={displayChangeNameDialog}
          keepMounted
          onClose={() => setDisplayChangeNameDialog(false)}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            Change your name!
          </DialogTitle>
          <DialogContent>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="New Name"
              label="New Name"
              name="New Name"
              autoFocus
              onChange={(e) => setNewName(e.target.value)}
            >
              {newName}
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setNewName("");
                setDisplayChangeNameDialog(false);
              }}
              color="primary"
              className={classes.cancelButton}
            >
              No
            </Button>
            <Button
              onClick={changeName}
              color="primary"
              className={classes.changeNameButton}
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Fade>
    </>
  );
};

export default ChangeNameDialog;
