import Primus from "primus";

const PrimusSocket = Primus.createSocket({
	transformer: "engine.io"
});

export default class Socket extends PrimusSocket {
	constructor(url) {
		super(url, {
			manual: true,
			reconnect: {
				max: 8000,
				min: 500,
				retries: 10
			},
			strategy: "disconnect,timeout"
		});
	}
}
