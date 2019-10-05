import generateNickname from "../../../Libs/nicknameGenerator";
import { general } from "../../../Config";
import { logger } from "../../../Libs";

const nicknameError = {
	1: "ALREADY IN USE",
	2: "SAME AS LOGIN",
	3: "TOO SIMILAR TO LOGIN",
	4: "INVALID NICKNAME",
	99: "UNKNOWN NICKNAME ERROR"
};

function getValidNickname() {
	let nickname = generateNickname();

	while (nickname.length > 29) {
		nickname = generateNickname();
	}
	return nickname;
}

export default function NicknameRegistrationMessage(payload) {
	const socket = payload.socket;
	const username = socket.account.username;
	let nickname = getValidNickname();

	const nicknameRequest = payload => {
		if (payload) {
			logger.warn(
				`[ ${username} ] NICKNAME ERROR | ${
					nicknameError[payload.data.reason]
				}`
			);
		}
		nickname = getValidNickname();

		setTimeout(() => {
			socket.sendMessage("NicknameChoiceRequestMessage", {
				nickname
			});
		}, general.delays.nicknameRetry);
	};
	socket.eventEmitter.on("NicknameRefusedMessage", nicknameRequest);
	socket.eventEmitter.once("NicknameAcceptedMessage", () => {
		socket.eventEmitter.off("NicknameRefusedMessage", nicknameRequest);
		logger.info(`[ ${username} ] NICKNAME SET | ${nickname}`);
		logger.info(`[ ${username} ] RECONNECTING...`);
		socket.account.reconnect();
	});
	nicknameRequest();
}
