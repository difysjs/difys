import got from "got";
import HttpsProxyAgent from "https-proxy-agent";

export default class ProxyRequest {
	constructor(requestConfig = {}) {
		this.proxyUrl = requestConfig.proxy || null;
		this.userAgent = requestConfig.userAgent || null;
	}

	get(config) {
		return this.sendRequest(config, "get");
	}
	post(config) {
		return this.sendRequest(config, "post");
	}
	put(config) {
		return this.sendRequest(config, "put");
	}
	delete(config) {
		return this.sendRequest(config, "delete");
	}

	sendRequest(config, method) {
		if (typeof config === "string") {
			config = { url: config };
		}
		config = Object.assign(
			{
				method,
				headers: {},
				agent: this.proxyUrl
					? new HttpsProxyAgent(this.proxyUrl)
					: null,
				timeout: 20000,
				followRedirect: true,
				json: true
			},
			config
		);

		if (!config.headers["User-Agent"] && this.userAgent) {
			config.headers["User-Agent"] = this.userAgent;
		}
		return new Promise(async (resolve, reject) => {
			try {
				const response = await got[config.method](config.url, config);
				resolve(response);
			} catch (error) {
				reject(error.response.body);
			}
		});
	}
}
