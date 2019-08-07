const general = {
	country: "fr", // languages and countries other than french are not 100% supported
	language: "fr",
	telemetry: true, // send us performance usage in order to make difys better, we won't steal your credentials
	logLevel: "debug", // Keep this at info if you don't want to spam your terminal
	antiAfk: false, // may affect performance
	statusUpdates: {
		enabled: true,
		interval: 1 // minutes (Don't 0 this or else you'll encounter terminal flood)
	},

	// exposes your data to localhost:port (for more information on this section, visit the docs)
	// remove this part if you don't want to use the web/mobile interface (WIP)
	server: {
		port: 1337,
		password: "s3cr3tp4ssw0rd"
	}
};

export default general;
