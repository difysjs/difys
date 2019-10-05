import store from "../../Store";
import { status } from "../../../Config";
import { logger } from "../../../Libs";

export default function ServerStatusUpdateMessage(payload) {
	const { socket } = payload;
	const account = store.getState().accounts[socket.account.username];
	const serversIdByName = account.auth.serversIdByName;

	if (account.status === "WAITING FOR SERVER") {
		return;
	}
	for (const serverName in serversIdByName) {
		const serverId = serversIdByName[serverName];
		const server = account.auth.serversById[serverId];

		if (account.auth.selectedServer === server.name) {
			logger.info(
				`Server Status | ${server.name} | ${
					status.server[server.status]
				}`
			);
		}
	}
}
