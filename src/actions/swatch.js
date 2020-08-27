import { ADD_LIST, ADD_SWATCH, DRAG_HAPPENED, LOAD_PROJECTS } from "./types";
import { API, graphqlOperation } from "aws-amplify";
import { listProjects } from "../graphql/queries";
import { createProject } from "../graphql/mutations";

export const loadProjects = project => async dispatch => {
  const result = await API.graphql(graphqlOperation(listProjects));
  console.log(result);
  dispatch({ type: LOAD_PROJECTS, payload: result.data.listProjects.items });
};

export const addProject = (projectTitle, index) => async dispatch => {
  console.log(index);
  const input = {
    ownerId: "123",
    ownerUsername: "zach",
    projectTitle: projectTitle,
    order: index
  };
  const result = await API.graphql(graphqlOperation(createProject, { input }));
  console.log(result);
  dispatch({ type: ADD_LIST, payload: result.data.createProject });
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
