import Primus from "primus";
import { modules, constants, general } from "../../Config";
import store from "../Store";
import ServerAck from "./serverAck";
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
		this.serverAckSequenceNumber = 1;
	}

	send(call, data = null) {
		this.write({ call, data });
		const message = call === "sendMessage" ? data.type : call;
		logger.debug(`SOCKET | \u001b[32mSND\u001b[37m | ${message}`);
	}

	sendMessage(type, data) {
		const serverAck = new ServerAck(
			this.eventEmitter,
			this.serverAckSequenceNumber
		);
		this.send("sendMessage", { type, data });
		this.serverAckSequenceNumber++;
		return serverAck;
	}

	load(allListeners) {
		const state = store.getState();
		const { appVersion, buildVersion } = state.metadata;
		this.eventEmitter = new EventEmitter();
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
		this.eventEmitter.on(listeners);
		this.eventEmitter.on("BasicAckMessage", payload => {
			this.serverAckSequenceNumber = payload.data.seq;
		});
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
				this.eventEmitter.emit(data._messageType, payload);
			})
			.on("reconnected", () => logger.debug(`TODO: reconnected`))
			.on("error", error => logger.error(new Error(error)))
			.on("end", () => {
				if (this.phase === "LOGGING IN") {
					logger.debug(`SOCKET | \u001b[33mSWITCHING TO GAME SERVER`);
				} else {
					logger.warn(
						`\u001b[31m${this.account.username} disconnected`
					);
				}
			})
			.open();
	}

	static getUrl(phase, account, sessionID) {
		const socketUrl =
			phase === "SWITCHING TO GAME"
				? account.auth.selectedServerData.access
				: constants.baseUrl;

		const url = new URL(socketUrl);
		url.pathname = "/primus/";
		url.searchParams.append("STICKER", sessionID);
		return url.href;
	}
}
