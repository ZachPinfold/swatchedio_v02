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
  }
  switch (type) {
    case HIDE_EXPLORE:
      return {
        ...state,
        discover: false
      };
  }
  switch (type) {
    case NEW_PALETTE:
      return {
        ...state,
        discover: true
      };
  }
  switch (type) {
    case ON_PROFILE:
      return {
        ...state,
        profile: true
      };
  }
  switch (type) {
    case OFF_PROFILE:
      return {
        ...state,
        profile: false
      };
    default:
      return state;
  }
}
