import { ADD_LIST, ADD_SWATCH, DRAG_HAPPENED, LOAD_PROJECTS } from "./types";
import { API, graphqlOperation } from "aws-amplify";
import { listProjects } from "../graphql/queries";
import { createProject } from "../graphql/mutations";

export const loadProjects = project => async dispatch => {
  const result = await API.graphql(graphqlOperation(listProjects));
  const orderedProjects = result.data.listProjects.items.sort((a, b) => {
    return a.order - b.order;
  });
  dispatch({ type: LOAD_PROJECTS, payload: orderedProjects });
};

export const addProject = (projectTitle, index) => async dispatch => {
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
  projects,
  droppableIdStart,
  droppableIdEnd,
  droppableIndexStart,
  droppableIndexEnd,
  draggableId,
  type
) => dispatch => {
  console.log(projects);

  if (type === "list") {
    const list = projects.splice(droppableIndexStart, 1);
    console.log(list);
    projects.splice(droppableIndexEnd, 0, ...list);
    console.log(projects);
    dispatch({
      type: DRAG_HAPPENED,
      payload: projects
    });
  }
};
