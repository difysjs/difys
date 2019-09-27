import store from "../../Store";
import slices from "../../Store/reducers/slices";

export default function GameContextCreateMessage(payload) {
	const { socket } = payload;
	const username = socket.account.username;
	store.dispatch(slices.accounts.actions.gameContextCreate({ username }));
}
