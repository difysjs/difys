import got from "got";
import HttpsProxyAgent from "https-proxy-agent";
import { constants, general } from "../Config";
import logger from "./Logger";

const proxy = general.proxies.metadata;

async function getAppVersion() {
	const params = constants.app.params(general.country);
	const options = {
		query: params.toString(),
		agent: proxy ? new HttpsProxyAgent(proxy) : null,
		json: true
	};
	try {
		const response = await got(constants.app.url, options);
		return response.body.results[0].version;
	} catch (error) {
		console.error(error);
	}
}

function getBuildVersion() {
	const url = constants.baseUrl + constants.entries.build;
	const options = {
		agent: proxy ? new HttpsProxyAgent(proxy) : null
	};
	const regex = /.*buildVersion=("|')([0-9]*\.[0-9]*\.[0-9]*)("|')/g;

	return new Promise(async (resolve, reject) => {
		let request = await got
			.stream(url, options)
			.on("data", buffer => {
				const chunk = buffer.toString("utf8");

				if (chunk.includes("window.buildVersion")) {
					let buildVersion = regex.exec(chunk)[2];
					request.emit("end");
					request.removeAllListeners();
					resolve(buildVersion);
				}
			})
			.on("error", reject);
	});
}

async function getAssetsVersion() {
	const url = `${constants.baseUrl}${constants.entries.assets}`;
	try {
		const { body } = await got(url, {
			agent: proxy ? new HttpsProxyAgent(proxy) : null,
			json: true
		});
		const config = await got(constants.baseUrl + constants.entries.config, {
			json: true
		});
		let assetsFullVersion = config.body.assetsUrl.match(/\/([^/]+)\/?$/)[1];

		return {
			assetsFullVersion,
			assetsVersion: body.assetsVersion,
			staticDataVersion: body.staticDataVersion
		};
	} catch (error) {
		logger.error(error);
	}
}

export { getAppVersion, getBuildVersion, getAssetsVersion };
