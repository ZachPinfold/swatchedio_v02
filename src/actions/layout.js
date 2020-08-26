import { SHOW_EXPLORE, NEW_PALETTE, HIDE_EXPLORE } from "./types";

// Open discover

export const openDiscover = () => dispatch => {
  dispatch({ type: SHOW_EXPLORE });
};

// Close discover

export const closeDiscover = () => dispatch => {
  dispatch({ type: HIDE_EXPLORE });
};

// new pallete button

export const newPalette = () => dispatch => {};
