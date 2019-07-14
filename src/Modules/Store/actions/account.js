const addAccount = (state, action) => {
	const username = action.payload.username;
	state[username] = { username };
};
const initAccount = (state, action) => {
	const username = action.payload.username;
	const account = state[username];
	account.auth = {};
	account.gameData = { map: {}, inventory: {}, stats: {} };
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

export { addAccount, setAccountId, setStatus, initAccount };
