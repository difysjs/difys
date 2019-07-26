import serverDisconnecting from "./messages/serverDisconnecting";
import CharactersListMessage from "./messages/CharactersListMessage";
import HelloGameMessage from "./messages/HelloGameMessage";
import TrustStatusMessage from "./messages/TrustStatusMessage";

const Game = [
	serverDisconnecting,
	CharactersListMessage,
	HelloGameMessage,
	TrustStatusMessage
];

export default Game;
