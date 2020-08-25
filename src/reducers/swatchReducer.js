import { ADD_SWATCH, ADD_LIST, DRAG_HAPPENED } from "../actions/types";

let listId = 2;
let cardId = 5;

const initialState = [
  {
    title: "Last Episode",
    id: 0,
    cards: [
      { id: 0, text: "we created a static list and a static" },
      { id: 1, text: "And, this is the second card that we're working with" }
    ]
  },
  {
    title: "Next Episode",
    id: 1,
    cards: [
      { id: 2, text: "we created a static list and a static" },
      { id: 3, text: "And, this is the second card that we're working with" },
      { id: 4, text: "And, this is the second card that we're working with" }
    ]
  }
];

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_LIST:
      const newList = {
        title: payload,
        cards: [],
        id: listId
      };
      listId += 1;
      return [...state, newList];

    case ADD_SWATCH:
      const newCard = {
        text: payload.text,
        id: cardId
      };
      cardId += 1;

      const newState = state.map(list => {
        if (list.id === payload.listId) {
          return {
            ...list,
            cards: [...list.cards, newCard]
          };
        } else return list;
      });
      return newState;

    case DRAG_HAPPENED:
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd,
        draggableId
      } = payload;
      const newStateAfterMove = [...state];

      // In the same list
      if (droppableIdStart === droppableIdEnd) {
        const list = state.find(
          list => String(droppableIdStart) === String(list.id)
        );
        console.log(list);
        const card = list.cards.splice(droppableIndexStart, 1);
        list.cards.splice(droppableIndexEnd, 0, ...card);
      }
      return newStateAfterMove;
  }
  switch (type) {
    default:
      return state;
  }
}
