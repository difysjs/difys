const modules = {
	socket: {
		options: agent => ({
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
		})
	}
};

export default modules;
