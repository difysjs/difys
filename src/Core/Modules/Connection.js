import axios from "axios";
import Module from "../Module";
import Socket from "../../Tools/Socket";

export default class Connection extends Module {
	constructor(gameConfig) {
		super();
		this.gameConfig = gameConfig;
		this.haapi = String;
		this.token = String;
		const url = this.getSticker(gameConfig.dataURL, gameConfig.sessionId);
		this.Socket = new Socket(url);
	}

	async setKey(login, password) {
		const request = await axios.post({
			url: this.gameConfig.haapi.url + "/Api/CreateApiKey",
			params: {
				login,
				password,
				long_life_token: false
			}
		});
		this.haapi = request;
	}

	async setToken() {
		const { url, id } = this.gameConfig.haapi;
		const request = await axios.get({
			url: url + "/Account/CreateToken",
			headers: { apiKey: this.haapi.key },
			params: { game: id }
		});
		this.token = request.token;
	}

	async getSticker(dataUrl, sessionId) {
		let url = new URL(dataUrl);
		url.pathname = "primus/";
		url.searchParams.append("STICKER", sessionId);
		return url.href;
	}
}
