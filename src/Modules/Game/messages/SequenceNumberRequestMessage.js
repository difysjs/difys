import store from "../../Store";
import { accounts } from "../../Store/reducers/slices";

export default function SequenceNumberRequestMessage(payload) {
	const { socket } = payload;
	const username = socket.account.username;
	const state = store.getState().accounts[username];
	const currentSequenceNumber = state.currentSequenceNumber;
	socket.sendMessage("SequenceNumberMessage", {
		number: currentSequenceNumber + 1
	});

	store.dispatch(accounts.actions.updateSequenceNumber({ username }));
}
