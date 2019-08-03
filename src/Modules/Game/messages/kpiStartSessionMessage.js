import store from "../../Store";

export default function kpiStartSessionMessage(payload) {
	const { socket } = payload;
	const username = socket.account.username;
	const mapId = store.getState().accounts[username].mapId;
	socket.sendMessage("ObjectAveragePricesGetMessage");
	socket.sendMessage("MapInformationsRequestMessage", { mapId });
}
