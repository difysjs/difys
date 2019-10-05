import { combineReducers } from "redux";
import slices from "./slices";

const reducers = {};

for (const slice in slices) {
	reducers[slice] = slices[slice].reducer;
}

const rootReducer = combineReducers(reducers);

export default rootReducer;
