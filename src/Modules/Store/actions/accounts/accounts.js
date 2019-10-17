const addAccount = (state, action) => {
	const username = action.payload.username;
	state[username] = {
		username,
		auth: { servers: {} },
		extra: { selectedCharacter: {}, characters: {} },
		plugins: {},
		currentSequenceNumber: 0,
		useDefaultCharactersListMessage: true,
		gameContextCreated: 0
	};
};

const removeAccount = (state, action) => {
	delete state[action.payload.username];
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

const setSelectedCharacter = (state, action) => {
	const { username, selectedCharacter } = action.payload;
	state[username].extra.selectedCharacter = selectedCharacter;
};

const setCharacters = (state, action) => {
	const { username, characters } = action.payload;
	state[username].extra.characters = characters;
};

const setNickname = (state, action) => {
	const { username, nickname } = action.payload;
	state[username].extra.nickname = nickname;
};

const setSubscribtionEndDate = (state, action) => {
	const { username, date } = action.payload;
	state[username].extra.subscribtionEndDate = date;
};

const setAccountSessionId = (state, action) => {
	const { username, sessionId } = action.payload;
	state[username].extra.accountSessionId = sessionId;
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
	const { username, context } = action.payload;
	state[username].gameContextCreated = context; // 0: not created, 1: created, 2: event cycle done
};

export {
	addAccount,
	setMapId,
	setStatus,
	setSelectedCharacter,
	updateSequenceNumber,
	addPlugin,
	gameContextCreate,
	useDefaultCharactersListMessage,
	setCharacters,
	removeAccount,
	setNickname,
	setAccountSessionId,
	setSubscribtionEndDate
};
