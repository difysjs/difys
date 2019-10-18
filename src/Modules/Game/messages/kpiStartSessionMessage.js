import store from "../../Store";

function kpiStartCallBack(socket) {
	const account = store.getState().accounts[socket.account.username];

	socket.sendMessage("ObjectAveragePricesGetMessage");
	socket.sendMessage("MapInformationsRequestMessage", {
		mapId: account.mapId
	});
}

export default function kpiStartSessionMessage(payload) {
	const { socket } = payload;
	const account = store.getState().accounts[socket.account.username];

	switch (account.gameContextCreated) {
		case 0:
			socket.eventEmitter.once("GameContextCreateMessage", () => {
				socket.eventEmitter.once(
					"bakHardToSoftCurrentRateSuccess",
					() => kpiStartCallBack(socket)
				);
			});
			break;
		case 1:
			socket.eventEmitter.once("bakHardToSoftCurrentRateSuccess", () =>
				kpiStartCallBack(socket)
			);
			break;
		case 2:
			kpiStartCallBack(socket);
			break;
	}
}
