import store from "../../Store";
import slices from "../../Store/reducers/slices";

const { gameContextCreate } = slices.accounts.actions;

export default function GameContextCreateMessage(payload) {
	const socket = payload.socket;
	const username = socket.account.username;

	store.dispatch(gameContextCreate({ username, context: 1 }));

	socket.eventEmitter.once("BasicNoOperationMessage", () =>
		store.dispatch(gameContextCreate({ username, context: 2 }))
	);
}
