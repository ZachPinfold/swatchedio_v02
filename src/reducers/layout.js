import {
  SHOW_EXPLORE,
  NEW_PALETTE,
  HIDE_EXPLORE,
  ON_PROFILE,
  OFF_PROFILE
} from "../actions/types";

const initialState = {
  discover: false,
  profile: false
};

export default function(state = initialState, action) {
  const { type } = action;
  switch (type) {
    case SHOW_EXPLORE:
      return {
        ...state,
        discover: true
      };
    case HIDE_EXPLORE:
      return {
        ...state,
        discover: false
      };

    case NEW_PALETTE:
      return {
        ...state,
        discover: true
      };

    case ON_PROFILE:
      return {
        ...state,
        profile: true
      };

    case OFF_PROFILE:
      return {
        ...state,
        profile: false
      };
    default:
      return state;
  }
}
