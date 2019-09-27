import store from "../../Store";
import slices from "../../Store/reducers/slices";
import { accountsList, status } from "../../../Config";
import { logger } from "../../../Libs";

const {
	setServersById,
	setServersByName,
	setSelectedServer,
	setStatus
} = slices.accounts.actions;

export default function ServersListMessage(payload) {
	const { socket, data } = payload;
	const username = socket.account.username;
	const accountConfig = accountsList[username];
	const serversById = {};
	const serversByName = {};

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
			serversByName[server._name] = {
				name: server._name,
				id: server.id,
				status: server.status,
				completion: server.completion,
				charactersCount: server.charactersCount,
				gameTypeId: server._gameTypeId,
				date: server.date
			};
		}
	}
	if (!Object.getOwnPropertyNames(serversById).length) {
		logger.error(new Error("Can't find any server to connect to."));
		logger.error(new Error("Bad configuration or game servers down"));
	}
	store.dispatch(setServersById({ username, serversById }));
	store.dispatch(setServersByName({ username, serversByName }));

	const directLogin = accountConfig.directLogin;
	var lastJoinedServer;

	if (directLogin) {
		const lastJoinedDate = Math.max.apply(
			null,
			data.servers.map(server => new Date(server.date))
		);
		lastJoinedServer = data.servers.find(
			server => server.date === lastJoinedDate
		);
	}
	const server = directLogin
		? lastJoinedServer
		: serversByName[accountConfig.server];

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
