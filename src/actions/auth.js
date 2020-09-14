import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT
} from "./types";
import { Auth } from "aws-amplify";
import { addProject } from "../actions/swatch";

// Load User

export const loadUser = () => async dispatch => {
  try {
    await Auth.currentSession();
    const user = await Auth.currentAuthenticatedUser();
    dispatch({
      type: USER_LOADED,
      payload: { username: user.username, id: user.attributes.sub }
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Register User

export const register = (username, password, email, cb) => async dispatch => {
  try {
    const signUpResponse = await Auth.signUp({
      username,
      password,
      attributes: {
        email
      }
    });
    dispatch(
      addProject(
        "Master",
        0,
        signUpResponse.userSub,
        signUpResponse.user.username
      )
    );
    cb("no error");
    dispatch({ type: REGISTER_SUCCESS, payload: username });
  } catch (error) {
    let err = null;
    !error.message ? (err = { message: error }) : (err = error);
    cb(err);
    dispatch({
      type: REGISTER_FAIL
    });
  }
};

// Login User

export const login = (username, password, cb) => async dispatch => {
  try {
    const user = await Auth.signIn(username, password);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { username: user.username, id: user.attributes.sub }
    });
    cb("no error");
  } catch (error) {
    let err = null;
    !error.message ? (err = { message: error }) : (err = error);
    cb(err);
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Logout User

export const logout = () => async dispatch => {
  Auth.signOut();
  dispatch({ type: LOGOUT });
};
