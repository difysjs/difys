const addAccount = (state, action) => {
	const username = action.payload.username;
	state[username] = {
		username,
		auth: { servers: {} },
		extra: { selectedCharacter: {} },
		plugins: {},
		currentSequenceNumber: 0
		/* gameData: {
			map: { entities: {} },
			inventory: { items: {} },
			stats: { general: {}, alignmentInfos: {} }
		} */
	};
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

const setMapId = (state, action) => {
	const username = action.payload.username;
	const account = state[username];
	account.mapId = action.payload.mapId;
};

export {
	addAccount,
	setStatus,
	setExtra,
	setSelectedCharacter,
	updateSequenceNumber,
	setMapId
};
