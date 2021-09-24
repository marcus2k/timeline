import {
  GET_DATES_WITH_MEMORIES,
  SET_SELECTED_DATE,
} from "../action-types/calendar";

const initialState = {
  selectedDate: new Date(),
  markedDates: [],
};

const calendarReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_DATES_WITH_MEMORIES:
      let currentMarkedDates = new Set([...state.markedDates]);
      payload.forEach((date) => currentMarkedDates.add(date));
      return {
        ...state,
        markedDates: [...currentMarkedDates],
      };
    case SET_SELECTED_DATE:
      return {
        ...state,
        selectedDate: payload,
      };
    default:
      return state;
  }
};

export default calendarReducer;
