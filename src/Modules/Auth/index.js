import HelloConnectMessage from "./messages/HelloConnectMessage";
import IdentificationSuccessMessage from "./messages/IdentificationSuccessMessage";
import ServersListMessage from "./messages/ServersListMessage";
import SelectedServerDataMessage from "./messages/SelectedServerDataMessage";
import IdentificationFailedMessage from "./messages/IdentificationFailedMessage";
import IdentificationFailedBannedMessage from "./messages/IdentificationFailedBannedMessage";
import serverDisconnecting from "./messages/serverDisconnecting";
import ServerStatusUpdateMessage from "./messages/ServerStatusUpdateMessage";

const Auth = [
	HelloConnectMessage,
	IdentificationSuccessMessage,
	ServersListMessage,
	SelectedServerDataMessage,
	IdentificationFailedMessage,
	IdentificationFailedBannedMessage,
	serverDisconnecting,
	ServerStatusUpdateMessage
];

export default Auth;
