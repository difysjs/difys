import got from "got";
import HttpsProxyAgent from "https-proxy-agent";
import queryString from "query-string";
import { constants, general } from "../Config";

async function getAppVersion(proxy) {
	const url = constants.app.url;
	const params = constants.app.params(general.country, general.language);
	const options = {
		query: queryString.stringify(params),
		agent: proxy ? new HttpsProxyAgent(proxy) : null,
		json: true
	};
	try {
		const response = await got(url, options);
		return response.body.results[0].version;
	} catch (error) {
		console.error(error);
	}
}

function getBuildVersion(proxy) {
	const options = {
		agent: proxy ? new HttpsProxyAgent(proxy) : null
	};
	const regex = /.*buildVersion=("|')([0-9]*\.[0-9]*\.[0-9]*)("|')/g;
	var responseBody = "";

	return new Promise(async (resolve, reject) => {
		let request = await got
			.stream(constants.build, options)
			.on("data", chunk => {
				responseBody += chunk.toString("utf8");

				if (responseBody.includes("window.buildVersion")) {
					let buildVersion = regex.exec(responseBody)[2];
					request.emit("end");
					request.removeAllListeners();
					resolve(buildVersion);
				}
			})
			.on("error", reject);
	});
}

export { getAppVersion, getBuildVersion };

/* getBuildVersion(proxy)
	.then(console.log)
	.catch(console.log); */
