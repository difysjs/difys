import * as metadataActions from "./metadata/metadata";
import * as accountsActions from "./accounts/accounts";
import * as authActions from "./accounts/auth";
import logger from "../../../Libs/Logger";
import { pluginPaths, getPluginActions } from "../../../Libs/pluginHandler";

const actions = {
	metadata: Object.assign({}, ...Object.values({ metadataActions })),
	accounts: Object.assign(
		{},
		...Object.values({ accountsActions, authActions })
	)
};

for (const pluginPath of pluginPaths) {
	const pluginActionList = getPluginActions(pluginPath);

	for (const action of pluginActionList) {
		const pluginActions = require(action.path);

		if (action.slice in actions) {
			const pluginActionKeys = Object.keys(pluginActions);

			for (const key in actions[action.slice]) {
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
