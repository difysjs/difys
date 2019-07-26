import { logger } from "../../../Libs";

export default function IdentificationFailedBannedMessage(payload) {
	const { socket } = payload;
	logger.error(
		new Error(
			`Unable to identify [ ${socket.account.username} ] | Account banned =(`
		)
	);
}
