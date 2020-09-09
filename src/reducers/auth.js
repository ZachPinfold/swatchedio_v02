import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from "../actions/types";

const initiaState = {
  isAuthenticated: false,
  loading: true,
  username: null,
  id: null
};

export default function (state = initiaState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        username: payload.username,
        id: payload.id
      };
    case REGISTER_SUCCESS:
      return {
        ...state
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        loading: false
      };
    default:
      return state;
  }
}
