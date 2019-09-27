import HttpsProxyAgent from "https-proxy-agent";
import SocksProxyAgent from "socks-proxy-agent";

export default function handleProxy(proxy) {
	if (!proxy) {
		return false;
	}
	const auth = proxy.login ? `${proxy.login}:${proxy.password}@` : "";
	const proxyUrl = `${proxy.type}://${auth}${proxy.ip}`;
	const Agent = proxy.type == "socks" ? SocksProxyAgent : HttpsProxyAgent;
	return new Agent(proxyUrl);
}
