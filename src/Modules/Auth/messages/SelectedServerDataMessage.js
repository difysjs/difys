import store from "../../Store";
import { accounts } from "../../Store/reducers/slices";

export default function SelectedServerDataMessage(payload) {
	const { socket, data } = payload;
	const username = socket.account.username;
	const selectedServerData = {
		address: data.address,
		port: data.port,
		id: data.serverId,
		ticket: data.ticket,
		access: data._access
	};
	store.dispatch(
		accounts.actions.setSelectedServerData({
			username,
			selectedServerData
		})
	);
	store.dispatch(
		accounts.actions.setStatus({
			username,
			status: "SWITCHING TO GAME"
		})
	);
	socket.send("disconnecting", "SWITCHING_TO_GAME");
	socket.destroy();
}
