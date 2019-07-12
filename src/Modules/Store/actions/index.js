// Metadata actions
const setAppVersion = (state, action) => {
	state.appVersion = action.payload;
};
const setBuildVersion = (state, action) => {
	state.buildVersion = action.payload;
};

// Account actions
const addAccount = (state, action) => {
	const username = action.payload.username;
	state[username] = { username: username };
};
const setAccountId = (state, action) => {
	const username = action.payload.username;
	const accountId = action.payload.accountId;
	state[username] = { ...state[username], accountId };
};

export { setAppVersion, setBuildVersion, setAccountId, addAccount };
