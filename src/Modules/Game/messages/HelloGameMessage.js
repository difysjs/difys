import store from "../../Store";
import { general } from "../../../Config";

export default function HelloGameMessage(payload) {
	const { socket } = payload;
	const account = store.getState().accounts[socket.account.username];

	socket.sendMessage("AuthenticationTicketMessage", {
		ticket: account.auth.selectedServerData.ticket,
		lang: general.language
	});
}
