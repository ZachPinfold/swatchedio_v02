import {
  GET_COLORS,
  COLOR_ERROR,
  GET_RANDOM_COLORS,
  GET_SECOND_COLORS,
  SECOND_PAGE_RESET,
  GET_HEX_COLOURS
} from "../actions/types";

const initialState = {
  loading: true,
  randomLoad: true,
  firstLoad: true,
  secondLoad: true,
  colors: null,
  colors2: null,
  error: {},
  hex: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_COLORS:
      return {
        ...state,
        loading: false,
        colors: payload,
        firstLoad: false,
        hex: null
      };
    case GET_SECOND_COLORS:
      return {
        ...state,
        loading: false,
        colors2: payload,
        secondLoad: false,
        hex: null
      };
    case GET_RANDOM_COLORS:
      return {
        ...state,
        loading: false,
        colors: payload,
        randomLoad: false,
        hex: null
      };
    case GET_HEX_COLOURS:
      console.log(payload);
      return {
        ...state,
        loading: false,
        colors: payload.payload,
        randomLoad: false,
        hex: payload.colour
      };
    case COLOR_ERROR:
      return {
        ...state,
        loading: false,
        colors: payload,
        error: payload,
        colors: null
      };
    case SECOND_PAGE_RESET:
      return {
        loading: true,
        randomLoad: true,
        firstLoad: true,
        secondLoad: true,
        colors: null,
        colors2: null,
        error: {}
      };
    default:
      return state;
  }
}
