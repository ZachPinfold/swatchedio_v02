import { ADD_SWATCH, ADD_LIST, DRAG_HAPPENED } from "../actions/types";

const initialState = {
  projects: [
    {
      title: "Project 1",
      id: 0,
      cards: [
        { id: 1, text: "#39dje3" },
        { id: 2, text: "#21dje3" }
      ]
    },
    {
      title: "Project 2",
      id: 3,
      cards: [
        { id: 4, text: "#21dje1" },
        { id: 5, text: "#FFFFFF" },
        { id: 6, text: "#EEEEEE" }
      ]
    }
  ]
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_LIST:
      return {
        ...state,
        projects: [...state.projects, payload]
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
  }
  switch (type) {
    default:
      return state;
  }
}
