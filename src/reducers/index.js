import { combineReducers } from "redux";
import auth from "./auth";
import colors from "./colors";
import layout from "./layout";
import swatchReducer from "./swatchReducer";

export default combineReducers({ auth, colors, layout, swatchReducer });
