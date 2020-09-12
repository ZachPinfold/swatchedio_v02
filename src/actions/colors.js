import axios from "axios";
import {
  GET_COLORS,
  COLOR_ERROR,
  GET_RANDOM_COLORS,
  GET_SECOND_COLORS,
  SECOND_PAGE_RESET,
  GET_HEX_COLOURS
} from "./types";
import { API, graphqlOperation } from "aws-amplify";
import { listColorHexs, listColorHexDiscovers } from "../graphql/queries";

// load all colors

export const getColors = (
  random,
  first,
  discover,
  colour
) => async dispatch => {
  console.log(random, first, discover, colour);
  try {
    if (discover === "hexCode") {
      const runHexCodeAPI = async () => {
        const result1 = await API.graphql(
          graphqlOperation(listColorHexDiscovers, {
            format: "json",
            hex: colour ? colour : "null"
          })
        );
        const obj = JSON.parse(result1.data.listColorHexDiscovers);
        console.log(obj);

        const randomColour = obj[Math.floor(Math.random() * obj.length)];

        if (randomColour.colors.length === 5) return randomColour.colors;
        else return runHexCodeAPI();
      };

      const paletteAPIResult = runHexCodeAPI();

      paletteAPIResult.then(payload => {
        dispatch({
          type: random === "new_random" ? GET_HEX_COLOURS : GET_COLORS,
          payload: { payload, colour }
        });
      });
    }

    if (discover === "discover") {
      console.log("disco");
      const runPaletteAPI = async () => {
        const result1 = await API.graphql(
          graphqlOperation(listColorHexDiscovers, {
            format: "json",
            hueOption: colour ? colour : "null"
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

    if (discover !== "discover" && discover !== "hexCode") {
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
