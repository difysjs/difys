const modules = {
	socket: {
		options: agent => {
			// const defaultUA = String;
			return {
				manual: true,
				strategy: "disconnect,timeout",
				transport: {
					agent,
					extraHeaders: {}
				},
				reconnect: {
					max: 5000,
					min: 500,
					retries: 10
				}
			};
		}
	}
};

export default modules;
