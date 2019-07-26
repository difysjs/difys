import { logger } from "../../../Libs";

export default function IdentificationFailedMessage(payload) {
	const { socket } = payload;
	logger.error(
		new Error(
			`Unable to identify [ ${socket.account.username} ] | Servers down?`
		)
	);
}
