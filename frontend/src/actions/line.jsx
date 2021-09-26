import {
  CREATE_DRAFT_LINE,
  GET_LINES,
  GET_LINES_OFFLINE,
  DELETE_DRAFT_LINE,
  ADD_LINE,
} from "../action-types/line";
import {
  createNewLine,
  getAllLinesByUserIdOrderByMostRecentMemory,
} from "../services/lines";
import { setAlert } from "./alert";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

export const getLines = () => async (dispatch) => {
  try {
    const linesByUser = await getAllLinesByUserIdOrderByMostRecentMemory();
    dispatch({
      type: GET_LINES,
      payload: linesByUser,
    });
  } catch (err) {
  } finally {
    dispatch({
      type: GET_LINES_OFFLINE,
    });
  }
};

export const createLineAction =
  (lineTitle, selectedColor) => async (dispatch) => {
    try {
      const createdLine = await createNewLine(lineTitle.trim(), selectedColor);
      dispatch({
        type: ADD_LINE,
        payload: createdLine,
      });
    } catch (err) {
      if (!err.response) {
        dispatch({
          type: CREATE_DRAFT_LINE,
          payload: {
            name: lineTitle,
            colorHex: selectedColor,
            lastUpdatedAt: moment().format(),
            lineId: uuidv4().toString(),
          },
        });
        dispatch(setAlert("Network Error, a draft has been created", "error"));
      } else {
        dispatch(setAlert(err.response.data.message, "error"));
      }
    }
  };

export const createDraftLineWhenOnline =
  (lineTitle, selectedColor, idOfDraftLine) => async (dispatch) => {
    try {
      await createNewLine(lineTitle, selectedColor);
      // if successful
      dispatch({
        type: DELETE_DRAFT_LINE,
        payload: idOfDraftLine,
      });
      dispatch(getLines());
    } catch (err) {
      if (!err.response) {
        dispatch(setAlert("Network Error, retry again later", "error"));
      } else {
        dispatch(setAlert(err.response.data.message, "error"));
      }
    }
  };

export const deleteDraftLine = (idOfDraftLine) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_DRAFT_LINE,
      payload: idOfDraftLine,
    });
  } catch (err) {
    dispatch(setAlert(err.message, "error"));
  }
};
