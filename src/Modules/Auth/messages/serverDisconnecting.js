import store from "../../Store";
import slices from "../../Store/reducers/slices";
import { logger } from "../../../Libs";

export default function serverDisconnecting(payload) {
	const { socket } = payload;
	const username = socket.account.username;
	store.dispatch(
		slices.accounts.actions.setStatus({
			username,
			status: "DISCONNECTED"
		})
	);
	logger.info(
		`[ ${payload.socket.account.username} ] disconnected | ${payload.data.reason}`
	);
}
