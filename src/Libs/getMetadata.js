import got from "got";
import { constants, general } from "../Config";
import logger from "./Logger";

async function getAppVersion() {
	const params = constants.app.params(general.country, general.language);
	const options = {
		query: params.toString(),
		json: true
	};
	try {
		const response = await got(constants.app.url, options);
		return response.body.results[0].version;
	} catch (error) {
		console.error(error);
	}
}
// getAppVersion is working
function getBuildVersion() {
	const url = constants.baseUrl + constants.entries.build;
	const regex = /.*buildVersion=("|')([0-9]*\.[0-9]*\.[0-9]*)("|')/g;
	return new Promise(async (resolve, reject) => {
		let request = await got
			.stream(url)
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
			json: true
		});
		return {
			assetsVersion: body.assetsVersion,
			staticDataVersion: body.staticDataVersion
		};
	} catch (error) {
		logger.error(error);
	}
}

export { getAppVersion, getBuildVersion, getAssetsVersion };

/* getBuildVersion()
	.then(console.log)
	.catch(console.log); */
