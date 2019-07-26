const setStats = (state, action) => {
	const username = action.payload.username;
	const stats = action.payload.stats;
	state[username].gameData.stats = stats;
};

const updateCharacteristic = (state, action) => {
	const username = action.payload.username;
	const type = Object.entries(action.payload)[1][0];
	const stat = state[username].gameData.stats;
	stat[type] = action.payload[type];
};

export { setStats, updateCharacteristic };
