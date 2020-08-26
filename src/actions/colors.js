import axios from "axios";
import {
  GET_COLORS,
  COLOR_ERROR,
  GET_RANDOM_COLORS,
  GET_SECOND_COLORS,
  SECOND_PAGE_RESET
} from "./types";
import { API, graphqlOperation } from "aws-amplify";
import { listColorHexs } from "../graphql/queries";

// load all colors

export const getColors = (random, first) => async dispatch => {
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
