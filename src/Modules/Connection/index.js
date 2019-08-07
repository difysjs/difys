// import Socket from "./Socket";
import store from "../Store";
import got from "got";
import { constants } from "../../Config";
import { accounts } from "../Store/reducers/slices";
import { logger } from "../../Libs";
import Socket from "./Socket";
import { CookieJar } from "tough-cookie";
import { catchCloudflare } from "@ctrl/cloudflare";
import FormData from "form-data";

export default class Connection {
	constructor(account) {
		this.agent = account.agent;
		this.account = account;
		this.socket = null;
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
			accounts.actions.setStatus({
				username: this.account.username,
				status: "LOGGING IN"
			})
		);
		this.socket = new Socket(
			this.auth.sessionID,
			this.account.username,
			this.agent
		);
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

		const form = new FormData();
		form.append("login", this.account.username);
		form.append("password", this.account.password);
		const cookieJar = new CookieJar();
		const url = `${constants.haapiUrl}${constants.entries.haapi}`;

		const options = {
			agent: this.agent,
			cookieJar,
			query: new URLSearchParams({
				login: this.account.username,
				password: this.account.password,
				long_life_token: false
			}).toString(),
			body: form,
			retry: 0
		};
		let response = {};
		try {
			response = JSON.parse((await got.post(url, options)).body);
		} catch (error) {
			logger.error(new Error(error));
			logger.warn("Maybe CloudFlare? Trying to bypass...");
			try {
				response = JSON.parse(
					(await catchCloudflare(error, options)).body
				);
			} catch (error) {
				logger.error(new Error(error));
			}
		}
		logger.debug("CORE | Got API Key successfuly");
		this.auth.accountID = response.account_id;
		return response.key;
	}

	async getToken(apiKey, apiID) {
		logger.debug("CORE | REQUEST | Token");
		try {
			const url = `${constants.haapiUrl}${constants.entries.token}`;
			const response = await got(url, {
				agent: this.agent,
				query: new URLSearchParams({
					game: apiID
				}).toString(),
				json: true,
				headers: { apiKey }
			});
			// console.log(response.body.token);
			return response.body.token;
		} catch (error) {
			logger.error(new Error(error));
		}
	}

	dispatch() {
		const { setAuth } = accounts.actions;
		const username = this.account.username;
		store.dispatch(setAuth({ username, auth: this.auth }));
	}
}
