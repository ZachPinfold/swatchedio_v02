import { ADD_LIST, ADD_SWATCH, DRAG_HAPPENED } from "./types";

export const addProject = project => dispatch => {
  dispatch({ type: ADD_LIST, payload: project });
};

export const addSwatch = (text, listId) => dispatch => {
  dispatch({ type: ADD_SWATCH, payload: { text, listId } });
};

export const sortSwatches = (
  droppableIdStart,
  droppableIdEnd,
  droppableIndexStart,
  droppableIndexEnd,
  draggableId
) => dispatch => {
  dispatch({
    type: DRAG_HAPPENED,
    payload: {
      droppableIdStart,
      droppableIdEnd,
      droppableIndexStart,
      droppableIndexEnd,
      draggableId
    }
  });
};
