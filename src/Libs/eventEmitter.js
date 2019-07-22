import EventEmitter from "events";
import { logger } from ".";
import {
	HelloConnectMessage,
	assetsVersionChecked,
	ServersListMessage
} from "../Modules/Auth";

// import store from "../Modules/Store";

const emitter = new EventEmitter();

emitter.on("open", payload => {
	const {
		socket,
		language,
		server,
		client,
		appVersion,
		buildVersion
	} = payload;
	const data = { language, server, client, appVersion, buildVersion };
	socket.send("connecting", data);
});

emitter.on("HelloConnectMessage", payload => {
	HelloConnectMessage(payload);
});

emitter.on("assetsVersionChecked", payload => {
	assetsVersionChecked(payload);
});

emitter.on("ServersListMessage", payload => {
	ServersListMessage(payload);
});

emitter.on("send", payload => {
	// if (payload.call === "connecting") return;
	const message =
		payload.call === "sendMessage" ? payload.data.type : payload.call;
	logger.debug(`SOCKET | SND | ${message}`);
});

export default emitter;
