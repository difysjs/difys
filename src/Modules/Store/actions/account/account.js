const addAccount = (state, action) => {
	const username = action.payload.username;
	state[username] = {
		username,
		auth: { servers: {} },
		extra: { selectedCharacter: {} },
		gameData: {
			map: { entities: {} },
			inventory: { items: {} },
			stats: { general: {}, alignmentInfos: {} }
		}
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

export { addAccount, setStatus, setExtra, setSelectedCharacter };
