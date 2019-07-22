import HttpsProxyAgent from "https-proxy-agent";

const modules = {
	socket: {
		options: proxy => {
			// const defaultUA = String;
			return {
				manual: true,
				strategy: "disconnect,timeout",
				transport: {
					agent: proxy ? new HttpsProxyAgent(proxy) : null,
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
