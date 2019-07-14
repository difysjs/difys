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
	setCoords,
	// pushEntity,
	// removeEntity
	addItem,
	removeItem,
	setEquipment
} = accounts.actions;
const username = "Alistar";
const x = 3;
const y = 5;

// Dispatch some actions
store.dispatch(setAppVersion("some random app version"));
store.dispatch(setBuildVersion("some random build version"));
store.dispatch(addAccount({ username }));
store.dispatch(initAccount({ username }));
const unsubscribe = store.subscribe(() => {
	// console.log(store.getState().accounts[username].gameData.map);
	console.log(store.getState().accounts[username].gameData.inventory);
});
store.dispatch(setAccountId({ username, accountId: 1 }));
store.dispatch(setHaapi({ username, haapi: "some haapi key" }));
store.dispatch(setToken({ username, token: "some Token" }));
store.dispatch(setStatus({ username, status: "CONNECTING" }));
store.dispatch(setCoords({ username, x, y }));
/* store.dispatch(
	pushEntity({
		username,
		entity: {
			id: 16543,
			name: "in-game-username",
			level: 200
		}
	})
);
store.dispatch(
	pushEntity({
		username,
		entity: {
			id: 24556,
			name: "anotherDude",
			level: 150
		}
	})
);
store.dispatch(removeEntity({ username, id: 16543 })); */

store.dispatch(addItem({ username, item: { id: "200", quantity: "3" } }));
store.dispatch(addItem({ username, item: { id: "120", quantity: "49" } }));
store.dispatch(removeItem({ username, id: 200 }));
store.dispatch(setEquipment({ username, equipment: [45, 23, 47] }));

// Stop listening to state updates
unsubscribe();
const state = store.getState();
console.log("======= S E L E C T O R S =======");
// console.log(accounts.selectors.getAccounts(state)[username].gameData.map);
console.log(accounts.selectors.getAccounts(state)[username].gameData.inventory);
