const addItem = (state, action) => {
	const username = action.payload.username;
	const item = action.payload.item;
	const items = state[username].gameData.inventory.items;
	items[item.id] = item;
};
const removeItem = (state, action) => {
	const username = action.payload.username;
	const id = action.payload.id;
	const items = state[username].gameData.inventory.items;
	delete items[id];
};
const setEquipment = (state, action) => {
	const username = action.payload.username;
	const equipment = action.payload.equipment;
	const inventory = state[username].gameData.inventory;
	inventory.equipment = equipment;
}

export { addItem, removeItem, setEquipment };
