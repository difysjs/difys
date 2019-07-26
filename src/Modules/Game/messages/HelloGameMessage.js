import store from "../../Store";
import { general } from "../../../Config";

export default function HelloGameMessage(payload) {
	const { socket } = payload;
	const username = socket.account.username;
	const state = store.getState().accounts[username];
	const ticket = state.auth.selectedServerData.ticket;

	socket.sendMessage("AuthenticationTicketMessage", {
		ticket,
		lang: general.language
	});
}
