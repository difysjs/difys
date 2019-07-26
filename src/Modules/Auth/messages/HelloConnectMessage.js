import store from "../../Store";

export default function HelloConnectMessage(payload) {
	const { socket, data } = payload;
	socket.account.salt = data.salt;
	socket.account.key = data.key;
	socket.send("checkAssetsVersion", {
		staticDataVersion: store.getState().metadata.staticDataVersion,
		assetsVersion: store.getState().metadata.assetsVersion
	});
}
