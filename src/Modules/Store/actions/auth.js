const setAuth = (state, action) => {
	const username = action.payload.username;
	const auth = action.payload.auth;
	const account = state[username];
	account.auth = auth;
};

export { setAuth };
