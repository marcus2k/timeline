import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { useState } from "react";
import Loading from "../../components/Loading";
import DeleteProfileDialog from "./DeleteProfileDialog";
import { Box, Typography } from "@material-ui/core";
import ChangePasswordDialog from "./ChangePasswordDialog";
import ChangeNameDialog from "./ChangeNameDialog";
import ConfirmLogoutDialog from "./ConfirmLogoutDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

const Info = () => {
  const classes = useStyles();
  const [displayChangeNameDialog, setDisplayChangeNameDialog] = useState(false);
  const [displayDeleteDialog, setDisplayDeleteDialog] = useState(false);
  const [displayChangePasswordDialog, setDisplayChangePasswordDialog] =
    useState(false);
  const [displayLogoutDialog, setDisplayLogoutDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className={classes.root}>
        <List component="nav">
          <Box padding={2}>
            <Typography variant="h4">Account Options</Typography>
          </Box>
          <Divider />
          <ListItem button onClick={() => setDisplayChangeNameDialog(true)}>
            <ListItemText primary="Change Name" />
          </ListItem>
          <Divider />
          <ListItem button onClick={() => setDisplayChangePasswordDialog(true)}>
            <ListItemText primary="Change Password" />
          </ListItem>
          <Divider />
          <ListItem button onClick={() => setDisplayDeleteDialog(true)}>
            <ListItemText primary="Delete Account" />
          </ListItem>
          <Divider />
          <ListItem button onClick={() => setDisplayLogoutDialog(true)}>
            <ListItemText primary="Logout" />
          </ListItem>
          <Divider />
        </List>
        <DeleteProfileDialog
          displayDeleteDialog={displayDeleteDialog}
          setDisplayDeleteDialog={setDisplayDeleteDialog}
          setLoading={setLoading}
        />
        <ChangePasswordDialog
          displayChangePasswordDialog={displayChangePasswordDialog}
          setDisplayChangePasswordDialog={setDisplayChangePasswordDialog}
          setLoading={setLoading}
        />
        <ChangeNameDialog
          displayChangeNameDialog={displayChangeNameDialog}
          setDisplayChangeNameDialog={setDisplayChangeNameDialog}
          setLoading={setLoading}
        />
        <ConfirmLogoutDialog
          displayLogoutDialog={displayLogoutDialog}
          setDisplayLogoutDialog={setDisplayLogoutDialog}
          setLoading={setLoading}
        />
      </div>
    </>
  );
};

export default Info;
