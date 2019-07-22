// import HttpsProxyAgent from "https-proxy-agent";
import Primus from "primus";
import { modules, constants, general } from "../../Config";
import store from "../Store";
import { logger, emitter } from "../../Libs";

const PrimusSocket = Primus.createSocket({
	transformer: "engine.io"
});

export default class Socket extends PrimusSocket {
	constructor(sessionID, username) {
		const url = new URL(constants.baseUrl);
		url.pathname = "/primus/";
		url.searchParams.append("STICKER", sessionID);
		const socketOptions = modules.socket.options();
		super(url.href, socketOptions);
		this.account = {
			username,
			salt: "",
			key: []
		};
	}

	async send(call, data = null) {
		const payload = {
			call,
			data
		};
		emitter.emit("send", payload);
		this.write({ call, data });
	}

	async sendMessage(type, data) {
		// emitter
		this.send("sendMessage", { type, data });
	}

	load() {
		const { appVersion, buildVersion } = store.getState().metadata;

		this.on("open", () => {
			const payload = {
				socket: this,
				language: general.language,
				server: "login" /* || { adress, port, id } */,
				client: "android",
				appVersion,
				buildVersion
			};
			emitter.emit("open", payload);
		})
			.on("data", data => {
				const payload = {
					socket: this,
					data
				};
				logger.debug(`SOCKET | RCV | ${data._messageType}`);
				emitter.emit(data._messageType, payload);
			})
			.on("reconnected", () => {
				emitter.emit("reconnected");
			})
			.on("error", error => {
				emitter.emit("error", error);
			})
			.on("end", () => {
				emitter.emit("end");
			})
			.open();
	}
}
