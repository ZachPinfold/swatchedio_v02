import {
  ADD_SWATCH,
  ADD_LIST,
  LOAD_PROJECTS,
  PROJECT_DRAG_HAPPENED,
  SWATCH_DRAG_HAPPENED,
  SWATCH_BETWEEN_DRAG_HAPPENED,
  HOME_REVERT
} from "../actions/types";

const initialState = {
  projects: [],
  loading: true,
  errors: {},
  projectPage: false
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOAD_PROJECTS:
      return {
        ...state,
        projects: payload,
        projectPage: true
      };
    case ADD_LIST:
      return {
        ...state,
        projects: [...state.projects, payload]
      };
    case PROJECT_DRAG_HAPPENED:
      return {
        ...state,
        projects: payload
      };
    case SWATCH_DRAG_HAPPENED:
      return {
        ...state,
        projects: state.projects.map(project =>
          project.id === payload.droppableIdStart
            ? { ...project, swatches: payload.items }
            : project
        )
      };
    case SWATCH_BETWEEN_DRAG_HAPPENED:
      return {
        ...state,
        projects: state.projects.map(project =>
          project.id === payload.droppableIdStart
            ? { ...project, swatches: payload.projectsFrom }
            : project.id === payload.droppableIdEnd
            ? { ...project, swatches: payload.projectsTo }
            : project
        )
      };

    case ADD_SWATCH:
      return {
        ...state,
        projects: state.projects.map(project =>
          project.id === payload.projectId
            ? { ...project, swatches: payload.items }
            : project
        )
      };
    case HOME_REVERT:
      return {
        ...state,
        projectPage: false
      };
    default:
      return state;
  }
}
