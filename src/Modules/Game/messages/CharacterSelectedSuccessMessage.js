import store from "../../Store";
import { generateString } from "../../../Libs";
import { general } from "../../../Config";
import { accounts } from "../../Store/reducers/slices";

export default function CharacterSelectedSuccessMessage(payload) {
	const { socket } = payload;
	const username = socket.account.username;
	const state = store.getState().accounts[username];
	store.dispatch(accounts.actions.setStatus({ username, status: "IDLE" }));
	let isSubscriber = false;
	if (Number(state.extra.subscribtionEndDate) > 0) isSubscriber = true;

	socket.send("moneyGoultinesAmountRequest");
	socket.send("bakSoftToHardCurrentRateRequest");
	socket.send("bakHardToSoftCurrentRateRequest");
	socket.send("kpiStartSession", {
		accountSessionId: state.extra.accountSessionId,
		isSubscriber
	});
	socket.sendMessage("ClientKeyMessage", {
		key: generateString(20)
	});
	socket.send("restoreMysteryBox");
	socket.sendMessage("GameContextCreateRequestMessage");

	if (general.antiAfk)
		setInterval(
			() => socket.sendMessage("BasicPingMessage", { quiet: true }),
			600000
		);
}
