const addAccount = (state, action) => {
	const username = action.payload.username;
	state[username] = {
		username,
		auth: { servers: {} },
		extra: { selectedCharacter: {}, characters: {} },
		plugins: {},
		currentSequenceNumber: 0,
		useDefaultCharactersListMessage: true,
		gameContextCreated: false
	};
};

const useDefaultCharactersListMessage = (state, action) => {
	const { username, value } = action.payload;
	state[username].useDefaultCharactersListMessage = value;
};

const setMapId = (state, action) => {
	const { username, mapId } = action.payload;
	state[username].mapId = mapId;
};

const setStatus = (state, action) => {
	const { username, status } = action.payload;
	state[username].status = status;
};

const setExtra = (state, action) => {
	const { username, extra } = action.payload;
	state[username].extra = extra;
};

const setSelectedCharacter = (state, action) => {
	const { username, selectedCharacter } = action.payload;
	state[username].extra.selectedCharacter = selectedCharacter;
};

const setcharacters = (state, action) => {
	const { username, characters } = action.payload;
	state[username].extra.characters = characters;
};

const updateSequenceNumber = (state, action) => {
	const username = action.payload.username;
	state[username].currentSequenceNumber++;
};

const addPlugin = (state, action) => {
	const { username, pluginName, defaultValue } = action.payload;
	state[username].plugins[pluginName] = defaultValue || {};
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
	gameContextCreate,
	useDefaultCharactersListMessage,
	setcharacters
};
