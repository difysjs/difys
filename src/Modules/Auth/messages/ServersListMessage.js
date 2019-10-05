import store from "../../Store";
import slices from "../../Store/reducers/slices";
import { accountsList, status, general } from "../../../Config";
import { logger } from "../../../Libs";

const {
	setServersById,
	setserversIdByName,
	setSelectedServer,
	setStatus
} = slices.accounts.actions;

export default function ServersListMessage(payload) {
	const { socket, data } = payload;
	const username = socket.account.username;
	const accountConfig = accountsList[username];
	const serversById = {};
	const serversIdByName = {};

	for (const server of data.servers) {
		if (server.charactersCount) {
			serversById[server.id] = {
				name: server._name,
				id: server.id,
				status: server.status,
				completion: server.completion,
				charactersCount: server.charactersCount,
				gameTypeId: server._gameTypeId,
				date: server.date
			};
			serversIdByName[server._name] = server.id;
		}
	}
	store.dispatch(setServersById({ username, serversById }));
	store.dispatch(setserversIdByName({ username, serversIdByName }));

	const directLogin = accountConfig.directLogin;
	var lastJoinedServer;

	if (directLogin) {
		const lastJoinedDate = Math.max.apply(
			null,
			data.servers.map(server => new Date(server.date))
		);
		if (lastJoinedDate == 0) {
			const defaultServer = general.fallbackServer;
			lastJoinedServer = data.servers.find(s => s._name == defaultServer);

			if (lastJoinedServer) {
				logger.warn(
					`Couldn't find a server, selected '${defaultServer}' by default`
				);
			} else {
				logger.error(
					new Error(
						`Couldn't find the default server '${defaultServer}'`
					)
				);
				return;
			}
		} else {
			lastJoinedServer = data.servers.find(
				s => s.date === lastJoinedDate
			);
		}
	}
	const server = directLogin
		? lastJoinedServer
		: serversById[serversIdByName[accountConfig.server]];

	store.dispatch(
		setSelectedServer({
			username,
			selectedServer: server.name
		})
	);
	if (server.isSelectable) {
		socket.sendMessage("ServerSelectionMessage", { serverId: server.id });
	} else {
		logger.info(
			`Server Status | ${server.name} | ${status.server[server.status]}`
		);
		store.dispatch(
			setStatus({
				username,
				status: "WAITING FOR SERVER"
			})
		);
	}
}
