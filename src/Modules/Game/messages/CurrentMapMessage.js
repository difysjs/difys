import store from "../../Store";
import slices from "../../Store/reducers/slices";

export default function CurrentMapMessage(payload) {
	const { socket, data } = payload;
	const username = socket.account.username;
	const account = store.getState().accounts[username];
	const mapId = data.mapId;
	store.dispatch(slices.accounts.actions.setMapId({ username, mapId }));

	if (account.status == "MAP TRANSITION") {
		socket.sendMessage("MapInformationsRequestMessage", { mapId });
	}
}
