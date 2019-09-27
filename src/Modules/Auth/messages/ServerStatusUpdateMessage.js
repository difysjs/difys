import store from "../../Store";
import { status } from "../../../Config";
import { logger } from "../../../Libs";

export default function ServerStatusUpdateMessage(payload) {
	const { socket } = payload;
	const account = store.getState().accounts[socket.account.username];

	if (account.status === "WAITING FOR SERVER") {
		for (const serverName in account.auth.serversByName) {
			const server = account.auth.serversByName[serverName];

			if (account.auth.selectedServer === server.name) {
				logger.info(
					`Server Status | ${server.name} | ${
						status.server[server.status]
					}`
				);
			}
		}
	}
}
