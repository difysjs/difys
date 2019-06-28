/* Libs */
import axios from "axios";

/* Modules */
import Connection from "./Modules/Connection";

/* Tools */
import logger from "../Tools/Logger";

/* Configuration */
import { constants, clientConfig } from "../../config";

/**
 *
 */
export default class Core {
	constructor() {
		this.appVersion = String;
		this.buildVersion = String;
		this.accounts = Array;
	}

	async init() {
		await this.getMetadata();
		await this.initConnection();
	}

	async initConnection() {
		this.accounts = clientConfig.accounts.map(async account => {
			let gameConfig = await axios.get(constants.configURL);
			let connection = new Connection(gameConfig);
			await connection.setKey(account.username, account.password);
			await connection.setToken();
		});
	}

	async getMetadata() {
		let request = await axios.get(constants.appVersionRequestConfig); // Get app version
		this.appVersion = request.results[0].version;

		// Get Build version
		request = await axios.get(constants.buildVersionUrl);
		const regex = /.*buildVersion=("|')([0-9]*\.[0-9]*\.[0-9]*)("|')/g;
		this.buildVersion = regex.exec(request.substring(1, 10000))[2]; // Watch this code on game updates
	}
}
