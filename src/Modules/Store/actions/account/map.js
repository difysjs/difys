const setCoords = (state, action) => {
	const username = action.payload.username;
	const x = action.payload.x;
	const y = action.payload.y;
	const gameData = state[username].gameData;
	gameData.map.coordinates = [x, y];
};
const pushEntity = (state, action) => {
	const username = action.payload.username;
	const entity = action.payload.entity;
	const entities = state[username].gameData.map.entities;
	entities[entity.id] = entity;
};
const removeEntity = (state, action) => {
	const username = action.payload.username;
	const id = action.payload.id;
	const entities = state[username].gameData.map.entities;
	delete entities[id];
};

export { setCoords, pushEntity, removeEntity };
