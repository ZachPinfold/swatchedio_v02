import {
  ADD_LIST,
  ADD_SWATCH,
  PROJECT_DRAG_HAPPENED,
  SWATCH_DRAG_HAPPENED,
  LOAD_PROJECTS,
  SWATCH_BETWEEN_DRAG_HAPPENED,
  HOME_REVERT,
  DELETE_SWATCH
} from "./types";
import { API, graphqlOperation } from "aws-amplify";
import { listProjects } from "../graphql/queries";
import {
  createProject,
  updateProject,
  createSwatch,
  updateSwatch,
  deleteSwatch
} from "../graphql/mutations";

// LOAD PROJECTS

export const loadProjects = project => async dispatch => {
  const result = await API.graphql(graphqlOperation(listProjects));
  const orderedProjects = result.data.listProjects.items.sort((a, b) => {
    return a.order - b.order;
  });
  orderedProjects.map(project => {
    project.swatches.items.sort((a, b) => {
      return a.order - b.order;
    });
    return project;
  });
  dispatch({ type: LOAD_PROJECTS, payload: orderedProjects });
};

// ADD PROJECT

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

// ADD SWATCH

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
  const result = await API.graphql(graphqlOperation(createSwatch, { input }));

  const newSwatchInput = {
    hexCode: swatchHexCode,
    order: index,
    id: result.data.createSwatch.id
  };

  swatches.push(newSwatchInput);

  const items = { items: swatches };

  dispatch({ type: ADD_SWATCH, payload: { items, projectId } });
};

// DELETE SWATCH

export const deleteSwatchCard = (
  swatchId,
  projectId,
  swatches,
  index
) => async dispatch => {
  await API.graphql(
    graphqlOperation(deleteSwatch, {
      input: { id: swatchId }
    })
  );

  // const updatedSwatches = swatches.splice(index, 1);
  swatches.splice(index, 1);
  console.log(swatches);

  const items = swatches.map((swatch, index) => {
    swatch.order = index;
    API.graphql(
      graphqlOperation(updateSwatch, {
        input: {
          id: swatch.id,
          order: index
        }
      })
    );
    return swatch;
  });

  dispatch({
    type: DELETE_SWATCH,
    payload: { projectId, items: { items } }
  });
};

// SORT SWATCHES/PROJECTS

export const sortSwatches = (
  projects,
  droppableIdStart,
  droppableIdEnd,
  droppableIndexStart,
  droppableIndexEnd,
  draggableId,
  type
) => (dispatch, getState) => {
  if (type === "card") {
    if (droppableIdStart === droppableIdEnd) {
      const mappArr = projects.filter(project => {
        if (project.id === droppableIdStart) return project;
      });

      const targetProject = mappArr[0].swatches.items.map((swatch, index) => {
        if (index === droppableIndexStart) {
          API.graphql(
            graphqlOperation(updateSwatch, {
              input: { id: swatch.id, order: droppableIndexEnd }
            })
          );
          swatch.order = droppableIndexEnd;
        }

        if (
          droppableIndexStart < droppableIndexEnd &&
          index <= droppableIndexEnd &&
          index !== droppableIndexStart &&
          index > droppableIndexStart
        ) {
          API.graphql(
            graphqlOperation(updateSwatch, {
              input: { id: swatch.id, order: swatch.order - 1 }
            })
          );
          swatch.order = swatch.order - 1;
        }

        if (
          droppableIndexStart > droppableIndexEnd &&
          index >= droppableIndexEnd &&
          index !== droppableIndexStart &&
          index < droppableIndexStart
        ) {
          API.graphql(
            graphqlOperation(updateSwatch, {
              input: { id: swatch.id, order: swatch.order + 1 }
            })
          );
          swatch.order = swatch.order + 1;
        }

        return swatch;
      });

      const list = targetProject.splice(droppableIndexStart, 1);
      targetProject.splice(droppableIndexEnd, 0, ...list);
      const items = { items: targetProject };
      dispatch({
        type: SWATCH_DRAG_HAPPENED,
        payload: { items, droppableIdStart }
      });
    }

    if (droppableIdStart !== droppableIdEnd) {
      const ProjectRemovedFrom = projects.filter(project => {
        if (project.id === droppableIdStart) return project;
      });

      const ProjectGoingTo = projects.filter(project => {
        if (project.id === droppableIdEnd) return project;
      });

      const swatchToMove = ProjectRemovedFrom[0].swatches.items.splice(
        droppableIndexStart,
        1
      );

      ProjectGoingTo[0].swatches.items.splice(
        droppableIndexEnd,
        0,
        ...swatchToMove
      );

      ProjectGoingTo[0].swatches.items.forEach((swatch, index) => {
        API.graphql(
          graphqlOperation(updateSwatch, {
            input: {
              id: swatch.id,
              order: index,
              projectSwatchesId: droppableIdEnd
            }
          })
        );
      });

      ProjectRemovedFrom[0].swatches.items.forEach((swatch, index) => {
        API.graphql(
          graphqlOperation(updateSwatch, {
            input: {
              id: swatch.id,
              order: index
            }
          })
        );
      });

      const projectsTo = { items: ProjectGoingTo[0].swatches.items };
      const projectsFrom = { items: ProjectRemovedFrom[0].swatches.items };

      dispatch({
        type: SWATCH_BETWEEN_DRAG_HAPPENED,
        payload: { projectsTo, projectsFrom, droppableIdStart, droppableIdEnd }
      });
    }
  }

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

    const list = leftToRightChange.splice(droppableIndexStart, 1);
    leftToRightChange.splice(droppableIndexEnd, 0, ...list);
    dispatch({
      type: PROJECT_DRAG_HAPPENED,
      payload: leftToRightChange
    });
  }
};

// REVERT HOME

export const revertHome = () => dispatch => {
  dispatch({ type: HOME_REVERT });
};
