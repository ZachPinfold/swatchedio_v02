import { ADD_SWATCH, ADD_LIST, DRAG_HAPPENED } from "../actions/types";

let listId = 3;
let cardId = 8;

const initialState = [
  {
    title: "Last Episode",
    id: 0,
    cards: [
      { id: 1, text: "we created a static list and a static" },
      { id: 2, text: "And, this is the second card that we're working with" }
    ]
  }
  // {
  //   title: "Next Episode",
  //   id: 1,
  //   cards: [
  //     { id: 2, text: "we created a static list and a static" },
  //     { id: 3, text: "And, this is the second card that we're working with" },
  //     { id: 4, text: "And, this is the second card that we're working with" }
  //   ]
  // },
  // {
  //   title: "Another Episode",
  //   id: 2,
  //   cards: [
  //     { id: 5, text: "we created a static list and a static" },
  //     { id: 6, text: "And, this is the second card that we're working with" },
  //     { id: 7, text: "And, this is the second card that we're working with" }
  //   ]
  // }
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
        draggableId,
        type
      } = payload;
      const newStateAfterMove = [...state];

      // draggin lists around

      console.log(type);

      if (type === "list") {
        const list = newStateAfterMove.splice(droppableIndexStart, 1);
        newStateAfterMove.splice(droppableIndexEnd, 0, ...list);
        return newStateAfterMove;
      }

      // In the same list
      if (droppableIdStart === droppableIdEnd) {
        const list = state.find(
          list => String(droppableIdStart) === String(list.id)
        );
        const card = list.cards.splice(droppableIndexStart, 1);
        list.cards.splice(droppableIndexEnd, 0, ...card);
      }

      // Other List

      if (droppableIdStart !== droppableIdEnd) {
        // find list where drag happened
        const listStart = state.find(
          list => String(droppableIdStart) === String(list.id)
        );

        // Pull out the card from the list
        const card = listStart.cards.splice(droppableIndexStart, 1);

        // find the list where the drag ended
        const listEnd = state.find(
          list => String(droppableIdEnd) === String(list.id)
        );

        // put the card in the new list
        listEnd.cards.splice(droppableIndexEnd, 0, ...card);
      }

      return newStateAfterMove;
  }
  switch (type) {
    default:
      return state;
  }
}
