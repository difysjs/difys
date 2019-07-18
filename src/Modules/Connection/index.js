// import Socket from "./Socket";
import store from "../Store";
import got from "got";
import { constants } from "../../Config";
import { accounts } from "../Store/reducers/slices";
import { logger } from "../../Libs";

export default class Connection {
	constructor(account) {
		this.account = account;
		this.socket = null;
		// this.config = getConfig();
		this.auth = {
			apiKey: this.getHaapi(),
			apiID: this.getApiID(),
			sessionID: null,
			token: null
		};
	}

	async mount() {
		this.auth.apiKey = await this.auth.apiKey;
		this.auth.apiID = await this.auth.apiID;
		this.auth.token = await this.getToken(
			this.auth.apiKey,
			this.auth.apiID
		);
		return this.dispatch();
	}

	async getApiID() {
		logger.debug("Getting the API ID");
		try {
			const url = `${constants.baseUrl}${constants.entries.config}`;
			const response = await got(url, {
				json: true
			});
			this.auth.sessionID = response.body.sessionId;
			return response.body.haapi.id;
		} catch (error) {
			logger.error(new Error(error));
		}
	}

	async getHaapi() {
		logger.debug("Getting the haapi key");
		try {
			const url = `${constants.haapiUrl}${constants.entries.haapi}`;
			const response = await got.post(url, {
				// agent: null
				query: new URLSearchParams({
					login: this.account.username,
					password: this.account.password,
					long_life_token: false
				}).toString(),
				body: {
					login: this.account.username,
					password: this.account.password
				},
				json: true
			});
			console.log(response.body.key);
			return response.body.key;
		} catch (error) {
			logger.error(new Error(error));
		}
	}

	async getToken(apiKey, apiID) {
		logger.debug("Getting the token");
		try {
			const url = `${constants.haapiUrl}${constants.entries.token}`;
			const response = await got(url, {
				query: new URLSearchParams({
					game: apiID
				}).toString(),
				json: true,
				headers: { apiKey }
			});
			console.log(response.body.token);
			return response.body.token;
		} catch (error) {
			logger.error(new Error(error));
		}
	}

	dispatch() {
		const { setHaapi, setToken, setAccountId } = accounts.actions;
		const username = this.account.username;
		const { apiKey, token, sessionID } = this.auth;
		store.dispatch(setHaapi({ username, haapi: apiKey }));
		store.dispatch(setToken({ username, token }));
		store.dispatch(setAccountId({ username, accountId: sessionID }));
		console.log(store.getState().accounts[username].auth);
	}
}
