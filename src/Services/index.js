import binariesService from "./binaries";
import mongoServer from "./mongoServer";
import mongoDB from "./mongoDB";
import { getPluginsBinaries, logger } from "../Libs";
import { general } from "../Config";
import storeAPI from "./storeAPI";
import LiveScript from "./liveScript";

export default async function() {
	logger.info("CORE | Initiating services");
	const enabledBinaries = [...new Set(getPluginsBinaries())];

	if (enabledBinaries.length) {
		await mongoServer();
		await mongoDB.connect();
		await mongoDB.loadSchemas();
		await binariesService(enabledBinaries);
	}
	if (general.api.store.enabled) {
		await storeAPI();
	}
	if (general.api.livescript.enabled) {
		LiveScript();
	}
}
