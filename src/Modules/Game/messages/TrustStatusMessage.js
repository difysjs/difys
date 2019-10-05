export default function TrustStatusMessage(payload) {
	payload.socket.sendMessage("CharactersListRequestMessage");
}
