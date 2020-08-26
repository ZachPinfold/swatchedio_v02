import { ADD_LIST, ADD_SWATCH, DRAG_HAPPENED } from "./types";

export const addProject = project => dispatch => {
  console.log("add project");
  const projectObj = {
    title: project,
    id: 4,
    cards: []
  };
  dispatch({ type: ADD_LIST, payload: projectObj });
};

export const addSwatch = (text, listId) => dispatch => {
  dispatch({ type: ADD_SWATCH, payload: { text, listId } });
};

export const sortSwatches = (
  droppableIdStart,
  droppableIdEnd,
  droppableIndexStart,
  droppableIndexEnd,
  draggableId,
  type
) => dispatch => {
  dispatch({
    type: DRAG_HAPPENED,
    payload: {
      droppableIdStart,
      droppableIdEnd,
      droppableIndexStart,
      droppableIndexEnd,
      draggableId,
      type
    }
  });
};
