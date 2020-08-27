import { ADD_LIST, ADD_SWATCH, DRAG_HAPPENED, LOAD_PROJECTS } from "./types";
import { API, graphqlOperation } from "aws-amplify";
import { listProjects } from "../graphql/queries";
import { createProject, updateProject } from "../graphql/mutations";

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
  // console.log(projects, droppableIndexStart, droppableIndexEnd);

  if (type === "list") {
    projects.map(project => {
      console.log(
        project.order,
        droppableIndexStart + 1,
        droppableIndexEnd + 1
      );
      if (project.order === droppableIndexStart + 1) {
        console.log(project);
        API.graphql(
          graphqlOperation(updateProject, {
            input: { id: project.id, order: droppableIndexEnd + 1 }
          })
        );
      }
      if (
        project.order <= droppableIndexEnd + 1 &&
        project.order !== droppableIndexStart + 1
      ) {
        console.log(project);
        console.log("project order -1 ---- ", project.order - 1);
        API.graphql(
          graphqlOperation(updateProject, {
            input: { id: project.id, order: project.order - 1 }
          })
        );
      }
    });

    const list = projects.splice(droppableIndexStart, 1);
    projects.splice(droppableIndexEnd, 0, ...list);
    dispatch({
      type: DRAG_HAPPENED,
      payload: projects
    });
  }
};
