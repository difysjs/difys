import { configureStore } from "redux-starter-kit";
import devToolsEnhancer from "remote-redux-devtools";
import rootReducer from "./reducers";

const store = configureStore({
	reducer: rootReducer,
	devTools: false,
	enhancers: [devToolsEnhancer({ realtime: true })]
});

export default store;
