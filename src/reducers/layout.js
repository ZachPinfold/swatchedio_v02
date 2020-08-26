import { SHOW_EXPLORE, NEW_PALETTE, HIDE_EXPLORE } from "../actions/types";

const initialState = {
  discover: false
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
    case HIDE_EXPLORE:
      return {
        discover: false
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
