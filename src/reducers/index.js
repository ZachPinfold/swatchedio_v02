import { combineReducers } from "redux";
import auth from "./auth";
import colors from "./colors";
import layout from "./layout";

export default combineReducers({ auth, colors, layout });
