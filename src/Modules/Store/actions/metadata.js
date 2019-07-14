const setAppVersion = (state, action) => {
	state.appVersion = action.payload;
};
const setBuildVersion = (state, action) => {
	state.buildVersion = action.payload;
};

export { setAppVersion, setBuildVersion };
