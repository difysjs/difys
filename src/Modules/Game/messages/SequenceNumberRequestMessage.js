import store from "../../Store";
import slices from "../../Store/reducers/slices";

const { updateSequenceNumber } = slices.accounts.actions;

export default function SequenceNumberRequestMessage(payload) {
	const { socket } = payload;
	const username = socket.account.username;
	const account = store.getState().accounts[username];

	socket.sendMessage("SequenceNumberMessage", {
		number: account.currentSequenceNumber + 1
	});
	store.dispatch(updateSequenceNumber({ username }));
}
