import { accountsList } from "../Config";
import store from "../Modules/Store";
import { accounts } from "../Modules/Store/reducers/slices";
import Connection from "../Modules/Connection";
import { logger } from "../Libs";

// import Network from "../Modules/Network";
// import PluginManager from "../Modules/PluginManager"
export default class ModuleLoader {
	constructor() {
		this.connections = {};
	}

	async mount() {
		const { addAccount } = accounts.actions;
		for (let username in accountsList) {
			store.dispatch(addAccount({ username }));
			let connection = new Connection({
				username,
				password: accountsList[username]
			});
			// console.log(connection.account);
			try {
				logger.debug(`CONNECTION mounting process - [ ${username} ]`);
				await connection.mount();
			} catch (error) {
				logger.error(new Error(error));
			}
			this.connections[username] = connection.socket;
		}
	}
}
