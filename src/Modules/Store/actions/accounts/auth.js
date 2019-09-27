const setAuth = (state, action) => {
	const username = action.payload.username;
	const auth = action.payload.auth;
	const account = state[username];
	account.auth = auth;
};

const setServersById = (state, action) => {
	const username = action.payload.username;
	const serversById = action.payload.serversById;
	const account = state[username];
	account.auth.serversById = serversById;
};

const setServersByName = (state, action) => {
	const username = action.payload.username;
	const serversByName = action.payload.serversByName;
	const account = state[username];
	account.auth.serversByName = serversByName;
};

const setSelectedServer = (state, action) => {
	const username = action.payload.username;
	const selectedServer = action.payload.selectedServer;
	const account = state[username];
	account.auth.selectedServer = selectedServer;
};

const setSelectedServerData = (state, action) => {
	const username = action.payload.username;
	const selectedServerData = action.payload.selectedServerData;
	const account = state[username];
	account.auth.selectedServerData = selectedServerData;
};

export {
	setAuth,
	setServersById,
	setServersByName,
	setSelectedServerData,
	setSelectedServer
};
