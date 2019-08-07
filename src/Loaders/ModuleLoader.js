import { accountsList, general } from "../Config";
import { logger, handleProxy } from "../Libs";
import store from "../Modules/Store";
import { accounts } from "../Modules/Store/reducers/slices";
import Connection from "../Modules/Connection";
// import Server from "../Modules/Server";
import Socket from "../Modules/Connection/Socket";
import Auth from "../Modules/Auth";
import Game from "../Modules/Game";

export default class ModuleLoader {
	constructor() {
		this.connections = {};
		this.listeners = {
			auth: Auth,
			game: Game
		};
		/* if (general.server)
			this.server = new Server(general.port, general.password); */
	}

	async mount() {
		const { addAccount, setStatus } = accounts.actions;
		for (let username in accountsList) {
			const agent = handleProxy(accountsList[username].proxy);
			logger.info(
				`CONNECTION | ${username} | Initiating account [ Phase 1/3 ]`
			);

			store.dispatch(addAccount({ username }));
			store.dispatch(setStatus({ username, status: "INITIATING" }));
			let connection = new Connection({
				username,
				password: accountsList[username].password,
				agent
			});
			try {
				this.connections[username] = await connection.mount();
				logger.info(
					`CONNECTION | ${username} | Initiating account [ Phase 2/3 ]`
				);
			} catch (error) {
				logger.error(new Error(error));
			}
			this.connections[username].load(this.listeners);
			this.connections[username].on("destroy", () => {
				logger.info(
					`CONNECTION | ${username} | Initiating account [ Phase 3/3 ]`
				);
				this.connections[username] = new Socket(
					store.getState().accounts[username].auth.sessionID,
					username
				);
				this.connections[username].load(this.listeners);
				logger.info(`CONNECTION | ${username} | Hooked successfuly`);
			});
		}
		// this.server.mount(this.connections);
	}
}
