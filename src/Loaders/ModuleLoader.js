import Connection from "../Modules/Connection";
import { accounts } from "../Config";
// import Network from "../Modules/Network";
// import PluginManager from "../Modules/PluginManager";

export default class ModuleLoader {
	constructor() {
		this.connections = {};
	}

	mount() {
		for (let account in accounts) {
			let connection = new Connection();
			connection.username = account.username;
			connection.password = account.password;
			this.connections[account.username] = connection;
		}
	}
}
