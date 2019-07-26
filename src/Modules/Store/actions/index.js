import * as metadata from "./metadata/metadata";
import * as account from "./account/account";
import * as auth from "./account/auth";
import * as map from "./account/map";
import * as inventory from "./account/inventory";
import * as stats from "./account/stats";

const metadataActionsSets = { metadata };
const accountActionsSets = { account, auth, map, inventory, stats };

let accountActions = {};
let metadataActions = {};

for (let actionSet in metadataActionsSets) {
	metadataActions = Object.assign(
		metadataActions,
		metadataActionsSets[actionSet]
	);
}

for (let actionSet in accountActionsSets) {
	accountActions = Object.assign(
		accountActions,
		accountActionsSets[actionSet]
	);
}

export { accountActions, metadataActions };
