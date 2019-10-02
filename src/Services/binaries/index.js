import mongoose from "mongoose";
import ProxyRequest from "./proxy-request";
import { constants, general } from "../../Config";
import config from "./config.json";

const request = new ProxyRequest({
	proxy: general.proxies.binaryUpdate,
	userAgent: config.userAgent
});

async function getRequestOptions(assetsVersion) {
	try {
		const binaryUrl = new URL(constants.baseUrl);
		binaryUrl.pathname = "/data/map";
		binaryUrl.searchParams.append("lang", general.language);
		binaryUrl.searchParams.append("v", assetsVersion);
		return {
			url: binaryUrl.href,
			json: true,
			body: {
				ids: []
			}
		};
	} catch (error) {
		return error;
	}
}

function isModelEmpty(Model) {
	return new Promise((resolve, reject) => {
		Model.countDocuments((error, count) => {
			if (error) {
				reject(error);
			} else if (count > 0) {
				resolve(false);
			} else {
				resolve(true);
			}
		});
	});
}

export default async function(enabledBinaries) {
	console.log(
		`\x1b[44m Service \x1b[0m Binary-Updater - \x1b[35mInitialising...\x1b[0m`
	);
	try {
		const assetsResponse = await request.get(
			constants.baseUrl + constants.entries.assets
		);
		const assetsVersion = assetsResponse.body.assetsVersion;
		const requestOptions = await getRequestOptions(assetsVersion);

		for (const binaryName of enabledBinaries) {
			const Model = mongoose.models[binaryName];
			requestOptions.body.class = binaryName;

			if (await isModelEmpty(Model)) {
				console.log(`Inserting ${binaryName} into the database`);
				const response = await request.post(requestOptions);
				await Model.insertMany(Object.values(response.body));
			}
		}
	} catch (error) {
		return error;
	}
}
