import { SHOW_EXPLORE, HIDE_EXPLORE, OFF_PROFILE, ON_PROFILE } from "./types";

// Open discover

export const openDiscover = () => dispatch => {
  dispatch({ type: SHOW_EXPLORE });
};

// Close discover

export const closeDiscover = () => dispatch => {
  dispatch({ type: HIDE_EXPLORE });
};

// Open profile

export const openProfile = () => dispatch => {
  dispatch({ type: ON_PROFILE });
};

// Close profile

export const closeProfile = () => dispatch => {
  dispatch({ type: OFF_PROFILE });
};

// new pallete button

export const newPalette = () => dispatch => {};
