import HelloConnectMessage from "./messages/HelloConnectMessage";
import assetsVersionChecked from "./messages/assetsVersionChecked";
import IdentificationSuccessMessage from "./messages/IdentificationSuccessMessage";
import ServersListMessage from "./messages/ServersListMessage";
import SelectedServerDataMessage from "./messages/SelectedServerDataMessage";
import IdentificationFailedMessage from "./messages/IdentificationFailedMessage";
import IdentificationFailedBannedMessage from "./messages/IdentificationFailedBannedMessage";
import serverDisconnecting from "./messages/serverDisconnecting";

const Auth = [
	HelloConnectMessage,
	assetsVersionChecked,
	IdentificationSuccessMessage,
	ServersListMessage,
	SelectedServerDataMessage,
	IdentificationFailedMessage,
	IdentificationFailedBannedMessage,
	serverDisconnecting
];

export default Auth;
