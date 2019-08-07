// import HttpsProxyAgent from "https-proxy-agent";
import Primus from "primus";
import { modules, constants, general } from "../../Config";
import store from "../Store";
import { logger, EventEmitter } from "../../Libs";

const PrimusSocket = Primus.createSocket({
	transformer: "engine.io"
});

export default class Socket extends PrimusSocket {
	constructor(sessionID, username, agent) {
		const state = store.getState();
		const account = state.accounts[username];
		const phase = account.status;
		const socketUrl = Socket.getUrl(phase, account, sessionID);
		const socketOptions = modules.socket.options(agent);
		super(socketUrl, socketOptions);
		this.phase = phase;
		this.account = {
			username,
			salt: "",
			key: []
		};
		this.server = "login";
	}

	async send(call, data = null) {
		const payload = {
			call,
			data
		};
		this.write({ call, data });
		const message =
			payload.call === "sendMessage" ? payload.data.type : payload.call;
		logger.debug(`SOCKET | \u001b[32mSND\u001b[37m | ${message}`);
	}

	async sendMessage(type, data) {
		this.send("sendMessage", { type, data });
	}

	load(allListeners) {
		const state = store.getState();
		const { appVersion, buildVersion } = state.metadata;
		const emitter = new EventEmitter();
		let listeners = allListeners.auth;

		if (this.phase === "SWITCHING TO GAME") {
			const account = state.accounts[this.account.username];
			this.server = {
				address: account.auth.selectedServerData.address,
				port: account.auth.selectedServerData.port,
				id: account.auth.selectedServerData.id
			};
			listeners = [].concat(allListeners.game, allListeners.plugins);
		}
		emitter.on(listeners);

		this.on("open", () => {
			this.send("connecting", {
				language: general.language,
				server: this.server,
				client: "android",
				appVersion,
				buildVersion
			});
		})
			.on("data", data => {
				const payload = {
					socket: this,
					data
				};
				logger.debug(
					`SOCKET | \u001b[33mRCV\u001b[37m | ${data._messageType}`
				);
				emitter.emit(data._messageType, payload);
			})
			.on("reconnected", () => {
				logger.debug(`TODO: reconnected`);
			})
			.on("error", error => {
				logger.error(new Error(error));
			})
			.on("end", () => {
				if (this.phase === "LOGGING IN")
					logger.debug(`SOCKET | \u001b[33mSWITCHING TO GAME SERVER`);
				else
					logger.warn(
						`\u001b[31m${this.account.username} disconnected`
					);
			})
			.open();
	}

	static getUrl(phase, account, sessionID) {
		let socketUrl = constants.baseUrl;
		if (phase === "SWITCHING TO GAME") {
			const auth = account.auth;
			socketUrl = auth.selectedServerData.access;
		}
		let url = new URL(socketUrl);
		url.pathname = "/primus/";
		url.searchParams.append("STICKER", sessionID);
		return url.href;
	}
}
