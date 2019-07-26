import store from "../../Store";

export default function assetsVersionChecked(payload) {
	const { socket } = payload;
	socket.send("login", {
		key: socket.account.key,
		salt: socket.account.salt,
		token: store.getState().accounts[socket.account.username].auth.token,
		username: socket.account.username
	});
}
