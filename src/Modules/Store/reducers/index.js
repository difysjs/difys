import { combineReducers } from "redux";
import { metadata, accounts } from "./slices";

const rootReducer = combineReducers({
	metadata: metadata.reducer,
	accounts: accounts.reducer
});

export default rootReducer;
