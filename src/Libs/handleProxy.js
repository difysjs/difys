import HttpsProxyAgent from "https-proxy-agent";
import SocksProxyAgent from "socks-proxy-agent";

export default function handleProxy(proxy) {
	if (proxy) {
		const auth = proxy.login ? `${proxy.login}:${proxy.password}@` : "";
		switch (proxy.type) {
			case "http":
				return new HttpsProxyAgent(
					`${proxy.type}://${auth}${proxy.ip}`
				);
			case "https":
				return new HttpsProxyAgent(
					`${proxy.type}://${auth}${proxy.ip}`
				);
			case "socks":
				return new SocksProxyAgent(
					`${proxy.type}://${auth}${proxy.ip}`
				);
		}
	}
}
