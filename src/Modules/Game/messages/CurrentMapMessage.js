import store from "../../Store";
import { accounts } from "../../Store/reducers/slices";

export default function CurrentMapMessage(payload) {
	const { socket, data } = payload;
	const username = socket.account.username;
	const mapId = data.mapId;
	store.dispatch(accounts.actions.setMapId({ username, mapId }));
}
