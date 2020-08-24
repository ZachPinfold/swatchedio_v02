import {
  GET_COLORS,
  COLOR_ERROR,
  GET_RANDOM_COLORS,
  GET_SECOND_COLORS
} from "../actions/types";

const initialState = {
  loading: true,
  randomLoad: true,
  firstLoad: true,
  secondLoad: true,
  colors: null,
  colors2: null,
  error: {}
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_COLORS:
      return {
        ...state,
        loading: false,
        colors: payload,
        firstLoad: false
      };
    case GET_SECOND_COLORS:
      return {
        ...state,
        loading: false,
        colors2: payload,
        secondLoad: false
      };
    case GET_RANDOM_COLORS:
      return {
        ...state,
        loading: false,
        colors: payload,
        randomLoad: false
      };
    case COLOR_ERROR:
      return {
        ...state,
        loading: false,
        colors: payload,
        error: payload,
        colors: null
      };
    default:
      return state;
  }
}
