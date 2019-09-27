import { createSlice } from "redux-starter-kit";
import actions from "../actions";

let slices = {};

for (let action in actions) {
	slices[action] = createSlice({
		slice: action,
		initialState: {},
		reducers: actions[action]
	});
}

export default slices;
