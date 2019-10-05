import { accountsList, general } from "../Config";
import { logger, handleProxy } from "../Libs";
import store from "../Modules/Store";
import slices from "../Modules/Store/reducers/slices";
import Connection from "../Modules/Connection";
import Socket from "../Modules/Connection/Socket";
import Auth from "../Modules/Auth";
import Game from "../Modules/Game";

const { addAccount, setStatus } = slices.accounts.actions;

export default class ModuleLoader {
	constructor() {
		this.connections = {};
		this.listeners = {
			auth: Auth,
			game: Game
		};
	}

	async mount(pluginLoader) {
		logger.info("CORE | Loading accounts");

		for (const username in accountsList) {
			const account = accountsList[username];

			if (account.disabled) {
				logger.warn(`[ ${username} ] Account disabled`);
				continue;
			}
			store.dispatch(addAccount({ username: account.username }));
			store.dispatch(
				setStatus({ username: account.username, status: "INITIATING" })
			);
		}
		if (general.statusUpdates.enabled) {
			setInterval(() => {
				const accounts = store.getState().accounts;

				for (const username in this.connections) {
					logger.info(
						`| ${username} | \u001b[32m${accounts[username].status}`
					);
				}
			}, general.statusUpdates.interval * 60000);
		}
		this.listeners.plugins = pluginLoader.listeners;
	}

	connectAccounts() {
		for (const username in accountsList) {
			this.connectAccount(accountsList[username]);
		}
	}

	async connectAccount(account) {
		if (account.disabled) {
			return;
		}
		const username = account.username;
		const socket = await this.getSocketConnection(account);
		this.connections[username] = socket;

		for (const pluginName in global.Plugin) {
			await global.Plugin[pluginName].hook(account);
		}
		socket.on("destroy", () => this.loadGameSocketConnection(account));
		socket.load(this.listeners);
	}

	async getSocketConnection(account) {
		logger.info(this.getInitPhaseText(account.username, "1/3"));
		const connection = new Connection({
			username: account.username,
			password: account.password,
			agent: handleProxy(account.proxy)
		});
		let socket;
		try {
			socket = await connection.mount();
			logger.info(this.getInitPhaseText(account.username, "2/3"));
		} catch (error) {
			logger.error(new Error(error));
		}
		return socket;
	}

	loadGameSocketConnection(account) {
		const username = account.username;
		logger.info(this.getInitPhaseText(username, "3/3"));
		const socket = new Socket(
			store.getState().accounts[username].auth.sessionID,
			username
		);
		for (const pluginName in global.Plugin) {
			global.Plugin[pluginName].connections[username] = socket;
		}
		socket.load(this.listeners);
		socket.account.reconnect = () => {
			socket.send("disconnecting", "CLIENT_CLOSING");
			setTimeout(
				() => this.connectAccount(account),
				general.delays.reconnect
			);
		};
		this.connections[username] = socket;
		logger.info(`CONNECTION | ${username} | Hooked successfuly`);
	}

	getInitPhaseText(username, phase) {
		return `CONNECTION | ${username} | Initiating account [ Phase ${phase} ]`;
	}
}
