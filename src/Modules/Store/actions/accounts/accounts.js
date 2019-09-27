const addAccount = (state, action) => {
	const username = action.payload.username;
	state[username] = {
		username,
		auth: { servers: {} },
		extra: { selectedCharacter: {} },
		plugins: {},
		currentSequenceNumber: 0,
		gameContextCreated: false
	};
};

const setMapId = (state, action) => {
	const username = action.payload.username;
	const mapId = action.payload.mapId;
	state[username].mapId = mapId;
};

const setStatus = (state, action) => {
	const username = action.payload.username;
	const status = action.payload.status;
	const account = state[username];
	account.status = status;
};

const setExtra = (state, action) => {
	const username = action.payload.username;
	const account = state[username];
	const extra = action.payload.extra;
	account.extra = extra;
};

const setSelectedCharacter = (state, action) => {
	const username = action.payload.username;
	const account = state[username];
	const selectedCharacter = action.payload.selectedCharacter;
	account.extra.selectedCharacter = selectedCharacter;
};

const updateSequenceNumber = (state, action) => {
	const username = action.payload.username;
	const account = state[username];
	account.currentSequenceNumber++;
};

const addPlugin = (state, action) => {
	const { username, pluginName, defaultValue } = action.payload;
	const account = state[username];
	account.plugins[pluginName] = defaultValue || {};
};

const gameContextCreate = (state, action) => {
	const username = action.payload.username;
	state[username].gameContextCreated = true;
};

export {
	addAccount,
	setMapId,
	setStatus,
	setExtra,
	setSelectedCharacter,
	updateSequenceNumber,
	addPlugin,
	gameContextCreate
};
