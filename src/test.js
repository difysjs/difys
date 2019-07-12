import store from "./Modules/Store";
import { metadata, accounts } from "./Modules/Store/reducers/slices";

const { setAppVersion, setBuildVersion } = metadata.actions;
const { addAccount, setAccountId } = accounts.actions;

console.log(store.getState());

const unsubscribe = store.subscribe(() => console.log(store.getState()));

// Dispatch some actions
store.dispatch(setAppVersion("some random app version"));
store.dispatch(setBuildVersion("some random build version"));
store.dispatch(addAccount({ username: "someUsername" }));
store.dispatch(setAccountId({ username: "someUsername", accountId: 1 }));

// Stop listening to state updates
unsubscribe();
