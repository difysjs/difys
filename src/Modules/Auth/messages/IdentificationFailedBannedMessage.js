import { logger } from "../../../Libs";

export default function IdentificationFailedBannedMessage(payload) {
	logger.error(
		new Error(
			`Unable to identify [ ${payload.socket.account.username} ] | Account banned =(`
		)
	);
}
