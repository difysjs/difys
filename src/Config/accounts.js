import PRIVATE from "../PRIVATE";

const accountsList = {
	[PRIVATE.username]: {
		username: PRIVATE.username,
		password: PRIVATE.password,
		directLogin: false, // logs you to the last character you were connected to, if true, everything after this will be ignored
		server: PRIVATE.server, // server name: "Dodge", "Oshimo", "Grandapan" etc..
		character: PRIVATE.character // Character name if you have more than one otherwise this is ignored
	}
	// You can add more here
};

export default accountsList;
