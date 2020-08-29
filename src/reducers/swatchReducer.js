import {
  ADD_SWATCH,
  ADD_LIST,
  LOAD_PROJECTS,
  PROJECT_DRAG_HAPPENED,
  SWATCH_DRAG_HAPPENED
} from "../actions/types";

const initialState = {
  projects: [],
  loading: true,
  erros: {}
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOAD_PROJECTS:
      return {
        ...state,
        projects: payload
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
    case ADD_SWATCH:
      return {
        ...state,
        projects: state.projects.map(project =>
          project.id === payload.projectId
            ? { ...project, swatches: payload.items }
            : project
        )
      };

    // case ADD_SWATCH:
    //   const newCard = {
    //     text: payload.text,
    //     id: cardId
    //   };
    //   cardId += 1;

    //   const newState = state.map(list => {
    //     if (list.id === payload.listId) {
    //       return {
    //         ...list,
    //         cards: [...list.cards, newCard]
    //       };
    //     } else return list;
    //   });
    //   return newState;

    // case DRAG_HAPPENED:
    //   const {
    //     droppableIdStart,
    //     droppableIdEnd,
    //     droppableIndexStart,
    //     droppableIndexEnd,
    //     draggableId,
    //     type
    //   } = payload;

    //   const newStateAfterMove = [...state.projects];

    //   console.log(
    //     droppableIdStart,
    //     droppableIdEnd,
    //     droppableIndexStart,
    //     droppableIndexEnd,
    //     draggableId,
    //     type
    //   );

    //   if (type === "list") {
    //     const list = newStateAfterMove.splice(droppableIndexStart, 1);
    //     newStateAfterMove.splice(droppableIndexEnd, 0, ...list);
    //     return {
    //       ...state,
    //       projects: newStateAfterMove
    //     };
    //   }

    // // In the same list
    // if (droppableIdStart === droppableIdEnd) {
    //   const list = state.find(
    //     list => String(droppableIdStart) === String(list.id)
    //   );
    //   const card = list.cards.splice(droppableIndexStart, 1);
    //   list.cards.splice(droppableIndexEnd, 0, ...card);
    // }

    // // Other List

    // if (droppableIdStart !== droppableIdEnd) {
    //   // find list where drag happened
    //   const listStart = state.find(
    //     list => String(droppableIdStart) === String(list.id)
    //   );

    //   // Pull out the card from the list
    //   const card = listStart.cards.splice(droppableIndexStart, 1);

    //   // find the list where the drag ended
    //   const listEnd = state.find(
    //     list => String(droppableIdEnd) === String(list.id)
    //   );

    //   // put the card in the new list
    //   listEnd.cards.splice(droppableIndexEnd, 0, ...card);
    // }
    default:
      return state;
  }
}
