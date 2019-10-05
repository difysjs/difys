import { logger } from "../../../Libs";

export default function IdentificationFailedMessage(payload) {
	logger.error(
		new Error(
			`Unable to identify [ ${payload.socket.account.username} ] | Servers down?`
		)
	);
}
