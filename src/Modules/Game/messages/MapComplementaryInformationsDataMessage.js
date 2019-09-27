import store from "../../Store";
import slices from "../../Store/reducers/slices";
import { general } from "../../../Config";

const { setStatus } = slices.accounts.actions;

export default function MapComplementaryInformationsDataMessage(payload) {
	const username = payload.socket.account.username;
	const account = store.getState().accounts[username];

	if (account.status == "INITIATING GAME") {
		setTimeout(
			() => store.dispatch(setStatus({ username, status: "IDLE" })),
			general.connectionDelay
		);
	} else {
		store.dispatch(setStatus({ username, status: "IDLE" }));
	}
}
