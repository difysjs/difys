import { createSlice } from "redux-starter-kit";
import * as actions from "../actions";

const metadata = createSlice({
	slice: "metadata",
	initialState: {},
	reducers: actions.metadataActions
});

const accounts = createSlice({
	slice: "accounts",
	initialState: {},
	reducers: actions.accountActions
});

export { metadata, accounts };
