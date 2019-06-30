import logger from "./Logger";
import * as fs from "fs-extra";

export default class Checker {
	constructor() {
		this.configHealthy = Boolean;
		this.accountsHealthy = Boolean;
	}

	async init() {
		if (fs.existsSync("../Config")) {
			await this.config();
			await this.accounts();
		} else {
			logger.warn("Config directory not found!");
			await this.default();
		}
		if (this.configHealthy && this.accountsHealthy) return true;
	}

	async config() {
		this.configHealthy = fs.existsSync("../Config/config");
	}

	async accounts() {
		fs.readJSONSync("../Config/accountlist.json", (error, accounts) => {
			this.accountsHealthy = Boolean(accounts.accounts.length);
			if (error) {
				return logger.error(new Error(error));
			}
		});
	}

	async default() {
		const accountList = {
			accounts: [
				{
					username: "",
					password: ""
				}
			]
		};
		logger.info("Creating a default configuration directory");
		fs.copyFileSync(
			"./default/config.js.default",
			"../Config/config.js",
			error => {
				logger.error(new Error(error));
			}
		);
		fs.writeJsonSync("../Config/accountlist.json", accountList, error => {
			logger.error(new Error(error));
		});
		logger.warn(
			"Please add an account src/Config/accountlist.json and restart Difys!"
		);
		process.exit(1);
	}
}
