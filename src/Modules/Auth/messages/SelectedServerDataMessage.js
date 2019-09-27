import store from "../../Store";
import slices from "../../Store/reducers/slices";

const { setSelectedServerData, setStatus } = slices.accounts.actions;

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
		setSelectedServerData({
			username,
			selectedServerData
		})
	);
	store.dispatch(
		setStatus({
			username,
			status: "SWITCHING TO GAME"
		})
	);
	socket.send("disconnecting", "SWITCHING_TO_GAME");
	socket.destroy();
}
