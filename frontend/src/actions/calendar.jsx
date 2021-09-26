import moment from "moment";
import {
  ADD_MEMORIES_OF_SELECTED_DATE,
  GET_DATES_WITH_MEMORIES,
  SET_SELECTED_DATE,
} from "../action-types/calendar";
import server from "../utils/server";
import { setAlert } from "./alert";

export const addMemoriesOfDateToStore =
  (memories, selectedDate) => async (dispatch) => {
    const dateInString = selectedDate.toLocaleDateString();
    dispatch({
      type: ADD_MEMORIES_OF_SELECTED_DATE,
      payload: {
        date: dateInString,
        memories,
      },
    });
  };

export const getDatesWithMemoriesByMonthAndYear =
  (selectedMonth, selectedYear) => async (dispatch) => {
    try {
      const res = await server.get(
        `/memories/${selectedYear}/${selectedMonth + 1}`
      );
      const memoriesDateArr = res.data.numberOfMemories;
      let dateWithMemories = [];
      // No need to add 1 for selectedMonth because month starts from 0 for the moment library
      memoriesDateArr.forEach((memory) => {
        let formattedDate = moment([selectedYear, selectedMonth, memory.day])
          .utc()
          .local()
          .format("DD-MM-YYYY");
        dateWithMemories.push(formattedDate);
      });
      dispatch({
        type: GET_DATES_WITH_MEMORIES,
        payload: dateWithMemories,
      });
    } catch (err) {
      dispatch(setAlert(err.message, "error"));
    }
  };

export const setChosenDate = (chosenDate) => (dispatch) => {
  dispatch({
    type: SET_SELECTED_DATE,
    payload: chosenDate,
  });
};
