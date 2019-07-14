const setCoords = (state, action) => {
	const username = action.payload.username;
	const x = action.payload.x;
	const y = action.payload.y;
	const account = state[username];
	account.gameData.map.coordinates = [x, y];
};

export { setCoords };
