/* eslint-disable prettier/prettier */
// import Connect from './Modules/Connection';
import logger from "../Tools/Logger";
import axios from "axios";


export default class Core {
	
	constructor() {
		this.appVersion = String;
		this.buildVersion = String;
	}
	
	entry() {
		logger.error(new Error("This is an error"));
		logger.warn("This is a warning message");
		logger.info(new Error("This is an info message"));
		logger.verbose("This is a verbose message");
		logger.debug("This is a debug message");
	}

	async setAppVersion() {
		let request = await axios.get({
			url: "https://itunes.apple.com/lookup",
			params: {
				country: "fr",
				id: 1041406978,
				lang: "fr",
				limit: 1,
				t: Date.now()
			}
		});
		this.appVersion = request.results[0].version;
	}

	async setBuildVersion() {
		let request = await axios.get(this.api.dataUrl + "/build/script.js");
		const regex = /.*buildVersion=("|')([0-9]*\.[0-9]*\.[0-9]*)("|')/g;
		this.buildVersion = regex.exec(request.substring(1, 10000))[2]; // Watch this code on game updates
	}
}