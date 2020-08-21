import axios from "axios";
import {
  GET_COLORS,
  COLOR_ERROR,
  GET_RANDOM_COLORS,
  GET_SECOND_COLORS
} from "./types";

// load all colors

export const getColors = (random, first) => async dispatch => {
  try {
    const runAxios = async () => {
      const res = await axios.get("/api/palettes/random?format=json");
      if (res.data[0].colors.length === 5) return res.data[0].colors;
      else return runAxios();
    };

    const result = runAxios();
    result.then(payload => {
      dispatch({
        type: random === "new_random" ? GET_RANDOM_COLORS : GET_COLORS,
        payload: payload
      });
    });
  } catch (error) {
    dispatch({
      type: COLOR_ERROR
    });
  }

  if (first === true) {
    try {
      const runAxios = async () => {
        const res = await axios.get("/api/palettes/random?format=json");
        if (res.data[0].colors.length === 5) return res.data[0].colors;
        else return runAxios();
      };

      const result = runAxios();
      result.then(payload => {
        dispatch({
          type: GET_SECOND_COLORS,
          payload: payload
        });
      });
    } catch (error) {
      dispatch({
        type: COLOR_ERROR
      });
    }
  }
};
