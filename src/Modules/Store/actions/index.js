import * as metadata from "./metadata/metadata";
import * as account from "./account/account";
import * as auth from "./account/auth";

const metadataActionsSets = { metadata };
const accountActionsSets = { account, auth };

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
