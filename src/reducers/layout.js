import { SHOW_EXPLORE, NEW_PALETTE } from "../actions/types";

const initialState = {
  discover: true
};

export default function (state = initialState, action) {
  const { type } = action;
  switch (type) {
    case SHOW_EXPLORE:
      return {
        discover: true
      };
  }
  switch (type) {
    case NEW_PALETTE:
      return {
        discover: true
      };
    default:
      return state;
  }
}
