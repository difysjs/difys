import HelloConnectMessage from "./messages/HelloConnectMessage";
import IdentificationSuccessMessage from "./messages/IdentificationSuccessMessage";
import ServersListMessage from "./messages/ServersListMessage";
import SelectedServerDataMessage from "./messages/SelectedServerDataMessage";
import IdentificationFailedMessage from "./messages/IdentificationFailedMessage";
import IdentificationFailedBannedMessage from "./messages/IdentificationFailedBannedMessage";
import serverDisconnecting from "./messages/serverDisconnecting";
import ServerStatusUpdateMessage from "./messages/ServerStatusUpdateMessage";
import NicknameRegistrationMessage from "./messages/NicknameRegistrationMessage";

const Auth = [
	HelloConnectMessage,
	IdentificationSuccessMessage,
	ServersListMessage,
	SelectedServerDataMessage,
	IdentificationFailedMessage,
	IdentificationFailedBannedMessage,
	serverDisconnecting,
	ServerStatusUpdateMessage,
	NicknameRegistrationMessage
];

export default Auth;
