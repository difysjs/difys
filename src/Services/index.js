import binariesService from "./binaries";
import mongoServer from "./mongoServer";
import mongoDB from "./mongoDB";
import { getPluginsBinaries } from "../Libs";

export default async function() {
	const enabledBinaries = [...new Set(getPluginsBinaries())];

	if (enabledBinaries.length) {
		await mongoServer();
		await mongoDB.connect();
		await mongoDB.loadSchemas();
		await binariesService(enabledBinaries);
	}
}
