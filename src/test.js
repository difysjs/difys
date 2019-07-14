import store from "./Modules/Store";
import { metadata, accounts } from "./Modules/Store/reducers/slices";

const { setAppVersion, setBuildVersion } = metadata.actions;
const {
	addAccount,
	initAccount,
	setAccountId,
	setStatus,
	setHaapi,
	setToken,
	setCoords
} = accounts.actions;

console.log(store.getState());

const unsubscribe = store.subscribe(() => console.log(store.getState()));

// Dispatch some actions
const username = "Alistar";
const x = 3;
const y = 5;
store.dispatch(setAppVersion("some random app version"));
store.dispatch(setBuildVersion("some random build version"));
store.dispatch(addAccount({ username }));
store.dispatch(initAccount({ username }));
store.dispatch(setAccountId({ username, accountId: 1 }));
store.dispatch(setHaapi({ username, haapi: "some haapi key" }));
store.dispatch(setToken({ username, token: "some Token" }));
store.dispatch(setStatus({ username, status: "CONNECTING" }));
store.dispatch(setCoords({ username, x, y }));

// Stop listening to state updates
unsubscribe();

const state = store.getState();
console.log("======= S E L E C T O R S =======");
console.log(accounts.selectors.getAccounts(state)[username]);
