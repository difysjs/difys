import store from "../../Store";

export default function HelloConnectMessage(payload) {
	const { socket, data } = payload;
	socket.account.salt = data.salt;
	socket.account.key = data.key;
	socket.send("login", {
		key: socket.account.key,
		salt: socket.account.salt,
		token: store.getState().accounts[socket.account.username].auth.token,
		username: socket.account.username
	});
}
