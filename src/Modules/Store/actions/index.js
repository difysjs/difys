import * as metadata from "./metadata/metadata";
import * as account from "./account/account";
import * as auth from "./account/auth";
import logger from "../../../Libs/Logger";
import { pluginPaths, getPluginActions } from "../../../Libs/pluginHandler";

const metadataActionsSets = { metadata };
const accountActionsSets = { account, auth };

let metadataActions = Object.assign({}, ...Object.values(metadataActionsSets));
let accountActions = Object.assign({}, ...Object.values(accountActionsSets));

function mergeActions(pluginName, source, actions) {
	let actionKeys = Object.keys(actions);

	for (let key in source) {
		if (actionKeys.includes(key)) {
			logger.error(
				new Error(
					`${pluginName} plugin conflicts - The action '${key}' already exist`
				)
			);
			process.exit(1);
		}
	}
	return {
		...source,
		...actions
	};
}

for (let pluginPath of pluginPaths) {
	let pluginActions = getPluginActions(pluginPath);

	for (let action of pluginActions) {
		let actions = require(action.path);

		switch (action.slice) {
			case "account":
				accountActions = mergeActions(
					action.pluginName,
					accountActions,
					actions
				);
				break;
			case "metadata":
				metadataActions = mergeActions(
					action.pluginName,
					metadataActions,
					actions
				);
				break;
		}
	}
}

export { accountActions, metadataActions };
