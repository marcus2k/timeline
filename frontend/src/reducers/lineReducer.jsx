import {
  ADD_LINE,
  CREATE_DRAFT_LINE,
  DELETE_DRAFT_LINE,
  GET_LINES,
  GET_LINES_OFFLINE,
} from "../action-types/line";

const initialState = {
  onlineLines: [],
  draftLines: [],
};

const lineReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_LINE:
      return {
        ...state,
        onlineLines: [...state.onlineLines, payload],
      };
    case GET_LINES:
      return {
        ...state,
        onlineLines: [...payload],
      };
    case GET_LINES_OFFLINE:
      return state;
    case CREATE_DRAFT_LINE:
      return {
        ...state,
        draftLines: [...state.draftLines, payload],
      };
    case DELETE_DRAFT_LINE: {
      // payload is the id
      const newDraftLines = [...state.draftLines].filter(
        (line) => line.lineId !== payload
      );
      return {
        ...state,
        draftLines: newDraftLines,
      };
    }
    default:
      return state;
  }
};

export default lineReducer;
