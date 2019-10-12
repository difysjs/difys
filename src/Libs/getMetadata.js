import got from "got";
import HttpsProxyAgent from "https-proxy-agent";
import { constants, general } from "../Config";
import lastBuildVersion from "../Config/lastBuildVersion.json";
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

	return new Promise((resolve, reject) => {
		const request = got
			.stream(url, options)
			.on("data", buffer => {
				const chunk = buffer.toString("utf8");

				if (chunk.includes("window.buildVersion")) {
					const buildVersion = regex.exec(chunk)[2];
					request.emit("end");
					request.removeAllListeners();
					if (lastBuildVersion.current != buildVersion) {
						logger.warn(
							`CORE | A new version of the game has been detected. The current version of Difys might not work properly. Restart Difys if you want to execute anyway.`
						);
						process.exit();
					} else {
						resolve(buildVersion);
					}
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
		const assetsFullVersion = config.body.assetsUrl.match(
			/\/([^/]+)\/?$/
		)[1];

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
