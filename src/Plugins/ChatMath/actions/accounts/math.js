const incrementSolves = (state, action) => {
	const username = action.payload.username;
	// We increment the counter
	state[username].plugins.ChatMath.solves++;
};

export { incrementSolves };
