import { ADD_USER } from "../actions/types";

const initiaState = {
  users: [
    {
      user: "paul",
      age: 18
    },
    {
      user: "Zach",
      age: 25
    }
  ]
};

export default function (state = initiaState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_USER:
      console.log("test");
      return {
        ...state,
        users: [{ user: "jeff", age: 23 }, ...state.users]
      };
    default:
      return state;
  }
}
