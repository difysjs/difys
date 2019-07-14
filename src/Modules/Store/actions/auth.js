const setHaapi = (state, action) => {
	const username = action.payload.username;
	const haapi = action.payload.haapi;
	const account = state[username];
	account.auth.haapi = haapi;
};
const setToken = (state, action) => {
	const username = action.payload.username;
	const token = action.payload.token;
	const account = state[username];
	account.auth.token = token;
};

export { setHaapi, setToken };
