import { createSlice } from "redux-starter-kit";
import {
	addAccount,
	setAccountId,
	setAppVersion,
	setBuildVersion
} from "../actions";

const metadata = createSlice({
	slice: "metadata",
	initialState: {},
	reducers: {
		setAppVersion,
		setBuildVersion
	}
});

const accounts = createSlice({
	slice: "accounts",
	initialState: {},
	reducers: {
		addAccount,
		setAccountId
	}
});

export { metadata, accounts };
