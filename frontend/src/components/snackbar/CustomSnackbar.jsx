import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { useDispatch, useSelector } from "react-redux";
import Alert from "@material-ui/lab/Alert";
import { removeAlert } from "../../actions/alert";

const CustomSnackbar = () => {
  const alerts = useSelector((state) => state.alerts);
  const dispatch = useDispatch();
  if (alerts.length === 0) {
    return null;
  }

  const handleClose = (alertId) => {
    console.log(alertId);
    dispatch(removeAlert(alertId));
  };

  return (
    <>
      {alerts &&
        alerts.map((alert) => (
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={alerts.length > 0}
            autoHideDuration={5000}
            onClose={() => handleClose(alert.id)}
            key={alert.id}
          >
            <Alert
              onClose={() => handleClose(alert.id)}
              severity={alert.severity}
            >
              {alert.message}
            </Alert>
          </Snackbar>
        ))}
    </>
  );
};

export default CustomSnackbar;
