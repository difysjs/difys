import store from "../../Store";
import slices from "../../Store/reducers/slices";
import { general } from "../../../Config";

const { setStatus } = slices.accounts.actions;
/*
			The waiting time is between 475 to 595 ms
			But for calculation performance gain we intentionnally
			give up the potential of 120ms faster map transitionning
		*/
const mapTransitionAnimationTime = 595;

export default function MapComplementaryInformationsDataMessage(payload) {
	const username = payload.socket.account.username;
	const account = store.getState().accounts[username];

	setTimeout(() => {
		if (account.status == "INITIATING GAME") {
			setTimeout(
				() => store.dispatch(setStatus({ username, status: "IDLE" })),
				general.delays.connection
			);
		} else {
			store.dispatch(setStatus({ username, status: "IDLE" }));
		}
	}, mapTransitionAnimationTime);
}
