const initChatMath = (state, action) => {
	// We grab the username from the payload
	const username = action.payload.username;
	// We initiate a counter
	state[username].plugins.ChatMath = {
		solves: 0
	};
};

const incrementSolves = (state, action) => {
	const username = action.payload.username;
	// We increment the counter
	state[username].plugins.ChatMath.solves++;
};

export { initChatMath, incrementSolves };
