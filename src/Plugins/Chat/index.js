import Plugin from "../../Modules/PluginAPI";
import config from "./config";
import { logger } from "../../Libs";

const info = {
	name: "Chat",
	description: "Handles chat features",
	author: "Difys",
	version: "0.0.1",
	config
};

/* ============== C H A T ============== */

export default class Chat extends Plugin {
	constructor() {
		super(info);
		this.config = info.config;
		this.listeners = [
			this.ChatServerMessage,
			this.ChatServerWithObjectMessage
		];
		this.exports = [this.sendMsg];
		// this.connections = {username: Socket}
	}

	mount(connections) {
		// TODO: config check
		this.log("Plugin up");
		for (let username in this.config.accounts) {
			if (connections.hasOwnProperty(username)) {
				this.connections[username] = connections[username];
				this.log(`${username} hooked`);
			} else {
				this.log(
					`Couldnt find ${username}, are you sure you added it in /config/accounts?`,
					"error"
				);
			}
		}
	}

	ChatServerMessage(payload) {
		const { socket, data } = payload;
		const username = socket.account.username;
		const { content, senderName, channel } = data;
		Chat.logger(content, senderName, channel, username);
	}

	ChatServerWithObjectMessage(payload) {
		const { socket, data } = payload;
		const username = socket.account.username;
		const { content, senderName, channel } = data;
		Chat.logger(content, senderName, channel, username);
	}

	sendMsg(username) {}

	static logger(content, senderName, channel, username) {
		logger.info(
			`CHAT | ${username} | [${channel}][${senderName}] >> ${content}`
		);
	}
}
