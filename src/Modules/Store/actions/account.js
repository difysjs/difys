const addAccount = (state, action) => {
	const username = action.payload.username;
	state[username] = {
		username,
		auth: {},
		gameData: {
			map: { entities: {} },
			inventory: { items: {} },
			stats: { general: {}, alignmentInfos: {} }
		}
	};
};

const setAccountId = (state, action) => {
	const username = action.payload.username;
	const accountId = action.payload.accountId;
	const account = state[username];
	account.accountId = accountId;
};
const setStatus = (state, action) => {
	const username = action.payload.username;
	const status = action.payload.status;
	const account = state[username];
	account.status = status;
};

export { addAccount, setAccountId, setStatus };
