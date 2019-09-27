import { accountsList } from "../Config";
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

	async mount() {
		const getInitPhaseText = (username, phase) =>
			`CONNECTION | ${username} | Initiating account [ Phase ${phase} ]`;

		for (const username in accountsList) {
			const agent = handleProxy(accountsList[username].proxy);
			logger.info(getInitPhaseText(username, "1/3"));
			store.dispatch(addAccount({ username }));
			store.dispatch(setStatus({ username, status: "INITIATING" }));
			const connection = new Connection({
				username,
				password: accountsList[username].password,
				agent
			});
			try {
				this.connections[username] = await connection.mount();
				logger.info(getInitPhaseText(username, "2/3"));
			} catch (error) {
				logger.error(new Error(error));
			}
			this.connections[username].on("destroy", () => {
				logger.info(getInitPhaseText(username, "3/3"));
				this.connections[username] = new Socket(
					store.getState().accounts[username].auth.sessionID,
					username
				);
				this.connections[username].load(this.listeners);
				logger.info(`CONNECTION | ${username} | Hooked successfuly`);
			});
		}
	}
}
