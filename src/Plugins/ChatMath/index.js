import { myLogger, evaluateMath } from "./utils/";
import store from "../../Modules/Store";
import slices from "../../Modules/Store/reducers/slices";
import pluginPackage from "./plugin.json";
import config from "./config.json";

export default class ChatMath {
	constructor() {
		this.config = config;
		this.package = pluginPackage;
		this.listeners = [this.ChatServerMessage];
	}

	mount() {
		// we inform the user that we finished mounting the plugin
		myLogger.info("Mounted");
	}

	hook(account) {
		// In each accounts we have a "plugins" object where we can add a new entry to store data of our plugin
		// we let the user know that we hooked the account
		store.dispatch(
			slices.accounts.actions.addPlugin({
				username: account.username,
				pluginName: this.package.name,
				defaultValue: { solves: 0 }
			})
		);
		myLogger.info(`${account.username} hooked successfully!`);
	}

	async ChatServerMessage(payload) {
		const { socket, data } = payload;
		const { channel, content } = data;

		// We check if it's a private message or not
		// 9 is the id for private messages
		if (channel !== 9) {
			return;
		}
		// Now we check if the message starts with "!math"
		// With do that with Regular Expressions
		const isCommand = /^(!math)/g;
		if (!isCommand.test(content)) {
			return;
		}
		// It is! now let's grab our mathematical operation from the message
		const regex = /([A-Za-z0-9-+\-*/()[\]]+)$/g;
		const mathExp = content.match(regex);
		// We send this to our evaluator utility function
		const response = evaluateMath(mathExp);
		// We grab the senderName from the data payload
		const senderName = data.senderName;
		// We log it to debug
		myLogger.debug(`Received a math expression from ${senderName}`);
		// We send the response to him
		// always wrap anything that has await inside "try"
		// this way if there is an error we can send it
		try {
			socket.sendMessage("ChatClientPrivateMessage", {
				// our evaluateMath is an async function it returns a promise
				// let's await that promise
				content: await response,
				receiver: senderName
			});
			store.dispatch(
				slices.accounts.actions.incrementSolves({
					username: socket.account.username
				})
			);
		} catch (error) {
			// we log the error
			myLogger.error(error);
			// we also send it to the senderName inside the game, why not :)
			socket.sendMessage("ChatClientPrivateMessage", {
				content: "An error has occured!",
				receiver: senderName
			});
		}
	}
}
