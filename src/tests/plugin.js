import runServices from "../Services";
import store from "../Modules/Store";
import { metadata, accounts } from "../Modules/Store/reducers/slices";
import { accountsList } from "../Config";
import {
	getAppVersion,
	getBuildVersion,
	getAssetsVersion,
	logger
} from "../Libs";

const { setMetadata } = metadata.actions;

(async function() {
	await runServices();
	for (const username in accountsList) {
		store.dispatch(accounts.actions.addAccount({ username }));
	}
	try {
		const [assets, appVersion, buildVersion] = await Promise.all([
			getAssetsVersion(),
			getAppVersion(),
			getBuildVersion()
		]);
		const metadata = {
			appVersion,
			buildVersion,
			assetsVersion: assets.assetsVersion,
			staticDataVersion: assets.staticDataVersion
		};
		store.dispatch(setMetadata(metadata));
	} catch (error) {
		logger.error(error);
	}
	const MapPlugin = require("../Plugins/Map").default;
	const mapPlugin = new MapPlugin();
	await mapPlugin.mount(accountsList);
	const pointA = mapPlugin.getPositionsByCoordinates({
		posX: 5,
		posY: -19
	});
	const pointB = mapPlugin.getPositionsByCoordinates({
		posX: 0,
		posY: 12
	});
	const start = new Date();
	const path = await mapPlugin.World.getPath(pointA.id, pointB.id);
	console.log("Execution Time:", (new Date() - start) / 1000 + "s");
	if (path) {
		console.log(
			JSON.stringify(
				path.map(a => {
					const map = mapPlugin.mapPositions.get(a);
					return [map.posX, map.posY];
				})
			)
		);
	}
	process.exit();
})();
