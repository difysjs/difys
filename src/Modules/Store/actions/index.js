import * as metadataActions from "./metadata/metadata";
import * as accountsActions from "./accounts/accounts";
import * as authActions from "./accounts/auth";
import logger from "../../../Libs/Logger";
import { pluginPaths, getPluginActions } from "../../../Libs/pluginHandler";

let actions = {
	metadata: Object.assign({}, ...Object.values({ metadataActions })),
	accounts: Object.assign(
		{},
		...Object.values({ accountsActions, authActions })
	)
};

for (let pluginPath of pluginPaths) {
	const pluginActionList = getPluginActions(pluginPath);

	for (let action of pluginActionList) {
		let pluginActions = require(action.path);

		if (actions.hasOwnProperty(action.slice)) {
			const pluginActionKeys = Object.keys(pluginActions);

			for (let key in actions[action.slice]) {
				if (pluginActionKeys.includes(key)) {
					logger.error(
						new Error(
							`${action.pluginName} plugin conflicts - The action '${key}' already exist`
						)
					);
					process.exit(1);
				}
			}
			actions[action.slice] = {
				...actions[action.slice],
				...pluginActions
			};
		} else {
			actions[action.slice] = pluginActions;
		}
	}
}

export default actions;
