import { ADD_LIST, ADD_SWATCH, DRAG_HAPPENED, LOAD_PROJECTS } from "./types";
import { API, graphqlOperation } from "aws-amplify";
import { listProjects, listSwatchs } from "../graphql/queries";
import {
  createProject,
  updateProject,
  createSwatch
} from "../graphql/mutations";

export const loadProjects = project => async dispatch => {
  const result = await API.graphql(graphqlOperation(listProjects));
  const orderedProjects = result.data.listProjects.items.sort((a, b) => {
    return a.order - b.order;
  });
  dispatch({ type: LOAD_PROJECTS, payload: orderedProjects });
};

// export const loadSwatches = project => async dispatch => {
//   const result = await API.graphql(graphqlOperation(listSwatchs));
//   console.log(result);
// };

export const addProject = (projectTitle, index) => async dispatch => {
  const input = {
    ownerId: "123",
    ownerUsername: "zach",
    projectTitle: projectTitle,
    order: index
  };
  const result = await API.graphql(graphqlOperation(createProject, { input }));
  dispatch({ type: ADD_LIST, payload: result.data.createProject });
};

export const addSwatch = (
  swatchHexCode,
  projectId,
  index,
  swatches
) => async dispatch => {
  const input = {
    ownerId: "123",
    ownerUsername: "zach",
    hexCode: swatchHexCode,
    order: index,
    projectSwatchesId: projectId
  };
  swatches.push(input);
  const items = { items: swatches };
  const result = await API.graphql(graphqlOperation(createSwatch, { input }));
  dispatch({ type: ADD_SWATCH, payload: { items, projectId } });
};

export const sortSwatches = (
  projects,
  droppableIdStart,
  droppableIdEnd,
  droppableIndexStart,
  droppableIndexEnd,
  draggableId,
  type
) => (dispatch, getState) => {
  const state = getState();
  // console.log(state.swatchReducer.projects[0]);
  // console.log(projects);
  if (type === "list") {
    const leftToRightChange = projects.map((project, index) => {
      if (index === droppableIndexStart) {
        API.graphql(
          graphqlOperation(updateProject, {
            input: { id: project.id, order: droppableIndexEnd }
          })
        );
        project.order = droppableIndexEnd;
      }
      if (
        droppableIndexStart < droppableIndexEnd &&
        index <= droppableIndexEnd &&
        index !== droppableIndexStart &&
        index > droppableIndexStart
      ) {
        API.graphql(
          graphqlOperation(updateProject, {
            input: { id: project.id, order: project.order - 1 }
          })
        );
        project.order = project.order - 1;
      }
      if (
        droppableIndexStart > droppableIndexEnd &&
        index >= droppableIndexEnd &&
        index !== droppableIndexStart &&
        index < droppableIndexStart
      ) {
        API.graphql(
          graphqlOperation(updateProject, {
            input: { id: project.id, order: project.order + 1 }
          })
        );
        project.order = project.order + 1;
      }
      return project;
    });

    console.log(leftToRightChange);

    const list = leftToRightChange.splice(droppableIndexStart, 1);
    leftToRightChange.splice(droppableIndexEnd, 0, ...list);
    dispatch({
      type: DRAG_HAPPENED,
      payload: leftToRightChange
    });
  }
};
