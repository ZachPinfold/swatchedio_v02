import axios from "axios";
import {
  GET_COLORS,
  COLOR_ERROR,
  GET_RANDOM_COLORS,
  GET_SECOND_COLORS,
  SECOND_PAGE_RESET
} from "./types";
import { API, graphqlOperation } from "aws-amplify";
import { listColorHexs, listColorHexDiscovers } from "../graphql/queries";

// load all colors

export const getColors = (
  random,
  first,
  discover,
  hueColour
) => async dispatch => {
  try {
    if (discover === "discover") {
      console.log(hueColour);
      const runPaletteAPI = async () => {
        const result1 = await API.graphql(
          graphqlOperation(listColorHexDiscovers, {
            format: "json",
            hueOption: hueColour ? hueColour : "null"
          })
        );
        const obj = JSON.parse(result1.data.listColorHexDiscovers);
        const randomColour = obj[Math.floor(Math.random() * obj.length)];
        if (randomColour.colors.length === 5) return randomColour.colors;
        else return runPaletteAPI();
      };

      const paletteAPIResult = runPaletteAPI();

      paletteAPIResult.then(payload => {
        dispatch({
          type: random === "new_random" ? GET_RANDOM_COLORS : GET_COLORS,
          payload: payload
        });
      });
    }

    if (discover !== "discover") {
      console.log("not discover");
      const runRandomAPI = async () => {
        const result1 = await API.graphql(
          graphqlOperation(listColorHexs, { format: "json" })
        );
        const obj = JSON.parse(result1.data.listColorHexs);
        if (obj[0].colors.length === 5) return obj[0].colors;
        else return runRandomAPI();
      };

      const randomAPIResult = runRandomAPI();

      randomAPIResult.then(payload => {
        dispatch({
          type: random === "new_random" ? GET_RANDOM_COLORS : GET_COLORS,
          payload: payload
        });
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: COLOR_ERROR
    });
  }

  if (first === true) {
    try {
      console.log("first");
      const runAPI = async () => {
        const result1 = await API.graphql(
          graphqlOperation(listColorHexs, { format: "json" })
        );
        const obj = JSON.parse(result1.data.listColorHexs);
        if (obj[0].colors.length === 5) return obj[0].colors;
        else return runAPI();
      };

      const APIResult = runAPI();

      APIResult.then(payload => {
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

// second page reset

export const secondPageReset = () => dispatch => {
  dispatch({ type: SECOND_PAGE_RESET });
};
