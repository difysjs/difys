export default function TrustStatusMessage(payload) {
	const { socket } = payload;
	socket.sendMessage("CharactersListRequestMessage");
}
