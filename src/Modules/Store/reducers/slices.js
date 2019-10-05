import { createSlice } from "redux-starter-kit";
import actions from "../actions";

const slices = {};

for (const action in actions) {
	slices[action] = createSlice({
		slice: action,
		initialState: {},
		reducers: actions[action]
	});
}

export default slices;
