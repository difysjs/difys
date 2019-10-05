import store from "../../Store";
import slices from "../../Store/reducers/slices";

const { gameContextCreate } = slices.accounts.actions;

export default function GameContextCreateMessage(payload) {
	const username = payload.socket.account.username;
	store.dispatch(gameContextCreate({ username }));
}
