import { logger } from "../../Libs";

export default class Plugin {
	constructor(info) {
		this.info = info;
		this.connections = {};
	}

	log(message, type = "debug") {
		switch (type) {
			case "debug":
				logger.debug(`${this.info.name} | ${message}`);
				break;
			case "info":
				logger.info(`${this.info.name} | ${message}`);
				break;
			case "error":
				logger.error(new Error(`${this.info.name} | ${message}`));
		}
	}
}
