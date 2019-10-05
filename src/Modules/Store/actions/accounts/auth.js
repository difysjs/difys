const setAuth = (state, action) => {
	const { username, auth } = action.payload;
	state[username].auth = auth;
};

const setServersById = (state, action) => {
	const { username, serversById } = action.payload;
	state[username].auth.serversById = serversById;
};

const setserversIdByName = (state, action) => {
	const { username, serversIdByName } = action.payload;
	state[username].auth.serversIdByName = serversIdByName;
};

const setSelectedServer = (state, action) => {
	const { username, selectedServer } = action.payload;
	state[username].auth.selectedServer = selectedServer;
};

const setSelectedServerData = (state, action) => {
	const { username, selectedServerData } = action.payload;
	state[username].auth.selectedServerData = selectedServerData;
};

export {
	setAuth,
	setServersById,
	setserversIdByName,
	setSelectedServerData,
	setSelectedServer
};
