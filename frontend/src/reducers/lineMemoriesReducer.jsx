import { ADD_LINE_DATA } from "../action-types/lineMemories";

const initialState = {
  onlineLineMemories: [],
  offlineLineMemories: [], // offlineLineMemories should contain the data required to create a memory when online
};

const lineMemoriesReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_LINE_DATA:
      // If the line already exist in the localstorage, then we cache it instead
      const filteredOnlineLines = [...state.onlineLineMemories].filter(
        (line) => line.lineId !== payload.lineId
      );
      return {
        ...state,
        onlineLineMemories: [...filteredOnlineLines, payload],
      };
    default:
      return state;
  }
};

export default lineMemoriesReducer;
