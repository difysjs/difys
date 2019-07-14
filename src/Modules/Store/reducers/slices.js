import { createSlice } from "redux-starter-kit";
import metadataReducers from "./metadata";
import accountReducers from "./accounts";

const metadata = createSlice({
	slice: "metadata",
	initialState: {},
	reducers: metadataReducers
});

const accounts = createSlice({
	slice: "accounts",
	initialState: {},
	reducers: accountReducers
});

export { metadata, accounts };
