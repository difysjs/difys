import store from "../../Store";
import { generateString } from "../../../Libs";
import { general } from "../../../Config";

const antiAFKInterval = 600000; // ms

export default function CharacterSelectedSuccessMessage(payload) {
	const { socket } = payload;
	const account = store.getState().accounts[socket.account.username];
	const isSubscriber = Number(account.extra.subscribtionEndDate) > 0;

	socket.send("kpiStartSession", {
		accountSessionId: account.extra.accountSessionId,
		isSubscriber
	});
	socket.send("moneyGoultinesAmountRequest");
	socket.sendMessage("QuestListRequestMessage");
	socket.sendMessage("FriendsGetListMessage");
	socket.sendMessage("IgnoredGetListMessage");
	socket.sendMessage("SpouseGetInformationsMessage");
	socket.sendMessage("OfflineOptionsUpdateRequestMessage", {
		options: "1,0,NON+PAN+PVN"
	});
	socket.send("bakSoftToHardCurrentRateRequest");
	socket.send("bakHardToSoftCurrentRateRequest");
	socket.send("restoreMysteryBox");
	socket.sendMessage("ClientKeyMessage", {
		key: generateString(20)
	});
	socket.sendMessage("GameContextCreateRequestMessage");

	if (general.antiAfk) {
		setInterval(
			() => socket.sendMessage("BasicPingMessage", { quiet: true }),
			antiAFKInterval
		);
	}
}
