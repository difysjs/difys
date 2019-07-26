import { logger } from "../../../Libs";

export default function serverDisconnecting(payload) {
	logger.info(
		`[ ${payload.socket.account.username} ] disconnected | ${payload.data.reason}`
	);
}
