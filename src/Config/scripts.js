import PRIVATE from "../PRIVATE";

const scripts = {
	/* username: {
		name: "myScript"
		retries: Number | 0 for infinity ( or, you know, until you're banned... )
	} */
	// myScript should be in ~/scripts
	[PRIVATE.username]: {
		name: "myScript",
		retries: 0
	}
};

export default scripts;
