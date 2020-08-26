import { ADD_USER } from "./types";

export const testAction = (text, listId) => dispatch => {
  dispatch({ type: ADD_USER });
};
