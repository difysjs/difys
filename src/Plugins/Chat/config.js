import PRIVATE from "../../PRIVATE";

const config = {
	accounts: {
		[PRIVATE.username]: {
			listen: true,
			channels: [0, 1, 2] // -1 for all
		},
		SomeOtherUsername: {
			listen: false
		}
	}
};

export default config;
