import { SET_ALERT, REMOVE_ALERT } from "../action-types/alert";
import { v4 as uuidv4 } from "uuid";

export const setAlert = (message, severity) => (dispatch) => {
  const id = uuidv4();
  dispatch({
    type: SET_ALERT,
    payload: {
      message,
      id,
      severity,
    },
  });

  setTimeout(
    () =>
      dispatch({
        type: REMOVE_ALERT,
        payload: id,
      }),
    5000
  );
};

export const removeAlert = (id) => (dispatch) => {
  dispatch({
    type: REMOVE_ALERT,
    payload: id,
  });
};
