import store from "../../Store";

function kpiStartCallBack(socket, account) {
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
				socket.eventEmitter.once("BasicNoOperationMessage", () =>
					kpiStartCallBack(socket, account)
				);
			});
			break;
		case 1:
			socket.eventEmitter.once("BasicNoOperationMessage", () =>
				kpiStartCallBack(socket, account)
			);
			break;
		case 2:
			kpiStartCallBack(socket, account);
			break;
	}
}
