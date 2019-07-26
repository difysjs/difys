import store from "../../Store";
import { accounts } from "../../Store/reducers/slices";
import { accountsList } from "../../../Config";
import { logger } from "../../../Libs";

export default function ServersListMessage(payload) {
	const { socket, data } = payload;
	const {
		setServersById,
		setServersByName,
		setSelectedServer
	} = accounts.actions;
	const username = socket.account.username;
	const accountConfig = accountsList[username];
	const serversById = {};
	const serversByName = {};

	for (let server of data.servers) {
		if (server.isSelectable && server.charactersCount) {
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
	let selected;
	if (directLogin) {
		let flag = 0;
		for (let serverId in serversById) {
			if (serversById[serverId].date > flag) {
				selected = Number(serverId);
				flag = serversById[serverId].date;
			}
		}
	}
	const serverId = directLogin
		? selected
		: serversByName[accountConfig.server].id;

	store.dispatch(
		setSelectedServer({
			username,
			selectedServer: serversById[serverId].name
		})
	);

	socket.sendMessage("ServerSelectionMessage", { serverId });
}
