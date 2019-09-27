import { combineReducers } from "redux";
import slices from "./slices";

let reducers = {};

for (let slice in slices) {
	reducers[slice] = slices[slice].reducer;
}

const rootReducer = combineReducers(reducers);

export default rootReducer;
