import store from "../Store";
import got from "got";
import { constants } from "../../Config";
import slices from "../Store/reducers/slices";
import { logger } from "../../Libs";
import Socket from "./Socket";
import cloudscraper from "cloudscraper";

const { setAuth, setStatus } = slices.accounts.actions;

export default class Connection {
	constructor(account) {
		this.account = account;
		this.socket = null;
		// this.config = getConfig();
		this.auth = {
			apiKey: this.getHaapi(),
			apiID: this.getApiID(),
			accountID: null,
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
		this.dispatch();
		store.dispatch(
			setStatus({
				username: this.account.username,
				status: "LOGGING IN"
			})
		);
		this.socket = new Socket(this.auth.sessionID, this.account.username);
		return this.socket;
	}

	async getApiID() {
		logger.debug("CORE | REQUEST | ApiID");
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
		logger.debug("CORE | REQUEST | HaapiKey");
		try {
			const uri = `${constants.haapiUrl}${constants.entries.haapi}`;
			const options = {
				uri,
				qs: new URLSearchParams({
					login: this.account.username,
					password: this.account.password,
					long_life_token: false
				}).toString(),
				formData: {
					login: this.account.username,
					password: this.account.password
				}
			};
			const response = JSON.parse(await cloudscraper.post(options));
			this.auth.accountID = response.account_id;
			return response.key;
		} catch (error) {
			logger.error(new Error(error));
		}
	}

	async getToken(apiKey, apiID) {
		logger.debug("CORE | REQUEST | Token");
		try {
			const url = `${constants.haapiUrl}${constants.entries.token}`;
			const response = await got(url, {
				query: new URLSearchParams({
					game: apiID
				}).toString(),
				json: true,
				headers: { apiKey }
			});
			return response.body.token;
		} catch (error) {
			logger.error(new Error(error));
		}
	}

	dispatch() {
		const username = this.account.username;
		store.dispatch(setAuth({ username, auth: this.auth }));
	}
}
