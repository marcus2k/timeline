import {
  ADD_MEMORIES_OF_SELECTED_DATE,
  GET_DATES_WITH_MEMORIES,
  SET_SELECTED_DATE,
} from "../action-types/calendar";

const initialState = {
  selectedDate: new Date(),
  markedDates: [],
  memoriesByDate: [],
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
    case ADD_MEMORIES_OF_SELECTED_DATE:
      const cloned = [...state.memoriesByDate];
      const filtered = cloned.filter((obj) => obj.date !== payload.date);
      filtered.push(payload);
      return {
        ...state,
        memoriesByDate: [...filtered],
      };
    default:
      return state;
  }
};

export default calendarReducer;
