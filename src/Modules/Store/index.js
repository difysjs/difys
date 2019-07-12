import { configureStore } from "redux-starter-kit";
// import devToolsEnhancer from "remote-redux-devtools";
import rootReducer from "./reducers";

const store = configureStore({
	reducer: rootReducer,
	devTools: false
});

export default store;
