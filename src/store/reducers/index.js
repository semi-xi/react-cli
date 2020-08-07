import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import order from "./order";

export default history =>
  combineReducers({
    router: connectRouter(history),
    order
  });
