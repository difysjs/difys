import store from "../../Store";

function kpiStartCallBack(socket) {
	socket.sendMessage("ObjectAveragePricesGetMessage");

	socket.eventEmitter.once(
		"BasicNoOperationMessage",
		() => {
			const username = socket.account.username;
			const account = store.getState().accounts[username];

			socket.sendMessage("MapInformationsRequestMessage", {
				mapId: account.mapId
			});
		},
		this
	);
}

export default function kpiStartSessionMessage(payload) {
	const { socket } = payload;
	const account = store.getState().accounts[socket.account.username];

	if (account.gameContextCreated) {
		kpiStartCallBack(socket);
	} else {
		socket.eventEmitter.once(
			"GameContextCreateMessage",
			() => kpiStartCallBack(socket),
			this
		);
	}
}
