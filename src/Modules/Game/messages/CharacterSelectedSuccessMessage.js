import store from "../../Store";
import { generateString } from "../../../Libs";
import { general } from "../../../Config";

export default function CharacterSelectedSuccessMessage(payload) {
	const { socket } = payload;
	const username = socket.account.username;
	const state = store.getState().accounts[username];
	const isSubscriber = Number(state.extra.subscribtionEndDate) > 0;

	socket.send("kpiStartSession", {
		accountSessionId: state.extra.accountSessionId,
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
			600000
		);
	}
}
