import axios from "axios";

export default class Connection {
	/**
	 * @param {Object} accounts
	 */
	constructor(account) {
		this.account = account;
		this.api = Object;
		this.haapi = String;
		this.token = String;
	}

	async getConfig() {
		let config = await axios.get(
			"https://proxyconnection.touch.dofus.com/config.json"
		);
		this.api = config;
	}

	async getKey() {
		let request = await axios.post({
			url: this.api.haapi.url + "/Api/CreateApiKey",
			params: {
				login: this.account.username,
				password: this.account.password,
				long_life_token: false
			}
		});
		this.haapi = request;
	}

	async getToken() {
		let request = await axios.get({
			url: this.api.haapi.url + "/Account/CreateToken",
			headers: { apiKey: this.haapi.key },
			params: { game: this.api.haapi.id }
		});
		this.token = request.token;
	}
}
